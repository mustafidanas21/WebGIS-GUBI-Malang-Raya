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
    legend: {
      low: 'Urban Pressure dominan',
      high: 'Green Capacity dominan',
      colors: ['#e77f12', '#f8ba52', '#21a98a'],
    },
    description: 'GUBI menunjukkan keseimbangan antara kapasitas ekologis dan tekanan urbanisasi.',
    getColor: (value) => {
      if (!Number.isFinite(value)) return null;
      if (value < -0.15) return '#e77f12';
      if (value < 0.25) return '#f8ba52';
      return '#21a98a';
    },
  },
  {
    id: 'gci',
    name: 'GCI',
    fullName: 'Green Capacity Index (GCI)',
    group: 'Raster',
    sourceUrl: '/data/raster/GCI.tif',
    tileUrl: '/data/tiles/gci/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: false,
    opacity: 100,
    legend: {
      low: 'Green Capacity rendah',
      high: 'Green Capacity tinggi',
      colors: ['#dcfce7', '#4ade80', '#15803d'],
    },
    description: 'GCI menggambarkan kapasitas ekologis yang berkaitan dengan kehijauan vegetasi.',
    getColor: (value) => colorRamp(value, 0, 1, ['#dcfce7', '#4ade80', '#15803d']),
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
    legend: {
      low: 'Urban Pressure rendah',
      high: 'Urban Pressure tinggi',
      colors: ['#ffedd5', '#fb923c', '#c2410c'],
    },
    description: 'UPI menggambarkan tekanan urbanisasi dari kawasan terbangun dan suhu permukaan.',
    getColor: (value) => colorRamp(value, 0, 1, ['#ffedd5', '#fb923c', '#c2410c']),
  },
  {
    id: 'ndvi',
    name: 'NDVI',
    fullName: 'NDVI',
    group: 'Raster',
    sourceUrl: '/data/raster/NDVI.tif',
    tileUrl: '/data/tiles/ndvi/{z}/{x}/{y}.png',
    bounds: rasterTileBounds,
    minZoom: 9,
    maxNativeZoom: 13,
    defaultVisible: false,
    opacity: 100,
    legend: {
      low: 'Vegetasi rendah',
      high: 'Vegetasi tinggi',
      colors: ['#f7fee7', '#86efac', '#15803d'],
    },
    description: 'NDVI menggambarkan tingkat kehijauan vegetasi.',
    getColor: (value) => colorRamp(value, 0, 1, ['#f7fee7', '#86efac', '#15803d']),
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
    legend: {
      low: 'Kawasan terbangun rendah',
      high: 'Kawasan terbangun tinggi',
      colors: ['#f5f3ff', '#a78bfa', '#6d28d9'],
    },
    description: 'NDBI menggambarkan dominasi kawasan terbangun.',
    getColor: (value) => colorRamp(value, 0, 1, ['#f5f3ff', '#a78bfa', '#6d28d9']),
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
    legend: {
      low: 'Suhu rendah',
      high: 'Suhu tinggi',
      colors: ['#dbeafe', '#f8ba52', '#dc2626'],
    },
    description: 'LST menggambarkan suhu permukaan lahan.',
    getColor: (value) => colorRamp(value, 20, 45, ['#dbeafe', '#f8ba52', '#dc2626']),
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
