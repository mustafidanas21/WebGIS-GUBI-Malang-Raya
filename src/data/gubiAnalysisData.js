export const malangCenter = [-7.92, 112.62];

const vectorFields = {
  name: ['KEP_MAL.Kecamatan', 'KEP_MAL.WADMKC', 'olah.csv.KECAMATAN'],
  density: ['KEP_MAL.Kepadatan_', 'Kepadatan', 'Sheet1$.Kepadatan_Penduduk_per_km_perse', 'Kepadatan_Penduduk_per_km_perse'],
  gci: ['olah.csv.GCI', 'GCI', 'olah.csv.NDVI', 'NDVI', 'ndvi'],
  upi: ['olah.csv.UPI', 'UPI'],
  gubi: ['olah.csv.GUBI', 'GUBI'],
};

export const parameterMeta = [
  {
    id: 'ndvi',
    label: 'NDVI',
    fullName: 'Normalized Difference Vegetation Index',
    unit: '',
    color: '#21a98a',
    goodDirection: 'high',
    description: 'NDVI menggambarkan kehijauan vegetasi. Nilai tinggi menunjukkan vegetasi lebih rapat dan ekosistem lebih kuat.',
    fact: 'Tahukah kamu? Vegetasi membantu menahan panas, menyerap air hujan, dan memperkuat ketahanan lingkungan.',
  },
  {
    id: 'ndbi',
    label: 'NDBI',
    fullName: 'Normalized Difference Built-up Index',
    unit: '',
    color: '#8b5cf6',
    goodDirection: 'low',
    description: 'NDBI menggambarkan kawasan terbangun seperti bangunan, jalan, beton, dan permukaan keras.',
    fact: 'Tahukah kamu? NDBI tinggi membantu kita mengenali pola pembangunan yang perlu dikelola agar tetap nyaman dan aman.',
  },
  {
    id: 'lst',
    label: 'LST',
    fullName: 'Land Surface Temperature',
    unit: 'C',
    color: '#ef4444',
    goodDirection: 'low',
    description: 'LST menunjukkan suhu permukaan. Nilai tinggi dapat menandakan paparan panas yang memengaruhi kenyamanan warga.',
    fact: 'Tahukah kamu? Peta suhu permukaan membantu warga dan instansi publik mengenali area pemukiman yang mendesak untuk diberi peneduh hijau.',
  },
  {
    id: 'gci',
    label: 'GCI',
    fullName: 'Green Capacity Index',
    unit: '',
    color: '#16a34a',
    goodDirection: 'high',
    description: 'GCI berasal dari NDVI dan menunjukkan kapasitas hijau wilayah untuk menjaga kualitas lingkungan.',
    fact: 'Tahukah kamu? GCI tinggi berarti infrastruktur hijau seperti pohon dan ruang terbuka lebih mendukung ketahanan kota.',
  },
  {
    id: 'upi',
    label: 'UPI',
    fullName: 'Urban Pressure Index',
    unit: '',
    color: '#f97316',
    goodDirection: 'low',
    description: 'UPI berasal dari NDBI dan LST untuk membaca tekanan pembangunan dan panas permukaan.',
    fact: 'Tahukah kamu? UPI tinggi memberi sinyal wilayah yang perlu perhatian dalam perencanaan ruang dan mitigasi panas.',
  },
  {
    id: 'gubi',
    label: 'GUBI',
    fullName: 'Green-Urban Balance Index',
    unit: '',
    color: '#0f766e',
    goodDirection: 'high',
    description: 'GUBI menghitung keseimbangan antara kapasitas hijau dan tekanan urban: GUBI = GCI - UPI.',
    fact: 'Tahukah kamu? GUBI membantu membandingkan wilayah yang lebih tangguh secara lingkungan dengan wilayah yang lebih tertekan.',
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

export function normalizeKecamatanFeature(feature, index = 0) {
  const properties = feature?.properties ?? {};
  const gci = round2(readNumber(properties, vectorFields.gci, 0));
  const upi = round2(readNumber(properties, vectorFields.upi, 0));
  const gubi = round2(readNumber(properties, vectorFields.gubi, gci - upi));
  const category = getGubiCategory(gubi);
  const name = String(readValue(properties, vectorFields.name, `Kecamatan ${index + 1}`));
  const density = readNumber(properties, vectorFields.density, 0);

  return {
    ...feature,
    properties: {
      ...properties,
      id: feature?.id ?? index,
      name,
      density,
      category: category.label,
      color: category.color,
      balanceIndex: gubi,
      ndvi: gci,
      gci,
      upi,
      gubi,
    },
  };
}

export function normalizeKecamatanGeoJson(data) {
  return {
    type: 'FeatureCollection',
    features: (data?.features ?? []).map((feature, index) => normalizeKecamatanFeature(feature, index)),
  };
}

export function getRegionFromFeature(feature, index = 0) {
  const normalizedFeature = normalizeKecamatanFeature(feature, index);
  const properties = normalizedFeature.properties;

  return {
    id: String(properties.id ?? index),
    name: properties.name,
    jurisdiction: 'Malang Raya',
    center: getFeatureCenter(normalizedFeature),
    values: {
      ndvi: properties.ndvi,
      gci: properties.gci,
      upi: properties.upi,
      gubi: properties.gubi,
    },
    category: properties.category,
    color: properties.color,
    density: properties.density,
    feature: normalizedFeature,
  };
}

export function getRegionsFromGeoJson(data) {
  return normalizeKecamatanGeoJson(data).features.map((feature, index) => getRegionFromFeature(feature, index));
}

export function getAverageRegionValues(regions = []) {
  const source = regions.length ? regions : analysisRegions;
  const totals = source.reduce(
    (accumulator, region) => ({
      gci: accumulator.gci + (region.values.gci ?? 0),
      upi: accumulator.upi + (region.values.upi ?? 0),
      gubi: accumulator.gubi + (region.values.gubi ?? 0),
      ndvi: accumulator.ndvi + (region.values.ndvi ?? region.values.gci ?? 0),
    }),
    { gci: 0, upi: 0, gubi: 0, ndvi: 0 },
  );
  const count = Math.max(source.length, 1);

  return {
    gci: round2(totals.gci / count),
    upi: round2(totals.upi / count),
    gubi: round2(totals.gubi / count),
    ndvi: round2(totals.ndvi / count),
  };
}

export function getGubiCategory(gubi) {
  if (!Number.isFinite(gubi)) {
    return {
      label: 'Tidak diketahui',
      shortLabel: '-',
      color: '#737373',
      tone: 'bg-carbon-50 text-carbon-800',
    };
  }

  if (gubi <= 0.098) {
    return {
      label: 'Kawasan Urban Sangat Dominan',
      shortLabel: 'Urban Sangat Dominan',
      color: '#FF0000',
      tone: 'bg-red-50 text-red-800 border border-red-100',
    };
  }
  if (gubi <= 0.318) {
    return {
      label: 'Kawasan Urban Dominan',
      shortLabel: 'Urban Dominan',
      color: '#FFA500',
      tone: 'bg-orange-50 text-orange-800 border border-orange-100',
    };
  }
  if (gubi <= 0.475) {
    return {
      label: 'Kawasan Seimbang',
      shortLabel: 'Seimbang',
      color: '#FFFF00',
      tone: 'bg-yellow-50 text-yellow-800 border border-yellow-100',
    };
  }
  if (gubi <= 0.602) {
    return {
      label: 'Kawasan Hijau Dominan',
      shortLabel: 'Hijau Dominan',
      color: '#7CFC00',
      tone: 'bg-green-50 text-green-800 border border-green-100',
    };
  }
  return {
    label: 'Kawasan Hijau Sangat Dominan',
    shortLabel: 'Hijau Sangat Dominan',
    color: '#008000',
    tone: 'bg-emerald-50 text-emerald-800 border border-emerald-100',
  };
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
  if (!Number.isFinite(value)) return '-';
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

function readValue(properties, fields, fallback) {
  const field = fields.find((key) => properties[key] !== undefined && properties[key] !== null && properties[key] !== '');
  return field ? properties[field] : fallback;
}

function readNumber(properties, fields, fallback = 0) {
  const value = Number(readValue(properties, fields, fallback));
  return Number.isFinite(value) ? value : fallback;
}

function getFeatureCenter(feature) {
  const points = [];
  collectCoordinates(feature?.geometry?.coordinates, points);

  if (!points.length) return malangCenter;

  const total = points.reduce(
    (accumulator, coordinate) => ({
      lng: accumulator.lng + coordinate[0],
      lat: accumulator.lat + coordinate[1],
    }),
    { lng: 0, lat: 0 },
  );

  return [total.lat / points.length, total.lng / points.length];
}

function collectCoordinates(coordinates, points) {
  if (!Array.isArray(coordinates)) return;

  if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    points.push(coordinates);
    return;
  }

  coordinates.forEach((item) => collectCoordinates(item, points));
}
