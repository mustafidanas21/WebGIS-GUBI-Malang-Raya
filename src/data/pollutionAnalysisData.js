export const malangCenter = [-7.92, 112.62];

export const parameterMeta = [
  {
    id: 'ndvi',
    label: 'NDVI',
    fullName: 'Normalized Difference Vegetation Index',
    unit: '',
    color: '#21a98a',
    goodDirection: 'high',
    description: 'NDVI menggambarkan tingkat kehijauan vegetasi. Nilai tinggi berarti vegetasi semakin rapat.',
    fact: 'Tahukah kamu? Vegetasi membantu menjaga keseimbangan lingkungan dengan meningkatkan Green Capacity Index.',
  },
  {
    id: 'ndbi',
    label: 'NDBI',
    fullName: 'Normalized Difference Built-up Index',
    unit: '',
    color: '#8b5cf6',
    goodDirection: 'low',
    description: 'NDBI menggambarkan kawasan terbangun seperti bangunan, jalan, beton, dan permukaan keras.',
    fact: 'Tahukah kamu? Semakin tinggi NDBI, tekanan urban biasanya semakin besar.',
  },
  {
    id: 'lst',
    label: 'LST',
    fullName: 'Land Surface Temperature',
    unit: 'C',
    color: '#ef4444',
    goodDirection: 'low',
    description: 'LST menunjukkan suhu permukaan. Nilai tinggi dapat menandakan tekanan panas kota.',
    fact: 'Tahukah kamu? Permukaan beton dan aspal dapat menyimpan panas lebih lama daripada area hijau.',
  },
  {
    id: 'gci',
    label: 'GCI',
    fullName: 'Green Capacity Index',
    unit: '',
    color: '#16a34a',
    goodDirection: 'high',
    description: 'GCI berasal dari NDVI dan menunjukkan kapasitas ekologis wilayah.',
    fact: 'Tahukah kamu? GCI bernilai 0 sampai 1. Semakin dekat ke 1, kapasitas hijau semakin kuat.',
  },
  {
    id: 'upi',
    label: 'UPI',
    fullName: 'Urban Pressure Index',
    unit: '',
    color: '#f97316',
    goodDirection: 'low',
    description: 'UPI berasal dari kombinasi NDBI dan LST untuk membaca tekanan urban.',
    fact: 'Tahukah kamu? UPI tinggi dapat muncul ketika kawasan terbangun dan suhu permukaan sama-sama tinggi.',
  },
  {
    id: 'gubi',
    label: 'GUBI',
    fullName: 'Green-Urban Balance Index',
    unit: '',
    color: '#0f766e',
    goodDirection: 'high',
    description: 'GUBI menghitung keseimbangan antara kapasitas ekologis dan tekanan urban: GUBI = GCI - UPI.',
    fact: 'Tahukah kamu? GUBI positif berarti kapasitas ekologis lebih dominan daripada tekanan urban.',
  },
];

const baseRegions = [
  {
    id: 'klojen',
    name: 'Klojen - Kota Malang',
    jurisdiction: 'Kota Malang',
    center: [-7.9772, 112.6306],
    inputValues: { ndvi: 0.22, ndbi: 0.68, lst: 35.8 },
    coordinates: [
      [112.6186, -7.9558],
      [112.6468, -7.9588],
      [112.6514, -7.9808],
      [112.6246, -7.9874],
      [112.6114, -7.9714],
      [112.6186, -7.9558],
    ],
  },
  {
    id: 'lowokwaru',
    name: 'Lowokwaru - Kota Malang',
    jurisdiction: 'Kota Malang',
    center: [-7.9464, 112.6175],
    inputValues: { ndvi: 0.39, ndbi: 0.49, lst: 32.4 },
    coordinates: [
      [112.602, -7.928],
      [112.632, -7.93],
      [112.639, -7.951],
      [112.614, -7.963],
      [112.594, -7.948],
      [112.602, -7.928],
    ],
  },
  {
    id: 'kedungkandang',
    name: 'Kedungkandang - Kota Malang',
    jurisdiction: 'Kota Malang',
    center: [-7.9848, 112.6652],
    inputValues: { ndvi: 0.34, ndbi: 0.56, lst: 33.7 },
    coordinates: [
      [112.653, -7.9484],
      [112.6858, -7.9552],
      [112.6896, -7.981],
      [112.6648, -7.9974],
      [112.6428, -7.9816],
      [112.653, -7.9484],
    ],
  },
  {
    id: 'sukun',
    name: 'Sukun - Kota Malang',
    jurisdiction: 'Kota Malang',
    center: [-7.9958, 112.6178],
    inputValues: { ndvi: 0.45, ndbi: 0.42, lst: 31.5 },
    coordinates: [
      [112.598, -7.982],
      [112.632, -7.986],
      [112.637, -8.012],
      [112.604, -8.021],
      [112.585, -8.001],
      [112.598, -7.982],
    ],
  },
  {
    id: 'rth-barat',
    name: 'Ruang Hijau Barat Laut - Kota Malang',
    jurisdiction: 'Kota Malang',
    center: [-7.9396, 112.5919],
    inputValues: { ndvi: 0.72, ndbi: 0.21, lst: 27.6 },
    coordinates: [
      [112.5758, -7.9206],
      [112.6088, -7.9188],
      [112.6152, -7.9446],
      [112.5908, -7.9562],
      [112.5688, -7.9414],
      [112.5758, -7.9206],
    ],
  },
  {
    id: 'batu-wisata',
    name: 'Batu - Kawasan Wisata',
    jurisdiction: 'Kota Batu',
    center: [-7.8721, 112.5255],
    inputValues: { ndvi: 0.69, ndbi: 0.27, lst: 26.8 },
    coordinates: [
      [112.497, -7.846],
      [112.548, -7.848],
      [112.562, -7.878],
      [112.531, -7.905],
      [112.486, -7.891],
      [112.497, -7.846],
    ],
  },
  {
    id: 'singosari',
    name: 'Singosari - Kabupaten Malang',
    jurisdiction: 'Kabupaten Malang',
    center: [-7.8926, 112.6658],
    inputValues: { ndvi: 0.47, ndbi: 0.46, lst: 31.8 },
    coordinates: [
      [112.635, -7.872],
      [112.688, -7.874],
      [112.699, -7.903],
      [112.662, -7.922],
      [112.622, -7.904],
      [112.635, -7.872],
    ],
  },
  {
    id: 'kepanjen',
    name: 'Kepanjen - Kabupaten Malang',
    jurisdiction: 'Kabupaten Malang',
    center: [-8.1308, 112.5726],
    inputValues: { ndvi: 0.51, ndbi: 0.38, lst: 30.6 },
    coordinates: [
      [112.538, -8.106],
      [112.596, -8.108],
      [112.608, -8.142],
      [112.568, -8.165],
      [112.523, -8.14],
      [112.538, -8.106],
    ],
  },
];

