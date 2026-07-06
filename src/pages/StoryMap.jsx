import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleMarker, GeoJSON, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { ArrowLeft, ArrowRight, Layers, Lightbulb, MapPinned, Route } from 'lucide-react';
import { malangCenter, storyChapters } from '../data/storyMapData.js';
import {
  formatParameterValue,
  getRegionsFromGeoJson,
  getParameterPercent,
  normalizeKecamatanGeoJson,
  parameterMeta,
} from '../data/gubiAnalysisData.js';
import { handleImageFallback, imageAssets } from '../data/imageAssets.js';

const parameterById = Object.fromEntries(parameterMeta.map((parameter) => [parameter.id, parameter]));

export default function StoryMap() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [kecamatanStoryData, setKecamatanStoryData] = useState({ geoJson: null, regions: [] });
  const activeChapter = useMemo(
    () => storyChapters[activeChapterIndex] ?? storyChapters[0],
    [activeChapterIndex],
  );
  const storyRegions = kecamatanStoryData.regions;
  const isFirstChapter = activeChapterIndex === 0;
  const isLastChapter = activeChapterIndex === storyChapters.length - 1;

  useEffect(() => {
    let isMounted = true;

    async function loadStoryData() {
      try {
        const response = await fetch('/data/vector/Kecamatan.geojson');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!isMounted) return;

        setKecamatanStoryData({
          geoJson: normalizeKecamatanGeoJson(data),
          regions: getRegionsFromGeoJson(data),
        });
      } catch {
        if (isMounted) setKecamatanStoryData({ geoJson: null, regions: [] });
      }
    }

    loadStoryData();

    return () => {
      isMounted = false;
    };
  }, []);

  const goToPreviousChapter = () => {
    setActiveChapterIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const goToNextChapter = () => {
    setActiveChapterIndex((currentIndex) => Math.min(currentIndex + 1, storyChapters.length - 1));
  };

  if (!kecamatanStoryData.geoJson) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-carbon-950 text-white">
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-lg bg-white/10">
            <div className="size-9 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          </div>
          <h2 className="mt-5 text-xl font-extrabold animate-pulse">Memuat Story Map...</h2>
          <p className="mt-2 text-sm text-carbon-400">Sedang memuat data spasial kecamatan asli Malang Raya.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-carbon-950 text-white">
      <section className="flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden">
        <StoryHeader
          activeChapter={activeChapter}
          activeChapterIndex={activeChapterIndex}
          isFirstChapter={isFirstChapter}
          isLastChapter={isLastChapter}
          onPrevious={goToPreviousChapter}
          onNext={goToNextChapter}
          onJump={setActiveChapterIndex}
        />

        <div className="grid flex-1 gap-0 overflow-hidden lg:min-h-0 lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.45fr)]">
          <div className="relative z-10 min-h-0 bg-carbon-950 p-4 sm:p-5 lg:p-6">
            <ChapterPanel
              chapter={activeChapter}
              index={activeChapterIndex}
              regions={storyRegions}
              isFirstChapter={isFirstChapter}
              isLastChapter={isLastChapter}
              onPrevious={goToPreviousChapter}
              onNext={goToNextChapter}
            />
          </div>

          <div className="min-h-[46vh] lg:min-h-0">
            <StoryMapCanvas activeChapter={activeChapter} geoJson={kecamatanStoryData.geoJson} regions={storyRegions} />
          </div>
        </div>
      </section>
    </div>
  );
}

