import {
  calculateGubiValues,
  getGubiCategory,
  gubiGeoJson,
  malangCenter,
  parameterMeta,
} from './pollutionAnalysisData.js';
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
    description: 'NDVI naik, GCI naik, lalu nilai GUBI ikut membaik.',
    color: '#21a98a',
  },
  {
    id: 'builtUpGain',
    label: 'Tambah Kawasan Terbangun',
    description: 'NDBI naik, UPI naik, lalu nilai GUBI cenderung turun.',
    color: '#8b5cf6',
  },
  {
    id: 'lstIncrease',
    label: 'Naikkan Suhu Permukaan',
    description: 'LST naik, UPI naik, lalu tekanan urban menjadi lebih kuat.',
    color: '#ef4444',
  },
];

export const baseScenario = {
  ndvi: 0.38,
  ndbi: 0.48,
  lst: 32.2,
};

export const simulationZoneGeoJson = gubiGeoJson;

export function calculateSimulation(values) {
  // Model edukatif sederhana: slider mengubah NDVI, NDBI, dan LST,
  // lalu GCI, UPI, dan GUBI dihitung ulang menggunakan rumus penelitian.
  const adjustedInputs = {
    ndvi: clamp(baseScenario.ndvi + values.vegetationGain * 0.003, 0, 1),
    ndbi: clamp(baseScenario.ndbi + values.builtUpGain * 0.0025, 0, 1),
    lst: clamp(baseScenario.lst + values.lstIncrease * 0.08 - values.vegetationGain * 0.025, 20, 45),
  };
  const baseValues = calculateGubiValues(baseScenario);
  const adjustedValues = calculateGubiValues(adjustedInputs);
  const change = Math.round((adjustedValues.gubi - baseValues.gubi) * 100) / 100;

  return {
    baseValues,
    adjustedValues,
    gubi: adjustedValues.gubi,
    change,
    status: getGubiCategory(adjustedValues.gubi),
    chartData: [
      { name: 'GCI', value: adjustedValues.gci },
      { name: 'UPI', value: adjustedValues.upi },
      { name: 'GUBI', value: adjustedValues.gubi },
    ],
    impactData: parameterMeta.map((parameter) => ({
      name: parameter.label,
      value: parameter.id === 'lst'
        ? Math.round(adjustedValues.lst)
        : Math.round(adjustedValues[parameter.id] * 100),
      color: parameter.color,
    })),
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
