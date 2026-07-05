import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Gauge, SlidersHorizontal } from 'lucide-react';
import SimulationCharts from '../components/activity/SimulationCharts.jsx';
import SimulationControls from '../components/activity/SimulationControls.jsx';
import SimulationMap from '../components/activity/SimulationMap.jsx';
import { calculateSimulation, simulationDefaults } from '../data/learningActivityData.js';

export default function Simulation() {
  const [simulationValues, setSimulationValues] = useState(simulationDefaults);
  const simulation = useMemo(() => calculateSimulation(simulationValues), [simulationValues]);

  const handleSimulationChange = useCallback((key, value) => {
    setSimulationValues((current) => ({ ...current, [key]: value }));
  }, []);

  return (
    <div className="bg-carbon-100">
      <section className="border-b border-carbon-200 bg-white">
        <div className="page-shell py-5">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 border-l-4 border-warning-300 bg-brand-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-800">
              <SlidersHorizontal size={16} aria-hidden="true" />
              GUBI Simulator
            </div>
            <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-carbon-950 sm:text-4xl">
              Coba Skenario Keseimbangan Hijau-Urban
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-carbon-600">
              Geser parameter untuk melihat bagaimana NDVI, NDBI, dan LST memengaruhi GCI, UPI, dan nilai GUBI.
              Model ini dummy, tetapi membantu siswa memahami hubungan sebab-akibat secara visual.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-shell grid gap-5 py-5 lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[360px_minmax(0,1fr)]">
        <SimulationControls values={simulationValues} onChange={handleSimulationChange} />

        <div className="grid gap-5">
          <section className="rounded-lg border border-carbon-200 bg-white p-4 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Dashboard GUBI</p>
                <h2 className="mt-2 text-2xl font-extrabold text-carbon-950">Hasil Simulasi</h2>
              </div>
              <span className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-extrabold ${simulation.status.tone}`}>
                <BadgeCheck size={18} aria-hidden="true" />
                {simulation.status.label}
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-carbon-950 p-5 text-white">
                <div className="flex items-center gap-2 text-sm font-bold text-warning-200">
                  <Gauge size={18} aria-hidden="true" />
                  Nilai GUBI
                </div>
                <p className="mt-3 text-5xl font-extrabold">{simulation.gubi}</p>
                <p className="mt-2 text-sm text-carbon-200">GUBI positif berarti kapasitas ekologis lebih dominan.</p>
              </div>
              <div className="rounded-lg bg-brand-50 p-5">
                <p className="text-sm font-bold text-brand-800">Perubahan dari kondisi awal</p>
                <p className="mt-3 text-5xl font-extrabold text-brand-900">
                  {simulation.change > 0 ? '+' : ''}
                  {simulation.change}
                </p>
                <p className="mt-2 text-sm text-brand-800">Nilai positif berarti keseimbangan hijau-urban membaik.</p>
              </div>
            </div>
          </section>

          <SimulationMap simulation={simulation} />
          <SimulationCharts simulation={simulation} />
        </div>
      </section>
    </div>
  );
}