function StoryHeader({
  activeChapter,
  activeChapterIndex,
  isFirstChapter,
  isLastChapter,
  onPrevious,
  onNext,
  onJump,
}) {
  return (
    <header className="relative shrink-0 overflow-hidden border-b border-white/10 bg-carbon-950">
      <img
        src={imageAssets.malangPanorama.src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
        draggable="false"
        onError={(event) => handleImageFallback(event, imageAssets.malangPanorama.fallback)}
      />
      <div className="absolute inset-0 bg-carbon-950/70" />

      <div className="page-shell relative z-10 py-4 sm:py-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border-l-4 border-warning-300 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-warning-100 backdrop-blur">
              <Route size={14} aria-hidden="true" />
              Story Map Interaktif
            </div>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
              Membaca Keseimbangan Hijau-Urban Malang Raya
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-carbon-100">
              Gunakan tombol chapter untuk memahami bagaimana indikator spasial membantu membaca ketahanan lingkungan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isFirstChapter}
              onClick={onPrevious}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Previous
            </button>
            <span className="rounded-md bg-warning-300 px-4 py-2 text-sm font-extrabold text-carbon-950">
              {activeChapter.number}/{String(storyChapters.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isLastChapter}
              onClick={onNext}
            >
              Next
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Navigasi chapter Story Map">
          {storyChapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              className={[
                'focus-ring h-2.5 min-w-12 rounded-full transition',
                index === activeChapterIndex ? 'bg-warning-300' : 'bg-white/20 hover:bg-white/35',
              ].join(' ')}
              aria-label={`Buka chapter ${index + 1}: ${chapter.title}`}
              aria-current={index === activeChapterIndex ? 'step' : undefined}
              onClick={() => onJump(index)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

function ChapterPanel({ chapter, index, regions, isFirstChapter, isLastChapter, onPrevious, onNext }) {
  return (
    <motion.article
      key={chapter.id}
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.34, ease: 'easeOut' }}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-warning-300 bg-white text-carbon-950 shadow-soft"
    >
      <div className="flex items-center justify-between gap-4 border-b border-carbon-100 p-4">
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">{chapter.kicker}</span>
        <span className="grid size-11 place-items-center rounded-md bg-carbon-950 text-sm font-extrabold text-white">
          {chapter.number}
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4 lg:overflow-hidden">
        <h2 className="text-2xl font-extrabold leading-tight lg:text-[1.7rem]">{chapter.title}</h2>
        <p className="mt-3 text-sm leading-6 text-carbon-700 sm:text-base">
          {chapter.summary}
        </p>
        {chapter.id === 'rumus-gubi' ? <GubiFormulaFlow /> : null}
        <ParameterIllustration chapter={chapter} regions={regions} />
        <div className="mt-3 rounded-lg border-l-4 border-brand-600 bg-brand-50 p-3 text-carbon-800">
          <div className="flex items-center gap-2 text-sm font-extrabold">
            <Lightbulb size={18} aria-hidden="true" />
            Tahukah Kamu?
          </div>
          <p className="mt-2 text-sm leading-6">{chapter.fact}</p>
        </div>
      </div>

      <div className="grid shrink-0 gap-3 border-t border-carbon-100 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-carbon-500 sm:justify-start">
          <span className="flex items-center gap-2">
            <Layers size={15} aria-hidden="true" />
            Chapter {index + 1} dari {storyChapters.length}
          </span>
          <span>{chapter.visualLabel}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:w-64">
          <button
            type="button"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-carbon-200 bg-white px-3 py-2 text-sm font-extrabold text-carbon-800 transition hover:bg-carbon-50 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={isFirstChapter}
            onClick={onPrevious}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Previous
          </button>
          <button
            type="button"
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-600 px-3 py-2 text-sm font-extrabold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={isLastChapter}
            onClick={onNext}
          >
            Next
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function GubiFormulaFlow() {
  return (
    <div className="mt-4 rounded-lg bg-carbon-50 p-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <div className="rounded-md bg-white p-3 text-carbon-950">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">Kapasitas Hijau</p>
          <p className="mt-1 text-base font-extrabold">NDVI ke GCI</p>
          <p className="mt-1 text-xs leading-5 text-carbon-500">Vegetasi sehat memperkuat daya dukung lingkungan.</p>
        </div>
        <span className="hidden text-2xl font-extrabold text-warning-300 sm:block">-</span>
        <div className="rounded-md bg-white p-3 text-carbon-950">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warning-700">Tekanan Urban</p>
          <p className="mt-1 text-base font-extrabold">NDBI + LST ke UPI</p>
          <p className="mt-1 text-xs leading-5 text-carbon-500">Bangunan dan panas permukaan menunjukkan tekanan wilayah.</p>
        </div>
        <span className="hidden text-2xl font-extrabold text-warning-300 sm:block">=</span>
        <div className="rounded-md bg-brand-700 p-3 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warning-100">Aha!</p>
          <p className="mt-1 text-base font-extrabold">GUBI = GCI - UPI</p>
          <p className="mt-1 text-xs leading-5 text-brand-50">Indeks untuk membaca ketahanan hijau-urban.</p>
        </div>
      </div>
    </div>
  );
}

function ParameterIllustration({ chapter, regions }) {
  const region = selectStoryRegion(regions, chapter);
  const parameter = parameterById[chapter.parameterId];
  if (!region) {
    return (
      <div className="mt-4 rounded-lg bg-carbon-50 p-4 text-sm font-bold text-carbon-600">
        Memuat data kecamatan asli...
      </div>
    );
  }
  const value =
    region.values[chapter.parameterId] ?? region.values.gubi;
  const percent = getParameterPercent(chapter.parameterId, value);
  const color = parameter?.color ?? region.color;

  return (
    <div className="mt-4 rounded-lg bg-carbon-50 p-3">
      <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
        <div className="relative h-28 overflow-hidden rounded-lg bg-carbon-900">
          <img src={getParameterImage(chapter.parameterId)} alt="" className="h-full w-full object-cover" draggable="false" />
          <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: `${color}22` }} />
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">
            {chapter.visualLabel}
          </p>
          <p className="mt-2 text-2xl font-extrabold">
            {formatParameterValue(chapter.parameterId, value)}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-carbon-200">
            <div className="h-full rounded-full" style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: color }} />
          </div>
          <p className="mt-2 text-sm leading-6 text-carbon-600">
            Contoh wilayah: {region.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function StoryMapCanvas({ activeChapter, geoJson, regions }) {
  const focusRegion = selectStoryRegion(regions, activeChapter);

  return (
    <div className="relative h-full bg-carbon-900">
      <MapContainer center={malangCenter} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFlyTo chapter={activeChapter} />
        {geoJson ? (
          <GeoJSON
            key={activeChapter.id}
            data={geoJson}
            style={(feature) => parameterStyle(feature, activeChapter.parameterId)}
            onEachFeature={(feature, layer) => {
              const name = feature.properties?.name ?? feature.properties?.['KEP_MAL.WADMKC'] ?? 'Kecamatan';
              layer.bindTooltip(name, { sticky: true });
            }}
          />
        ) : null}
        {focusRegion ? (
          <CircleMarker center={focusRegion.center} radius={11} pathOptions={markerStyle(activeChapter.parameterId, focusRegion)}>
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <span>{focusRegion.name}</span>
            </Tooltip>
          </CircleMarker>
        ) : null}
      </MapContainer>

      <motion.div
        key={activeChapter.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="absolute left-4 right-4 top-4 z-[500] rounded-lg bg-carbon-950/90 p-4 text-white shadow-soft backdrop-blur sm:left-6 sm:right-auto sm:w-80"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-warning-200">
          <MapPinned size={16} aria-hidden="true" />
          Peta parameter
        </div>
        <h3 className="mt-3 text-xl font-extrabold">{activeChapter.title}</h3>
        <p className="mt-2 text-sm leading-6 text-carbon-200">{activeChapter.summary}</p>
      </motion.div>
    </div>
  );
}

function MapFlyTo({ chapter }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(chapter.center, chapter.zoom, {
      animate: true,
      duration: 1.1,
      easeLinearity: 0.25,
    });
  }, [chapter, map]);

  return null;
}

function parameterStyle(feature, parameterId) {
  const properties = feature?.properties ?? {};
  const parameter = parameterById[parameterId];
  const percent = getParameterPercent(parameterId, properties[parameterId]);
  return {
    color: parameterId === 'gubi' ? properties.color : parameter.color,
    fillColor: parameterId === 'gubi' ? properties.color : parameter.color,
    fillOpacity: Math.max(0.16, percent / 160),
    opacity: parameterId === 'gubi' ? 1 : 0.78,
    weight: parameterId === 'gubi' ? 3 : 2,
  };
}

function markerStyle(parameterId, region) {
  const parameter = parameterById[parameterId];

  return {
    color: '#ffffff',
    fillColor: parameter?.color ?? region.color,
    fillOpacity: 0.95,
    opacity: 1,
    weight: 2,
  };
}

function selectStoryRegion(regions, chapter) {
  const source = regions?.length ? regions : [];
  if (!source.length) return null;

  // Map focusRegionId to real Kecamatan names (case-insensitive matching)
  const idMap = {
    'lowokwaru': 'LOWOKWARU',
    'klojen': 'KLOJEN',
    'rth-barat': 'LOWOKWARU', // Map RTH Barat coordinate region to Lowokwaru
    'sukun': 'SUKUN',
    'batu-wisata': 'BATU',
    'singosari': 'SINGOSARI',
    'kepanjen': 'KEPANJEN',
  };

  const targetName = idMap[chapter.focusRegionId];
  if (targetName) {
    const found = source.find((r) => r.name.toUpperCase() === targetName.toUpperCase());
    if (found) return found;
  }

  const byValue = (parameterId, direction = 'desc') =>
    [...source].sort((a, b) => {
      const first = a.values[parameterId] ?? 0;
      const second = b.values[parameterId] ?? 0;
      return direction === 'asc' ? first - second : second - first;
    })[0];

  if (chapter.id === 'ndvi-gci') return byValue('gci');
  if (chapter.id === 'ndbi-lst-upi') return byValue('upi');
  if (chapter.id === 'peta-gubi') return byValue('gubi');
  if (chapter.id === 'meningkatkan-gubi') return byValue('gubi', 'asc');
  if (chapter.id === 'keseimbangan-kota') {
    return [...source].sort((a, b) => Math.abs(a.values.gubi ?? 0) - Math.abs(b.values.gubi ?? 0))[0] ?? source[0];
  }

  return source[Math.floor(source.length / 2)] ?? null;
}

function getParameterImage(parameterId) {
  if (parameterId === 'ndvi' || parameterId === 'gci') return imageAssets.vegetationCanopy.src;
  if (parameterId === 'ndbi' || parameterId === 'upi') return imageAssets.urbanBuiltUp.src;
  if (parameterId === 'lst') return imageAssets.urbanPressure.src;
  return imageAssets.gubiMapPreview.src;
}
