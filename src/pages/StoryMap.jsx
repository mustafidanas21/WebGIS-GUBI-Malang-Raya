import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleMarker, GeoJSON, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { ArrowDown, Layers, Lightbulb, MapPinned, Route } from 'lucide-react';
import { malangCenter, pollutionGeoJson, storyChapters } from '../data/storyMapData.js';
import {
  analysisRegions,
  formatParameterValue,
  getParameterPercent,
  parameterMeta,
} from '../data/pollutionAnalysisData.js';

const parameterById = Object.fromEntries(parameterMeta.map((parameter) => [parameter.id, parameter]));

export default function StoryMap() {
  const [activeChapterId, setActiveChapterId] = useState(storyChapters[0].id);
  const chapterRefs = useRef({});
  const activeChapter = useMemo(
    () => storyChapters.find((chapter) => chapter.id === activeChapterId) ?? storyChapters[0],
    [activeChapterId],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveChapterId(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-28% 0px -38% 0px',
        threshold: [0.2, 0.45, 0.7],
      },
    );

    storyChapters.forEach((chapter) => {
      const element = chapterRefs.current[chapter.id];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-carbon-950 text-white">
      <StoryHero />
      <section className="relative lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)]">
        <div className="relative z-10 bg-carbon-950">
          <div className="px-4 py-10 sm:px-6 lg:px-10">
            <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-carbon-200">
              Gulir perlahan. Peta, zoom, marker, dan penjelasan akan mengikuti chapter yang sedang dibaca.
            </div>
            <div className="grid gap-8">
              {storyChapters.map((chapter, index) => (
                <ChapterPanel
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  isActive={chapter.id === activeChapterId}
                  refCallback={(element) => {
                    chapterRefs.current[chapter.id] = element;
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="top-16 h-[72vh] lg:sticky lg:h-[calc(100vh-4rem)]">
          <StoryMapCanvas activeChapter={activeChapter} />
        </div>
      </section>
    </div>
  );
}

function StoryHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-carbon-950">
      <img
        src="/assets/illustrations/story-parameter.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        draggable="false"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-carbon-950 to-transparent" />
      <div className="absolute right-[-8rem] top-[-6rem] h-[34rem] w-[34rem] rounded-full border border-white/15" />
      <div className="absolute right-24 top-28 h-3/5 w-24 rotate-12 bg-warning-300/80" />

      <div className="page-shell relative z-10 flex min-h-[72vh] items-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 border-l-4 border-warning-300 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-warning-100 backdrop-blur">
            <Route size={16} aria-hidden="true" />
            Story Map Interaktif
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Membaca Keseimbangan Hijau-Urban Malang Raya
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-carbon-100 sm:text-lg">
            Ikuti tujuh chapter pembelajaran. Setiap bagian memperkenalkan parameter secara bertahap sampai siswa
            menemukan cara membaca keseimbangan hijau-urban.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-warning-200">
            Scroll untuk memulai
            <ArrowDown size={18} aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChapterPanel({ chapter, index, isActive, refCallback }) {
  return (
    <motion.article
      id={chapter.id}
      ref={refCallback}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.48 }}
      className={[
        'min-h-[76vh] rounded-lg border p-6 transition-colors sm:p-8',
        isActive ? 'border-warning-300 bg-white text-carbon-950 shadow-soft' : 'border-white/10 bg-white/[0.06] text-white',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={[
            'text-sm font-extrabold uppercase tracking-[0.2em]',
            isActive ? 'text-brand-700' : 'text-warning-200',
          ].join(' ')}
        >
          {chapter.kicker}
        </span>
        <span
          className={[
            'grid size-12 place-items-center rounded-md text-sm font-extrabold',
            isActive ? 'bg-carbon-950 text-white' : 'bg-white/10 text-white',
          ].join(' ')}
        >
          {chapter.number}
        </span>
      </div>
      <h2 className="mt-8 text-3xl font-extrabold leading-tight sm:text-4xl">{chapter.title}</h2>
      <p className={['mt-5 text-base leading-8', isActive ? 'text-carbon-700' : 'text-carbon-200'].join(' ')}>
        {chapter.summary}
      </p>
      {chapter.id === 'rumus-gubi' ? <GubiFormulaFlow isActive={isActive} /> : null}
      <ParameterIllustration chapter={chapter} isActive={isActive} />
      <div
        className={[
          'mt-8 rounded-lg border-l-4 p-5',
          isActive ? 'border-brand-600 bg-brand-50 text-carbon-800' : 'border-warning-300 bg-white/10 text-carbon-100',
        ].join(' ')}
      >
        <div className="flex items-center gap-2 text-sm font-extrabold">
          <Lightbulb size={18} aria-hidden="true" />
          Fakta Menarik
        </div>
        <p className="mt-3 text-sm leading-7">{chapter.fact}</p>
      </div>
      <div className="mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] opacity-75">
        <Layers size={16} aria-hidden="true" />
        Chapter {index + 1} dari {storyChapters.length}
      </div>
    </motion.article>
  );
}

function GubiFormulaFlow({ isActive }) {
  const boxClass = isActive ? 'bg-white text-carbon-950' : 'bg-white/10 text-white';
  const mutedClass = isActive ? 'text-carbon-500' : 'text-carbon-300';

  return (
    <div className={['mt-7 rounded-lg p-4', isActive ? 'bg-carbon-50' : 'bg-white/10'].join(' ')}>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <div className={`rounded-md p-4 ${boxClass}`}>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">Kapasitas Hijau</p>
          <p className="mt-2 text-lg font-extrabold">NDVI ke GCI</p>
          <p className={`mt-1 text-sm ${mutedClass}`}>Vegetasi makin rapat, GCI makin tinggi.</p>
        </div>
        <span className="hidden text-2xl font-extrabold text-warning-300 sm:block">-</span>
        <div className={`rounded-md p-4 ${boxClass}`}>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warning-700">Tekanan Urban</p>
          <p className="mt-2 text-lg font-extrabold">NDBI + LST ke UPI</p>
          <p className={`mt-1 text-sm ${mutedClass}`}>Bangunan dan panas permukaan menaikkan UPI.</p>
        </div>
        <span className="hidden text-2xl font-extrabold text-warning-300 sm:block">=</span>
        <div className="rounded-md bg-brand-700 p-4 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-warning-100">Aha!</p>
          <p className="mt-2 text-lg font-extrabold">GUBI = GCI - UPI</p>
          <p className="mt-1 text-sm text-brand-50">Nilai ini menunjukkan keseimbangan hijau-urban.</p>
        </div>
      </div>
    </div>
  );
}

function ParameterIllustration({ chapter, isActive }) {
  const region = analysisRegions.find((item) => item.id === chapter.focusRegionId) ?? analysisRegions[0];
  const parameter = parameterById[chapter.parameterId];
  const value =
    region.values[chapter.parameterId] ?? region.values.gubi;
  const percent = getParameterPercent(chapter.parameterId, value);
  const color = parameter?.color ?? region.color;

  return (
    <div className={['mt-8 rounded-lg p-4', isActive ? 'bg-carbon-50' : 'bg-white/10'].join(' ')}>
      <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
        <div className="h-32 overflow-hidden rounded-lg bg-carbon-900">
          <img
            src="/assets/illustrations/story-parameter.svg"
            alt=""
            className="h-full w-full object-cover"
            style={{ backgroundColor: color }}
            draggable="false"
          />
        </div>
        <div>
          <p className={['text-xs font-extrabold uppercase tracking-[0.16em]', isActive ? 'text-brand-700' : 'text-warning-200'].join(' ')}>
            {chapter.visualLabel}
          </p>
          <p className="mt-2 text-2xl font-extrabold">
            {formatParameterValue(chapter.parameterId, value)}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-carbon-200">
            <div className="h-full rounded-full" style={{ width: `${Math.min(percent, 100)}%`, backgroundColor: color }} />
          </div>
          <p className={['mt-3 text-sm leading-6', isActive ? 'text-carbon-600' : 'text-carbon-200'].join(' ')}>
            Contoh wilayah: {region.name}
          </p>
        </div>
      </div>
    </div>
  );
}

function StoryMapCanvas({ activeChapter }) {
  const focusRegion = analysisRegions.find((region) => region.id === activeChapter.focusRegionId) ?? analysisRegions[0];

  return (
    <div className="relative h-full bg-carbon-900">
      <MapContainer center={malangCenter} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFlyTo chapter={activeChapter} />
        <GeoJSON
          key={activeChapter.id}
          data={pollutionGeoJson}
          style={(feature) => parameterStyle(feature, activeChapter.parameterId)}
        >
          <Tooltip sticky>
            <span>Peta parameter dummy Malang Raya</span>
          </Tooltip>
        </GeoJSON>
        <CircleMarker center={focusRegion.center} radius={11} pathOptions={markerStyle(activeChapter.parameterId, focusRegion)}>
          <Tooltip direction="top" offset={[0, -8]} opacity={1}>
            <span>{focusRegion.name}</span>
          </Tooltip>
        </CircleMarker>
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
