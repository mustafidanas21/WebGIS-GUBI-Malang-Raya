import {
  getGubiCategory,
  malangCenter,
} from './gubiAnalysisData.js';
import quizQuestionData from './quizQuestions.json';

export const simulationCenter = malangCenter;

export const quizQuestions = quizQuestionData;

export const simulationDefaults = {
  vegetationGain: 25,
  builtUpGain: 20,
  lstIncrease: 10,
};

export const simulationFactors = [
  {
    id: 'vegetationGain',
    label: 'Tambah Vegetasi',
    description: 'NDVI naik, GCI naik, dan ketahanan ekosistem wilayah ikut membaik.',
    color: '#21a98a',
  },
  {
    id: 'builtUpGain',
    label: 'Tambah Kawasan Terbangun',
    description: 'NDBI naik, UPI naik, sehingga tekanan pemanfaatan lahan perlu dikendalikan.',
    color: '#8b5cf6',
  },
  {
    id: 'lstIncrease',
    label: 'Naikkan Suhu Permukaan',
    description: 'LST naik, UPI naik, dan paparan panas perlu dimitigasi dengan ruang hijau.',
    color: '#ef4444',
  },
];

export const baseScenario = {
  ndvi: 0.5,
  gci: 0.5,
  upi: 0.35,
  gubi: 0.15,
};

export function calculateSimulation(values, baseValues = baseScenario) {
  // Baseline berasal dari rata-rata atribut asli GCI, UPI, dan GUBI pada Kecamatan.geojson.
  // Slider mengubah baseline tersebut sebagai skenario mitigasi sederhana.
  const adjustedValues = {
    ndvi: clamp((baseValues.ndvi ?? baseValues.gci) + values.vegetationGain * 0.003, 0, 1),
    gci: clamp(baseValues.gci + values.vegetationGain * 0.003, 0, 1),
    upi: clamp(baseValues.upi + values.builtUpGain * 0.0025 + values.lstIncrease * 0.002 - values.vegetationGain * 0.001, 0, 1),
  };
  adjustedValues.gubi = Math.round((adjustedValues.gci - adjustedValues.upi) * 100) / 100;
  const change = Math.round((adjustedValues.gubi - baseValues.gubi) * 100) / 100;

  return {
    baseValues: {
      ...baseValues,
      gubi: Math.round((baseValues.gubi ?? baseValues.gci - baseValues.upi) * 100) / 100,
    },
    adjustedValues,
    gubi: adjustedValues.gubi,
    change,
    status: getGubiCategory(adjustedValues.gubi),
    chartData: [
      { name: 'GCI', value: adjustedValues.gci },
      { name: 'UPI', value: adjustedValues.upi },
      { name: 'GUBI', value: adjustedValues.gubi },
    ],
    impactData: [
      { name: 'NDVI', value: Math.round(adjustedValues.ndvi * 100), color: '#21a98a' },
      { name: 'GCI', value: Math.round(adjustedValues.gci * 100), color: '#16a34a' },
      { name: 'UPI', value: Math.round(adjustedValues.upi * 100), color: '#f97316' },
      { name: 'GUBI', value: Math.round((adjustedValues.gubi + 1) * 50), color: '#0f766e' },
    ],
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
