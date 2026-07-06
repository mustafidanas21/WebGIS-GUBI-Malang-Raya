import { basemaps, kecamatanLayer, rasterLayers, webgisCenter } from '../config/layers.js';

export { basemaps, kecamatanLayer, webgisCenter };

export const webgisLayers = rasterLayers.map((layer) => ({
  ...layer,
  parameterId: layer.id,
  rasterUrl: layer.sourceUrl,
  legend: Array.isArray(layer.legend)
    ? layer.legend
    : [
        { label: layer.legend.low, color: layer.legend.colors[0] },
        { label: 'Rentang sedang', color: layer.legend.colors[1] },
        { label: layer.legend.high, color: layer.legend.colors[2] },
      ],
}));