export const analysisRegions = baseRegions.map((region) => {
  const values = calculateGubiValues(region.inputValues);
  const category = getGubiCategory(values.gubi);

  return {
    ...region,
    values,
    category: category.label,
    color: category.color,
  };
});

export const gubiGeoJson = {
  type: 'FeatureCollection',
  features: analysisRegions.map((region) => ({
    type: 'Feature',
    properties: {
      id: region.id,
      name: region.name,
      jurisdiction: region.jurisdiction,
      category: region.category,
      color: region.color,
      balanceIndex: region.values.gubi,
      ...region.values,
    },
    geometry: {
      type: 'Polygon',
      coordinates: [region.coordinates],
    },
  })),
};

export const pollutionGeoJson = gubiGeoJson;

export function calculateGubiValues(values) {
  const ndvi = clamp(values.ndvi, 0, 1);
  const ndbi = clamp(values.ndbi, 0, 1);
  const lst = clamp(values.lst, 20, 45);
  const gci = round2(ndvi);
  const normalizedLst = clamp((lst - 20) / 25, 0, 1);
  const upi = round2((ndbi + normalizedLst) / 2);
  const gubi = round2(gci - upi);

  return { ndvi, ndbi, lst, gci, upi, gubi };
}

export function calculateGubi(values) {
  return calculateGubiValues(values).gubi;
}

export function calculatePollutionIndex(values) {
  return calculateGubi(values);
}

export function getGubiCategory(gubi) {
  if (gubi >= 0.25) {
    return {
      label: 'Kapasitas ekologis dominan',
      shortLabel: 'Ekologis dominan',
      color: '#21a98a',
      tone: 'bg-brand-50 text-brand-800',
    };
  }

  if (gubi >= -0.15) {
    return {
      label: 'Relatif seimbang',
      shortLabel: 'Seimbang',
      color: '#f8ba52',
      tone: 'bg-warning-50 text-warning-900',
    };
  }

  return {
    label: 'Tekanan urban dominan',
    shortLabel: 'Urban dominan',
    color: '#e77f12',
    tone: 'bg-warning-100 text-warning-900',
  };
}

export function getPollutionCategory(index) {
  return getGubiCategory(index);
}

export function getParameterValue(region, parameterId) {
  return region.values[parameterId];
}

export function getParameterPercent(parameterId, value) {
  if (parameterId === 'lst') return Math.round(clamp((value - 20) / 25, 0, 1) * 100);
  if (parameterId === 'gubi') return Math.round(((value + 1) / 2) * 100);
  return Math.round(clamp(value, 0, 1) * 100);
}

export function formatParameterValue(parameterId, value) {
  if (parameterId === 'lst') return `${value.toFixed(1)} C`;
  if (parameterId === 'gubi') return value.toFixed(2);
  return value.toFixed(2);
}

export function getAverageParameters(regions = analysisRegions) {
  const totals = Object.fromEntries(parameterMeta.map((parameter) => [parameter.id, 0]));

  regions.forEach((region) => {
    parameterMeta.forEach((parameter) => {
      totals[parameter.id] += region.values[parameter.id];
    });
  });

  return Object.fromEntries(
    parameterMeta.map((parameter) => [parameter.id, totals[parameter.id] / regions.length]),
  );
}

export function getRegionById(regionId) {
  return analysisRegions.find((region) => region.id === regionId) ?? analysisRegions[0];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function round2(value) {
  return Math.round(value * 100) / 100;
}
