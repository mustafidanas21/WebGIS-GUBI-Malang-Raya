import { Eye, EyeOff, Layers, SlidersHorizontal } from 'lucide-react';

export default function LayerPanel({ layers, layerState, overlay, onToggleLayer, onToggleOverlay, onOpacityChange }) {
  return (
    <aside className="flex h-full flex-col border-r border-carbon-200 bg-white">
      <div className="border-b border-carbon-200 p-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">
          <Layers size={18} aria-hidden="true" />
          Layer Control
        </div>
        <h2 className="mt-1 text-lg font-extrabold text-carbon-950">Data Spasial</h2>
        <p className="mt-1 text-xs leading-5 text-carbon-600">Pilih satu raster utama, lalu atur opacity.</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className="grid gap-2">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-carbon-500">Raster</p>
          {layers.map((layer) => {
            const state = layerState[layer.id];
            const isVisible = state?.visible;

            return (
              <article key={layer.id} className="mb-2 rounded-lg border border-carbon-200 bg-carbon-50 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-carbon-500">{layer.group}</p>
                    <h3 className="mt-1 text-base font-extrabold text-carbon-950">{layer.name}</h3>
                    {layer.rasterUrl ? (
                      <p className="mt-1 text-xs font-semibold text-brand-700">Tile dari raster asli</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="focus-ring grid size-9 shrink-0 place-items-center rounded-md border border-carbon-200 bg-white text-carbon-700"
                    aria-label={`${isVisible ? 'Sembunyikan' : 'Tampilkan'} layer ${layer.name}`}
                    onClick={() => onToggleLayer(layer.id)}
                  >
                    {isVisible ? <Eye size={18} aria-hidden="true" /> : <EyeOff size={18} aria-hidden="true" />}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-carbon-600">
                  <SlidersHorizontal size={15} aria-hidden="true" />
                  Opacity {state?.opacity ?? 0}%
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state?.opacity ?? 50}
                  className="mt-3 w-full accent-brand-600"
                  aria-label={`Opacity layer ${layer.name}`}
                  onChange={(event) => onOpacityChange(layer.id, Number(event.target.value))}
                />

                {isVisible ? <div className="mt-3 grid gap-2">
                  {layer.legend.map((item) => (
                    <div key={`${layer.id}-${item.label}`} className="flex items-center gap-2 text-xs text-carbon-600">
                      <span className="size-3 rounded-sm" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </div>
                  ))}
                </div> : null}
              </article>
            );
          })}
          </div>

          <div className="rounded-lg border border-carbon-200 bg-carbon-50 p-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-carbon-500">Overlay</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-carbon-950">{overlay.name}</h3>
                <p className="mt-1 text-xs font-semibold text-brand-700">Kecamatan.geojson</p>
              </div>
              <button
                type="button"
                className="focus-ring grid size-9 shrink-0 place-items-center rounded-md border border-carbon-200 bg-white text-carbon-700"
                aria-label={`${overlay.visible ? 'Sembunyikan' : 'Tampilkan'} overlay ${overlay.name}`}
                onClick={onToggleOverlay}
              >
                {overlay.visible ? <Eye size={18} aria-hidden="true" /> : <EyeOff size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
