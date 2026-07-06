export const webgisCenter = [-7.92, 112.62];

export const rasterTileBounds = [
  [-8.45, 112.28],
  [-7.72, 112.97],
];

export const kecamatanLayer = {
  id: 'kecamatan',
  name: 'Kecamatan',
  url: '/data/vector/Kecamatan.geojson',
};

export const rasterLayers = [
  {
    id: 'gubi',
    name: 'GUBI',
    fullName: 'Green-Urban Balance Index (GUBI)',
    group: 'Raster',
    sourceUrl: '/data/raster/GUBI.tif',
    tileUrl: '/data/tiles/gubi/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: true,
    opacity: 100,
    legend: [
      { color: '#FF0000', label: '-0.568 – 0.098 | Kawasan Urban Sangat Dominan' },
      { color: '#FFA500', label: '0.099 – 0.318 | Kawasan Urban Dominan' },
      { color: '#FFFF00', label: '0.319 – 0.475 | Kawasan Seimbang' },
      { color: '#7CFC00', label: '0.476 – 0.602 | Kawasan Hijau Dominan' },
      { color: '#008000', label: '0.603 – 0.910 | Kawasan Hijau Sangat Dominan' },
    ],
    description: 'GUBI menunjukkan keseimbangan hijau-urban untuk membaca ketahanan lingkungan wilayah.',
    getColor: (value) => {
      if (!Number.isFinite(value)) return '#737373';
      if (value <= 0.098) return '#FF0000';
      if (value <= 0.318) return '#FFA500';
      if (value <= 0.475) return '#FFFF00';
      if (value <= 0.602) return '#7CFC00';
      return '#008000';
    },
  },
  {
    id: 'upi',
    name: 'UPI',
    fullName: 'Urban Pressure Index (UPI)',
    group: 'Raster',
    sourceUrl: '/data/raster/UPI.tif',
    tileUrl: '/data/tiles/upi/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: false,
    opacity: 100,
    legend: [
      { color: '#008000', label: '0.058 – 0.249 | Tingkat Polusi Sangat Rendah' },
      { color: '#7CFC00', label: '0.250 – 0.304 | Tingkat Polusi Rendah' },
      { color: '#FFFF00', label: '0.305 – 0.371 | Tingkat Polusi Sedang' },
      { color: '#FFA500', label: '0.372 – 0.466 | Tingkat Polusi Tinggi' },
      { color: '#FF0000', label: '0.467 – 0.748 | Tingkat Polusi Sangat Tinggi' },
    ],
    description: 'UPI menggambarkan tekanan pembangunan dan paparan panas yang perlu dimitigasi.',
    getColor: (value) => {
      if (!Number.isFinite(value)) return '#737373';
      if (value <= 0.249) return '#008000';
      if (value <= 0.304) return '#7CFC00';
      if (value <= 0.371) return '#FFFF00';
      if (value <= 0.466) return '#FFA500';
      return '#FF0000';
    },
  },
  {
    id: 'ndvi',
    name: 'NDVI (GCI)',
    fullName: 'NDVI / Green Capacity Index (GCI)',
    group: 'Raster',
    sourceUrl: '/data/raster/NDVI.tif',
    tileUrl: '/data/tiles/ndvi/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: false,
    opacity: 100,
    legend: [
      { color: '#FF0000', label: '0.001 – 0.522 | Vegetasi Sangat Rendah' },
      { color: '#FFA500', label: '0.523 – 0.667 | Vegetasi Rendah' },
      { color: '#FFFF00', label: '0.668 – 0.776 | Vegetasi Sedang' },
      { color: '#7CFC00', label: '0.777 – 0.859 | Vegetasi Tinggi' },
      { color: '#008000', label: '0.860 – 1.000 | Vegetasi Sangat Tinggi' },
    ],
    description: 'NDVI menggambarkan kesehatan vegetasi, yang merepresentasikan Indeks Kapasitas Hijau (GCI) dalam formula GUBI.',
    getColor: (value) => {
      if (!Number.isFinite(value)) return '#737373';
      if (value <= 0.522) return '#FF0000';
      if (value <= 0.667) return '#FFA500';
      if (value <= 0.776) return '#FFFF00';
      if (value <= 0.859) return '#7CFC00';
      return '#008000';
    },
  },
  {
    id: 'ndbi',
    name: 'NDBI',
    fullName: 'NDBI',
    group: 'Raster',
    sourceUrl: '/data/raster/NDBI.tif',
    tileUrl: '/data/tiles/ndbi/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: false,
    opacity: 100,
    legend: [
      { color: '#008000', label: '0.001 – 0.278 | Kawasan Terbangun Sangat Rendah' },
      { color: '#7CFC00', label: '0.279 – 0.345 | Kawasan Terbangun Rendah' },
      { color: '#FFFF00', label: '0.346 – 0.427 | Kawasan Terbangun Sedang' },
      { color: '#FFA500', label: '0.428 – 0.549 | Kawasan Terbangun Tinggi' },
      { color: '#FF0000', label: '0.550 – 1.000 | Kawasan Terbangun Sangat Tinggi' },
    ],
    description: 'NDBI menggambarkan pola kawasan terbangun dan intensitas pemanfaatan lahan.',
    getColor: (value) => {
      if (!Number.isFinite(value)) return '#737373';
      if (value <= 0.278) return '#008000';
      if (value <= 0.345) return '#7CFC00';
      if (value <= 0.427) return '#FFFF00';
      if (value <= 0.549) return '#FFA500';
      return '#FF0000';
    },
  },
  {
    id: 'lst',
    name: 'LST',
    fullName: 'Land Surface Temperature (LST)',
    group: 'Raster',
    sourceUrl: '/data/raster/LST.tif',
    tileUrl: '/data/tiles/lst/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: false,
    opacity: 100,
    legend: [
      { color: '#008000', label: '0.001 – 0.137 | Suhu Permukaan Sangat Rendah' },
      { color: '#7CFC00', label: '0.138 – 0.196 | Suhu Permukaan Rendah' },
      { color: '#FFFF00', label: '0.197 – 0.239 | Suhu Permukaan Sedang' },
      { color: '#FFA500', label: '0.240 – 0.467 | Suhu Permukaan Tinggi' },
      { color: '#FF0000', label: '0.468 – 1.000 | Suhu Permukaan Sangat Tinggi' },
    ],
    description: 'LST menggambarkan suhu permukaan untuk membaca paparan panas perkotaan.',
    getColor: (value) => {
      if (!Number.isFinite(value)) return '#737373';
      if (value <= 0.137) return '#008000';
      if (value <= 0.196) return '#7CFC00';
      if (value <= 0.239) return '#FFFF00';
      if (value <= 0.467) return '#FFA500';
      return '#FF0000';
    },
  },
];

export const basemaps = [
  {
    id: 'osm',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  {
    id: 'light',
    name: 'Light Canvas',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  },
  {
    id: 'terrain',
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors',
  },
];

function colorRamp(value, min, max, colors) {
  if (!Number.isFinite(value)) return null;
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));

  if (t < 0.5) return colors[0];
  if (t < 0.75) return colors[1];
  return colors[2];
}
