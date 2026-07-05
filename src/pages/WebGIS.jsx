import { useCallback, useEffect, useMemo, useState } from 'react';
import { Layers, Search, X } from 'lucide-react';
import LayerPanel from '../components/webgis/LayerPanel.jsx';
import WebGISMap from '../components/webgis/WebGISMap.jsx';
import { basemaps, kecamatanLayer, webgisLayers } from '../data/webgisData.js';
import { getDisplayFields, loadGeoJson } from '../services/VectorService.js';

export default function WebGIS() {
  const [activeBasemap, setActiveBasemap] = useState(basemaps[0].id);
  const [, setCoordinates] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [kecamatanData, setKecamatanData] = useState(null);
  const [, setAttributeFields] = useState([]);
  const [vectorStatus, setVectorStatus] = useState({ loading: true, error: '' });
  const [rasterStatus, setRasterStatus] = useState({});
  const [isKecamatanVisible, setIsKecamatanVisible] = useState(true);
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState(null);
  const [layerState, setLayerState] = useState(() =>
    Object.fromEntries(
      webgisLayers.map((layer) => [
        layer.id,
        {
          visible: layer.defaultVisible,
          opacity: layer.opacity,
        },
      ]),
    ),
  );

  useEffect(() => {
    let isMounted = true;

    async function loadKecamatan() {
      setVectorStatus({ loading: true, error: '' });

      try {
        const { data, fields } = await loadGeoJson(kecamatanLayer.url);
        if (isMounted) {
          setKecamatanData(data);
          setAttributeFields(fields);
          setVectorStatus({ loading: false, error: '' });
        }
      } catch (error) {
        if (isMounted) {
          setVectorStatus({
            loading: false,
            error: `${kecamatanLayer.name} gagal dimuat: ${error.message}`,
          });
        }
      }
    }

    loadKecamatan();

    return () => {
      isMounted = false;
    };
  }, []);

  const searchLocations = useMemo(() => {
    if (!kecamatanData?.features) return [];

    return kecamatanData.features.map((feature) => ({
      name: getSearchName(feature.properties),
      center: getFeatureCenter(feature),
      bounds: getFeatureBounds(feature),
      zoom: 12,
      feature,
    }));
  }, [kecamatanData]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return searchLocations.filter((location) => location.name.toLowerCase().includes(query)).slice(0, 5);
  }, [searchLocations, searchQuery]);

  const activeInfoLayer = useMemo(() => {
    const visibleLayer = webgisLayers.find((layer) => layerState[layer.id]?.visible);
    return visibleLayer ?? webgisLayers[0];
  }, [layerState]);

  const handleToggleLayer = useCallback((layerId) => {
    setLayerState((current) =>
      Object.fromEntries(
        webgisLayers.map((layer) => [
          layer.id,
          {
            ...current[layer.id],
            visible: layer.id === layerId,
          },
        ]),
      ),
    );
  }, []);

  const handleOpacityChange = useCallback((layerId, opacity) => {
    setLayerState((current) => ({
      ...current,
      [layerId]: {
        ...current[layerId],
        opacity,
      },
    }));
  }, []);

  const handleSelectSearch = useCallback((location) => {
    setSearchTarget({ ...location, timestamp: Date.now() });
    setSearchQuery(location.name);
    setSelectedFeature(location.feature);
  }, []);

  const handleSelectFeature = useCallback((feature) => {
    setSelectedFeature(feature);
  }, []);

  const handleRasterStatusChange = useCallback((layerId, status) => {
    setRasterStatus((current) => ({
      ...current,
      [layerId]: status,
    }));
  }, []);

  return (
    <div className="bg-carbon-100 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
      <section className="border-b border-carbon-200 bg-white px-4 py-3 lg:h-14">
        <div className="flex h-full flex-col justify-center gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">WebGIS GUBI</p>
            <h1 className="truncate text-lg font-extrabold text-carbon-950 sm:text-xl">Eksplorasi GUBI Malang Raya</h1>
          </div>
          <p className="max-w-2xl text-xs font-semibold leading-5 text-carbon-600 lg:text-right">
            Bandingkan NDVI, NDBI, LST, GCI, UPI, dan GUBI dalam satu workspace peta horizontal.
          </p>
        </div>
      </section>

      <section className="relative grid min-h-[calc(100vh-8rem)] grid-cols-1 lg:block lg:h-[calc(100%-3.5rem)] lg:min-h-0">
        <div className="order-2 min-h-[620px] lg:absolute lg:inset-0 lg:min-h-0">
          <WebGISMap
            layers={webgisLayers}
            layerState={layerState}
            activeBasemap={activeBasemap}
            onBasemapChange={setActiveBasemap}
            onCoordinateChange={setCoordinates}
            onSelectFeature={handleSelectFeature}
            searchTarget={searchTarget}
            selectedFeature={selectedFeature}
            kecamatanData={kecamatanData}
            isKecamatanVisible={isKecamatanVisible}
            vectorStatus={vectorStatus}
            rasterStatus={rasterStatus}
            onRasterStatusChange={handleRasterStatusChange}
          />
        </div>

        <div className="pointer-events-none absolute left-4 top-4 z-[700] hidden items-center gap-2 lg:flex">
          <button
            type="button"
            className="pointer-events-auto focus-ring inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-extrabold text-carbon-900 shadow-soft transition hover:bg-brand-50"
            aria-pressed={isLayerPanelOpen}
            onClick={() => setIsLayerPanelOpen((value) => !value)}
          >
            <Layers size={17} aria-hidden="true" />
            Layer
          </button>
          <div className="pointer-events-auto rounded-lg bg-white/95 px-3 py-2 text-xs font-bold text-carbon-700 shadow-soft">
            Layer aktif: {activeInfoLayer.name}
          </div>
        </div>

        <SearchOverlay
          value={searchQuery}
          results={searchResults}
          isLoading={vectorStatus.loading}
          selectedName={selectedFeature ? getSearchName(selectedFeature.properties) : ''}
          onChange={setSearchQuery}
          onSelect={handleSelectSearch}
        />

        <div
          className={[
            'order-1 min-h-[460px] lg:absolute lg:bottom-4 lg:left-4 lg:top-16 lg:z-[710] lg:min-h-0 lg:w-[300px] lg:overflow-hidden lg:rounded-lg lg:border lg:border-carbon-200 lg:shadow-soft',
            isLayerPanelOpen ? 'lg:block' : 'lg:hidden',
          ].join(' ')}
        >
          <PanelCloseButton label="Tutup panel layer" onClose={() => setIsLayerPanelOpen(false)} />
          <LayerPanel
            layers={webgisLayers}
            layerState={layerState}
            overlay={{ ...kecamatanLayer, visible: isKecamatanVisible }}
            onToggleLayer={handleToggleLayer}
            onToggleOverlay={() => setIsKecamatanVisible((value) => !value)}
            onOpacityChange={handleOpacityChange}
          />
        </div>
      </section>
    </div>
  );
}

