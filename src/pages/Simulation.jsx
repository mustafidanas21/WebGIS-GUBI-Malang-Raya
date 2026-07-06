import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Gauge, SlidersHorizontal } from 'lucide-react';
import SimulationCharts from '../components/activity/SimulationCharts.jsx';
import SimulationControls from '../components/activity/SimulationControls.jsx';
import SimulationMap from '../components/activity/SimulationMap.jsx';
import { calculateSimulation, simulationDefaults } from '../data/learningActivityData.js';
import {
  getAverageRegionValues,
  getRegionsFromGeoJson,
  normalizeKecamatanGeoJson,
} from '../data/gubiAnalysisData.js';

export default function Simulation() {
  const [simulationValues, setSimulationValues] = useState(simulationDefaults);
  const [simulationData, setSimulationData] = useState({ geoJson: null, regions: [] });
  const baseValues = useMemo(() => getAverageRegionValues(simulationData.regions), [simulationData.regions]);
  const simulation = useMemo(() => calculateSimulation(simulationValues, baseValues), [baseValues, simulationValues]);

  useEffect(() => {
    let isMounted = true;

    async function loadSimulationData() {
      try {
        const response = await fetch('/data/vector/Kecamatan.geojson');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!isMounted) return;

        setSimulationData({
          geoJson: normalizeKecamatanGeoJson(data),
          regions: getRegionsFromGeoJson(data),
        });
      } catch {
        if (isMounted) setSimulationData({ geoJson: null, regions: [] });
      }
    }

    loadSimulationData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSimulationChange = useCallback((key, value) => {
    setSimulationValues((current) => ({ ...current, [key]: value }));
  }, []);

  if (!simulationData.geoJson) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-carbon-100">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-lg bg-white shadow-soft">
            <div className="size-9 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold text-carbon-950 animate-pulse">Memuat Simulator...</h2>
          <p className="mt-2 text-sm text-carbon-600">Sedang memuat data spasial kecamatan asli Malang Raya.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-carbon-100">
      <section className="border-b border-carbon-200 bg-white">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 border-l-4 border-warning-300 bg-brand-50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-800">
              <SlidersHorizontal size={16} aria-hidden="true" />
              GUBI Simulator
            </div>
            <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-carbon-950 sm:text-4xl">
              Coba Skenario Mitigasi Hijau-Urban
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-carbon-600">
              Geser parameter untuk melihat perubahan terhadap rata-rata GCI, UPI, dan GUBI dari data kecamatan asli.
              Skenario ini membantu pengguna memahami dampak vegetasi, pembangunan, dan panas terhadap ketahanan wilayah.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 grid gap-5 py-5 xl:h-[calc(100vh-13rem)] xl:min-h-[580px] grid-cols-1 xl:grid-cols-[280px_1fr_340px] xl:overflow-hidden">
        {/* Column 1: Simulation Controls */}
        <div className="xl:h-full xl:overflow-y-auto pr-1">
          <SimulationControls values={simulationValues} onChange={handleSimulationChange} />
        </div>

        {/* Column 2: Large full-height Map with floating dashboard */}
        <div className="relative h-[480px] sm:h-[540px] xl:h-full xl:min-h-[500px]">
          <SimulationMap geoJson={simulationData.geoJson} simulation={simulation} />
          
          <section className="absolute top-4 left-4 z-[500] w-64 rounded-lg border border-carbon-200 bg-white/95 backdrop-blur p-3.5 shadow-soft">
            <div className="flex flex-col gap-1.5">
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-brand-700">Dashboard GUBI</p>
                <h2 className="text-sm font-extrabold text-carbon-950">Hasil Ketahanan</h2>
              </div>
              <span className={`inline-flex items-center justify-center gap-1 rounded px-2 py-1 text-[10px] font-extrabold ${simulation.status.tone} mt-0.5`}>
                <BadgeCheck size={12} aria-hidden="true" />
                {simulation.status.label}
              </span>
            </div>
            
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <div className="rounded bg-carbon-950 p-2 text-white text-center">
                <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-warning-200">
                  <Gauge size={12} aria-hidden="true" />
                  GUBI
                </div>
                <p className="mt-0.5 text-xl font-extrabold">{simulation.gubi}</p>
              </div>
              <div className="rounded bg-brand-50 p-2 border border-brand-100 text-center">
                <p className="text-[10px] font-bold text-brand-800">Perubahan</p>
                <p className="mt-0.5 text-xl font-extrabold text-brand-900">
                  {simulation.change > 0 ? '+' : ''}
                  {simulation.change}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Column 3: Simulation Charts / Diagrams */}
        <div className="xl:h-full xl:overflow-y-auto pr-1">
          <SimulationCharts simulation={simulation} />
        </div>
      </section>
    </div>
  );
}
