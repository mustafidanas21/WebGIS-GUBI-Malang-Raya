import { SlidersHorizontal } from 'lucide-react';
import { simulationFactors } from '../../data/learningActivityData.js';

export default function SimulationControls({ values, onChange }) {
  return (
    <section className="rounded-lg border border-carbon-200 bg-white p-3.5 shadow-soft">
      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-700">
        <SlidersHorizontal size={14} aria-hidden="true" />
        Simulasi
      </div>
      <h2 className="mt-1 text-lg font-extrabold text-carbon-950">Skenario Ketahanan</h2>
      <p className="mt-1 text-xs leading-5 text-carbon-600">
        Geser nilai untuk melihat dampaknya pada GCI, UPI, nilai GUBI, grafik, dan warna peta untuk memahami ketahanan wilayah.
      </p>

      <div className="mt-3.5 grid gap-2.5">
        {simulationFactors.map((factor) => (
          <label key={factor.id} className="block rounded-lg bg-carbon-50 p-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold text-carbon-950">{factor.label}</span>
                <p className="mt-0.5 text-[11px] leading-4 text-carbon-550">{factor.description}</p>
              </div>
              <span className="rounded px-1.5 py-0.5 text-xs font-extrabold text-white" style={{ backgroundColor: factor.color }}>
                {values[factor.id]}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values[factor.id]}
              className="mt-2 w-full accent-brand-600 cursor-pointer"
              aria-label={factor.label}
              onChange={(event) => onChange(factor.id, Number(event.target.value))}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