function SearchOverlay({ value, results, isLoading, selectedName, onChange, onSelect }) {
  const hasQuery = value.trim().length > 0;

  return (
    <section className="order-3 bg-white p-4 lg:absolute lg:right-20 lg:top-4 lg:z-[700] lg:w-80 lg:rounded-lg lg:border lg:border-carbon-200 lg:bg-white/95 lg:p-3 lg:shadow-soft">
      <label htmlFor="webgis-search" className="sr-only">
        Cari kecamatan
      </label>
      <div className="flex items-center gap-2 rounded-md border border-carbon-200 bg-white px-3 py-2">
        <Search size={17} className="shrink-0 text-carbon-500" aria-hidden="true" />
        <input
          id="webgis-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Cari kecamatan..."
          className="w-full bg-transparent text-sm font-semibold text-carbon-900 outline-none placeholder:text-carbon-400"
        />
      </div>
      {hasQuery ? (
        <div className="mt-2 max-h-52 overflow-y-auto rounded-md bg-white">
          {results.map((result) => (
            <button
              key={result.name}
              type="button"
              className={[
                'focus-ring block w-full rounded-md px-3 py-2 text-left text-sm font-semibold transition',
                selectedName === result.name ? 'bg-brand-100 text-brand-900' : 'text-carbon-700 hover:bg-brand-50 hover:text-brand-800',
              ].join(' ')}
              onClick={() => onSelect(result)}
            >
              {result.name}
            </button>
          ))}
          {!isLoading && results.length === 0 ? (
            <p className="rounded-md px-3 py-2 text-sm text-carbon-500">Kecamatan tidak ditemukan.</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function PanelCloseButton({ label, onClose }) {
  return (
    <button
      type="button"
      className="focus-ring absolute right-3 top-3 z-10 hidden size-8 place-items-center rounded-md bg-carbon-100 text-carbon-700 transition hover:bg-carbon-200 lg:grid"
      aria-label={label}
      onClick={onClose}
    >
      <X size={16} aria-hidden="true" />
    </button>
  );
}

function getFeatureCenter(feature) {
  const points = [];
  collectCoordinates(feature.geometry?.coordinates, points);

  if (!points.length) return [-7.92, 112.62];

  const total = points.reduce(
    (accumulator, coordinate) => ({
      lng: accumulator.lng + coordinate[0],
      lat: accumulator.lat + coordinate[1],
    }),
    { lng: 0, lat: 0 },
  );

  return [total.lat / points.length, total.lng / points.length];
}

function getFeatureBounds(feature) {
  const points = [];
  collectCoordinates(feature.geometry?.coordinates, points);

  if (!points.length) return null;

  const bounds = points.reduce(
    (accumulator, coordinate) => ({
      west: Math.min(accumulator.west, coordinate[0]),
      south: Math.min(accumulator.south, coordinate[1]),
      east: Math.max(accumulator.east, coordinate[0]),
      north: Math.max(accumulator.north, coordinate[1]),
    }),
    { west: Infinity, south: Infinity, east: -Infinity, north: -Infinity },
  );

  return [
    [bounds.south, bounds.west],
    [bounds.north, bounds.east],
  ];
}

function collectCoordinates(coordinates, points) {
  if (!Array.isArray(coordinates)) return;

  if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    points.push(coordinates);
    return;
  }

  coordinates.forEach((item) => collectCoordinates(item, points));
}

function getSearchName(properties = {}) {
  const fields = getDisplayFields(properties);
  const preferredField = fields.find((field) => /kecamatan|wadmkc/i.test(field)) ?? fields[0];
  return preferredField ? String(properties[preferredField] ?? 'Kecamatan') : 'Kecamatan';
}
