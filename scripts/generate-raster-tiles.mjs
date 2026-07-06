import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const tileSize = 256;
const zooms = [9, 10, 11, 12, 13];
const { fromFile } = await importPatchedGeoTiff();
const studyArea = loadStudyArea();
const tileMaskCache = new Map();

const layers = [
  { id: 'gubi', file: 'GUBI.tif', color: colorGubi },
  { id: 'upi', file: 'UPI.tif', color: colorUpi },
  { id: 'ndvi', file: 'NDVI.tif', color: colorNdvi },
  { id: 'ndbi', file: 'NDBI.tif', color: colorNdbi },
  { id: 'lst', file: 'LST.tif', color: colorLst },
];

const requestedLayers = process.argv.slice(2).map((layer) => layer.toLowerCase());
const selectedLayers = requestedLayers.length > 0 ? layers.filter((layer) => requestedLayers.includes(layer.id)) : layers;

if (selectedLayers.length === 0) {
  throw new Error(`Layer tidak dikenal: ${requestedLayers.join(', ')}`);
}

for (const layer of selectedLayers) {
  await generateLayerTiles(layer);
}

async function importPatchedGeoTiff() {
  const predictorPath = path.join(projectRoot, 'node_modules', 'geotiff', 'dist-module', 'predictor.js');

  if (fs.existsSync(predictorPath)) {
    const predictorSource = fs.readFileSync(predictorPath, 'utf8');
    const target = `                case 32:
                    row = new Uint32Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4);
                    break;
                default:`;
    const replacement = `                case 32:
                    row = new Uint32Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4);
                    break;
                case 64:
                    row = new Float64Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 8);
                    break;
                default:`;

    if (!predictorSource.includes('case 64:') && predictorSource.includes(target)) {
      fs.writeFileSync(predictorPath, predictorSource.replace(target, replacement));
    }
  }

  return import('geotiff');
}

async function generateLayerTiles(layer) {
  const rasterPath = path.join(projectRoot, 'public', 'data', 'raster', layer.file);
  const outputRoot = path.join(projectRoot, 'public', 'data', 'tiles', layer.id);

  if (!fs.existsSync(rasterPath)) {
    throw new Error(`Raster tidak ditemukan: ${rasterPath}`);
  }

  console.log(`\nGenerating tiles for ${layer.id} from ${layer.file}`);
  fs.rmSync(outputRoot, { recursive: true, force: true });

  const tiff = await fromFile(rasterPath);
  const image = await tiff.getImage();
  const [west, south, east, north] = image.getBoundingBox();
  const width = image.getWidth();
  const height = image.getHeight();
  const noData = image.getGDALNoData();
  const raster = await image.readRasters({ interleave: true });
  const alpha = 255;

  for (const zoom of zooms) {
    const minTile = lonLatToTile(west, north, zoom);
    const maxTile = lonLatToTile(east, south, zoom);
    let count = 0;

    for (let x = minTile.x; x <= maxTile.x; x += 1) {
      for (let y = minTile.y; y <= maxTile.y; y += 1) {
        const png = new PNG({ width: tileSize, height: tileSize });
        const mask = getTileMask(x, y, zoom);
        let hasData = false;

        for (let py = 0; py < tileSize; py += 1) {
          for (let px = 0; px < tileSize; px += 1) {
            const offset = (py * tileSize + px) * 4;

            if (!mask[py * tileSize + px]) {
              png.data[offset + 3] = 0;
              continue;
            }

            const { lon, lat } = tilePixelToLonLat(x, y, zoom, px + 0.5, py + 0.5);
            if (lon < west || lon > east || lat < south || lat > north) {
              png.data[offset + 3] = 0;
              continue;
            }

            const rasterX = clampIndex(Math.floor(((lon - west) / (east - west)) * width), width);
            const rasterY = clampIndex(Math.floor(((north - lat) / (north - south)) * height), height);
            const value = raster[rasterY * width + rasterX];

            if (!isValidValue(value, noData)) {
              png.data[offset + 3] = 0;
              continue;
            }

            const color = layer.color(Number(value));
            if (!color) {
              png.data[offset + 3] = 0;
              continue;
            }

            const [r, g, b] = hexToRgb(color);
            png.data[offset] = r;
            png.data[offset + 1] = g;
            png.data[offset + 2] = b;
            png.data[offset + 3] = alpha;
            hasData = true;
          }
        }

        const tilePath = path.join(outputRoot, String(zoom), String(x), `${y}.png`);
        fs.mkdirSync(path.dirname(tilePath), { recursive: true });
        fs.writeFileSync(tilePath, PNG.sync.write(png, { colorType: 6 }));
        count += hasData ? 1 : 0;
      }
    }

    console.log(`  z${zoom}: ${count} tiles`);
  }
}

function loadStudyArea() {
  const vectorPath = path.join(projectRoot, 'public', 'data', 'vector', 'Kecamatan.geojson');
  const geojson = JSON.parse(fs.readFileSync(vectorPath, 'utf8'));
  const polygons = [];

  for (const feature of geojson.features ?? []) {
    const geometry = feature.geometry;
    if (!geometry) continue;

    if (geometry.type === 'Polygon') {
      polygons.push(preprocessPolygon(geometry.coordinates));
    }

    if (geometry.type === 'MultiPolygon') {
      for (const polygon of geometry.coordinates) {
        polygons.push(preprocessPolygon(polygon));
      }
    }
  }

  return {
    polygons,
    bbox: mergeBBoxes(polygons.map((polygon) => polygon.bbox)),
  };
}

