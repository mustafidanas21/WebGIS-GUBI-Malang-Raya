import { SlidersHorizontal } from 'lucide-react';
import { simulationFactors } from '../../data/learningActivityData.js';

export default function SimulationControls({ values, onChange }) {
  return (
    <section className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">
        <SlidersHorizontal size={18} aria-hidden="true" />
        Simulasi
      </div>
      <h2 className="mt-2 text-2xl font-extrabold text-carbon-950">GUBI Simulator</h2>
      <p className="mt-2 text-sm leading-6 text-carbon-600">
        Geser nilai dan lihat dampaknya pada GCI, UPI, nilai GUBI, grafik, dan warna peta. Tujuannya adalah
        memahami hubungan antara vegetasi, kawasan terbangun, dan suhu permukaan.
      </p>

      <div className="mt-6 grid gap-5">
        {simulationFactors.map((factor) => (
          <label key={factor.id} className="block rounded-lg bg-carbon-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-extrabold text-carbon-950">{factor.label}</span>
                <p className="mt-1 text-sm leading-6 text-carbon-600">{factor.description}</p>
              </div>
              <span className="rounded-md px-2 py-1 text-sm font-extrabold text-white" style={{ backgroundColor: factor.color }}>
                {values[factor.id]}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values[factor.id]}
              className="mt-4 w-full accent-brand-600"
              aria-label={factor.label}
              onChange={(event) => onChange(factor.id, Number(event.target.value))}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