function preprocessPolygon(coordinates) {
  const rings = coordinates.map((ring) => ({
    points: ring,
    bbox: getRingBBox(ring),
  }));

  return {
    outer: rings[0],
    holes: rings.slice(1),
    bbox: mergeBBoxes(rings.map((ring) => ring.bbox)),
  };
}

function getTileMask(x, y, zoom) {
  const key = `${zoom}/${x}/${y}`;
  if (tileMaskCache.has(key)) return tileMaskCache.get(key);

  const mask = new Uint8Array(tileSize * tileSize);

  for (let py = 0; py < tileSize; py += 1) {
    for (let px = 0; px < tileSize; px += 1) {
      const { lon, lat } = tilePixelToLonLat(x, y, zoom, px + 0.5, py + 0.5);
      mask[py * tileSize + px] = isInsideStudyArea(lon, lat) ? 1 : 0;
    }
  }

  tileMaskCache.set(key, mask);
  return mask;
}

function isInsideStudyArea(lon, lat) {
  if (!containsBBox(studyArea.bbox, lon, lat)) return false;

  for (const polygon of studyArea.polygons) {
    if (!containsBBox(polygon.bbox, lon, lat)) continue;
    if (!containsBBox(polygon.outer.bbox, lon, lat)) continue;
    if (!pointInRing(lon, lat, polygon.outer.points)) continue;

    const insideHole = polygon.holes.some((hole) => containsBBox(hole.bbox, lon, lat) && pointInRing(lon, lat, hole.points));
    if (!insideHole) return true;
  }

  return false;
}

function pointInRing(lon, lat, ring) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const intersects = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
}

function getRingBBox(ring) {
  return ring.reduce(
    (bbox, point) => [
      Math.min(bbox[0], point[0]),
      Math.min(bbox[1], point[1]),
      Math.max(bbox[2], point[0]),
      Math.max(bbox[3], point[1]),
    ],
    [Infinity, Infinity, -Infinity, -Infinity],
  );
}

function mergeBBoxes(bboxes) {
  return bboxes.reduce(
    (bbox, item) => [
      Math.min(bbox[0], item[0]),
      Math.min(bbox[1], item[1]),
      Math.max(bbox[2], item[2]),
      Math.max(bbox[3], item[3]),
    ],
    [Infinity, Infinity, -Infinity, -Infinity],
  );
}

function containsBBox(bbox, lon, lat) {
  return lon >= bbox[0] && lon <= bbox[2] && lat >= bbox[1] && lat <= bbox[3];
}

function isValidValue(value, noData) {
  if (!Number.isFinite(value)) return false;
  if (noData !== null && noData !== undefined && value === noData) return false;
  if (value <= -9999) return false;
  return true;
}

function clampIndex(index, size) {
  return Math.max(0, Math.min(size - 1, index));
}

function lonLatToTile(lon, lat, zoom) {
  const n = 2 ** zoom;
  const x = Math.floor(((lon + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);

  return { x, y };
}

function tilePixelToLonLat(tileX, tileY, zoom, pixelX, pixelY) {
  const n = 2 ** zoom;
  const lon = ((tileX + pixelX / tileSize) / n) * 360 - 180;
  const mercatorY = Math.PI * (1 - (2 * (tileY + pixelY / tileSize)) / n);
  const lat = (Math.atan(Math.sinh(mercatorY)) * 180) / Math.PI;

  return { lon, lat };
}

function colorGubi(value) {
  if (!Number.isFinite(value)) return null;
  if (value <= 0.098) return '#FF0000';
  if (value <= 0.318) return '#FFA500';
  if (value <= 0.475) return '#FFFF00';
  if (value <= 0.602) return '#7CFC00';
  return '#008000';
}

function colorUpi(value) {
  if (!Number.isFinite(value)) return null;
  if (value <= 0.249) return '#008000';
  if (value <= 0.304) return '#7CFC00';
  if (value <= 0.371) return '#FFFF00';
  if (value <= 0.466) return '#FFA500';
  return '#FF0000';
}

function colorNdvi(value) {
  if (!Number.isFinite(value)) return null;
  if (value <= 0.522) return '#FF0000';
  if (value <= 0.667) return '#FFA500';
  if (value <= 0.776) return '#FFFF00';
  if (value <= 0.859) return '#7CFC00';
  return '#008000';
}

function colorLst(value) {
  if (!Number.isFinite(value)) return null;
  if (value <= 0.137) return '#008000';
  if (value <= 0.196) return '#7CFC00';
  if (value <= 0.239) return '#FFFF00';
  if (value <= 0.467) return '#FFA500';
  return '#FF0000';
}

function colorNdbi(value) {
  if (!Number.isFinite(value)) return null;
  if (value <= 0.278) return '#008000';
  if (value <= 0.345) return '#7CFC00';
  if (value <= 0.427) return '#FFFF00';
  if (value <= 0.549) return '#FFA500';
  return '#FF0000';
}

function colorRamp(value, min, max, colors) {
  if (!Number.isFinite(value)) return null;
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));

  if (t <= 0.5) return interpolateHex(colors[0], colors[1], t / 0.5);
  return interpolateHex(colors[1], colors[2], (t - 0.5) / 0.5);
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ];
}

function interpolateHex(startHex, endHex, amount) {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const rgb = start.map((channel, index) => Math.round(channel + (end[index] - channel) * amount));

  return rgbToHex(rgb);
}

function rgbToHex(rgb) {
  return `#${rgb.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}
