import { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import {
  GeoJSON,
  MapContainer,
  ScaleControl,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { AlertTriangle, Expand, LocateFixed, Loader2, Map as MapIcon } from 'lucide-react';
import { basemaps, webgisCenter } from '../../data/webgisData.js';
import { formatPropertyValue, getDisplayFields } from '../../services/VectorService.js';

export default function WebGISMap({
  layers,
  layerState,
  activeBasemap,
  onBasemapChange,
  onCoordinateChange,
  onSelectFeature,
  searchTarget,
  selectedFeature,
  kecamatanData,
  isKecamatanVisible,
  vectorStatus,
  rasterStatus,
  onRasterStatusChange,
}) {
  const mapShellRef = useRef(null);
  const selectedVectorLayerRef = useRef(null);
  const selectedFeatureKey = selectedFeature ? getFeatureKey(selectedFeature) : '';
  const basemap = basemaps.find((item) => item.id === activeBasemap) ?? basemaps[0];

  const visibleLayers = useMemo(
    () => layers.filter((layer) => layerState[layer.id]?.visible),
    [layerState, layers],
  );

  const handleFullscreen = async () => {
    if (!mapShellRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await mapShellRef.current.requestFullscreen();
    } catch {
      // Fullscreen can be blocked by browser policy; the map remains usable without it.
    }
  };

  return (
    <section
      ref={mapShellRef}
      className="relative h-full min-h-[620px] overflow-hidden bg-carbon-900 lg:min-h-0"
      aria-label="Peta WebGIS interaktif"
    >
      <MapContainer center={webgisCenter} zoom={11} className="h-full w-full" zoomControl={false}>
        <TileLayer key={basemap.id} url={basemap.url} attribution={basemap.attribution} />
        <ScaleControl position="bottomleft" metric imperial={false} />
        <PaneSetup />
        <CoordinateTracker onCoordinateChange={onCoordinateChange} />
        <FlyToSearch target={searchTarget} />
        <FitToKecamatan data={kecamatanData} />

        {visibleLayers.map((layer) => (
          <RasterTileLayer
            key={`${layer.id}-${layerState[layer.id]?.opacity}`}
            layer={layer}
            opacity={layerState[layer.id]?.opacity ?? layer.opacity}
            onRasterStatusChange={onRasterStatusChange}
          />
        ))}

        {kecamatanData && isKecamatanVisible ? (
          <GeoJSON
            key={`kecamatan-overlay-${selectedFeatureKey}`}
            pane="vectorPane"
            data={kecamatanData}
            style={(feature) => kecamatanStyle(feature, selectedFeatureKey)}
            onEachFeature={(feature, leafletLayer) => {
              const isSelected = getFeatureKey(feature) === selectedFeatureKey;
              if (isSelected) {
                selectedVectorLayerRef.current = leafletLayer;
                leafletLayer.bringToFront();
              }

              leafletLayer.on({
                mouseover: () => {
                  leafletLayer.setStyle({
                    fillOpacity: 0.18,
                    weight: 2.4,
                  });
                  leafletLayer.bringToFront();
                },
                mouseout: () => {
                  if (selectedVectorLayerRef.current !== leafletLayer) {
                    leafletLayer.setStyle(kecamatanStyle(feature, selectedFeatureKey));
                  }
                },
                click: () => {
                  if (selectedVectorLayerRef.current && selectedVectorLayerRef.current !== leafletLayer) {
                    selectedVectorLayerRef.current.setStyle(kecamatanStyle(selectedVectorLayerRef.current.feature, selectedFeatureKey));
                  }
                  selectedVectorLayerRef.current = leafletLayer;
                  leafletLayer.setStyle({
                    color: '#f8ba52',
                    fillOpacity: 0.24,
                    opacity: 1,
                    weight: 3,
                  });
                  leafletLayer.bringToFront();
                  onSelectFeature(feature);
                },
              });
              leafletLayer.bindPopup(buildPopup(feature), {
                className: 'webgis-popup',
                maxWidth: 300,
              });
            }}
          />
        ) : null}

        <MapControlButtons onFullscreen={handleFullscreen} />
      </MapContainer>

      <BasemapSwitcher activeBasemap={activeBasemap} onBasemapChange={onBasemapChange} />
      <Legend layers={layers} layerState={layerState} />
      <MiniMap activeBasemap={basemap} />
      <MapStatusOverlay vectorStatus={vectorStatus} rasterStatus={rasterStatus} visibleLayers={visibleLayers} />
    </section>
  );
}

function RasterTileLayer({ layer, opacity, onRasterStatusChange }) {
  const tileErrorCountRef = useRef(0);

  useEffect(() => {
    tileErrorCountRef.current = 0;
    onRasterStatusChange(layer.id, { loading: true, error: '' });
  }, [layer.id, onRasterStatusChange]);

  return (
    <TileLayer
      key={layer.id}
      pane="rasterPane"
      url={layer.tileUrl}
      bounds={layer.bounds}
      opacity={opacity / 100}
      minZoom={layer.minZoom ?? 9}
      maxNativeZoom={layer.maxNativeZoom ?? 13}
      maxZoom={18}
      noWrap
      eventHandlers={{
        loading: () => onRasterStatusChange(layer.id, { loading: true, error: '' }),
        load: () => onRasterStatusChange(layer.id, { loading: false, error: '' }),
        tileerror: () => {
          tileErrorCountRef.current += 1;
          onRasterStatusChange(layer.id, {
            loading: false,
            error:
              tileErrorCountRef.current > 2
                ? `Tile ${layer.name} belum tersedia. Jalankan npm run tiles.`
                : '',
          });
        },
      }}
    />
  );
}

function PaneSetup() {
  const map = useMap();

  useEffect(() => {
    if (!map.getPane('rasterPane')) {
      map.createPane('rasterPane');
      map.getPane('rasterPane').style.zIndex = 350;
    }
    if (!map.getPane('vectorPane')) {
      map.createPane('vectorPane');
      map.getPane('vectorPane').style.zIndex = 450;
    }
  }, [map]);

  return null;
}

function CoordinateTracker({ onCoordinateChange }) {
  useMapEvents({
    mousemove(event) {
      onCoordinateChange(event.latlng);
    },
    mouseout() {
      onCoordinateChange(null);
    },
  });

  return null;
}

function FitToKecamatan({ data }) {
  const map = useMap();
  const hasFitRef = useRef(false);

  useEffect(() => {
    if (!data || hasFitRef.current) return;

    const bounds = L.geoJSON(data).getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [24, 24] });
      hasFitRef.current = true;
    }
  }, [data, map]);

  return null;
}

function FlyToSearch({ target }) {
  const map = useMap();

  useEffect(() => {
    if (!target) return;

    if (target.bounds) {
      map.flyToBounds(target.bounds, {
        animate: true,
        duration: 0.9,
        maxZoom: 13,
        padding: [80, 80],
      });
      return;
    }

    map.flyTo(target.center, target.zoom, { animate: true, duration: 0.8 });
  }, [map, target]);

  return null;
}

function MapControlButtons({ onFullscreen }) {
  const map = useMap();

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control grid gap-2 border-0 bg-transparent shadow-none">
        <button
          type="button"
          className="grid size-10 place-items-center rounded-md bg-white text-carbon-800 shadow-soft transition hover:bg-brand-50"
          aria-label="Kembali ke pusat Malang Raya"
          onClick={() => map.flyTo(webgisCenter, 11)}
        >
          <LocateFixed size={19} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-md bg-white text-carbon-800 shadow-soft transition hover:bg-brand-50"
          aria-label="Fullscreen"
          onClick={onFullscreen}
        >
          <Expand size={19} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function BasemapSwitcher({ activeBasemap, onBasemapChange }) {
  return (
    <div className="absolute left-4 top-16 z-[500] flex items-center gap-2 rounded-lg bg-white/95 p-2 shadow-soft lg:top-[4.5rem]">
      <label htmlFor="basemap-select" className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-carbon-600">
        <MapIcon size={15} aria-hidden="true" />
        Basemap
      </label>
      <select
        id="basemap-select"
        value={activeBasemap}
        className="focus-ring rounded-md border border-carbon-200 bg-carbon-50 px-2 py-1.5 text-xs font-extrabold text-carbon-800 outline-none"
        onChange={(event) => onBasemapChange(event.target.value)}
      >
        {basemaps.map((basemap) => (
          <option
            key={basemap.id}
            value={basemap.id}
          >
            {basemap.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function Legend({ layers, layerState }) {
  const visibleLayers = layers.filter((layer) => layerState[layer.id]?.visible);

  return (
    <div className="absolute bottom-4 right-4 z-[500] max-h-72 w-64 overflow-y-auto rounded-lg bg-white p-4 shadow-soft">
      <p className="text-sm font-extrabold text-carbon-950">Legenda</p>
      <div className="mt-3 grid gap-3">
        {visibleLayers.map((layer) => (
          <div key={layer.id}>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-carbon-500">{layer.name}</p>
            <div className="mt-2 grid gap-1.5">
              {layer.legend.map((item) => (
                <div key={`${layer.id}-${item.label}`} className="flex items-center gap-2 text-xs text-carbon-700">
                  <span className="size-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniMap({ activeBasemap }) {
  return (
    <div className="absolute bottom-4 left-4 z-[500] hidden h-36 w-48 overflow-hidden rounded-lg border-4 border-white bg-white shadow-soft md:block">
      <MapContainer
        center={webgisCenter}
        zoom={9}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer key={`mini-${activeBasemap.id}`} url={activeBasemap.url} attribution="" />
      </MapContainer>
      <div className="pointer-events-none absolute inset-0 border-2 border-warning-400" />
      <p className="pointer-events-none absolute bottom-1 left-2 rounded bg-white/90 px-2 py-1 text-[10px] font-extrabold text-carbon-800">
        Mini Map
      </p>
    </div>
  );
}

function MapStatusOverlay({ vectorStatus, rasterStatus, visibleLayers }) {
  const activeRasterStatus = visibleLayers.map((layer) => rasterStatus[layer.id]).find(Boolean);
  const isLoading = vectorStatus?.loading || activeRasterStatus?.loading;
  const errors = [
    vectorStatus?.error,
    ...visibleLayers.map((layer) => rasterStatus[layer.id]?.error),
  ].filter(Boolean);

  if (!isLoading && errors.length === 0) return null;

  return (
    <div className="absolute left-4 right-4 top-24 z-[500] grid gap-2 sm:left-auto sm:w-80">
      {isLoading ? (
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-extrabold text-carbon-800 shadow-soft">
          <Loader2 className="animate-spin text-brand-700" size={18} aria-hidden="true" />
          Memuat data spasial asli...
        </div>
      ) : null}
      {errors.map((error) => (
        <div key={error} className="flex gap-2 rounded-lg bg-warning-100 px-4 py-3 text-sm font-bold text-warning-900 shadow-soft">
          <AlertTriangle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
}

function kecamatanStyle(feature, selectedFeatureKey = '') {
  const isSelected = selectedFeatureKey && getFeatureKey(feature) === selectedFeatureKey;

  return {
    color: isSelected ? '#f8ba52' : '#ffffff',
    fillColor: '#0f766e',
    fillOpacity: isSelected ? 0.28 : 0.04,
    opacity: 0.92,
    weight: isSelected ? 3 : 1.2,
  };
}

function getFeatureKey(feature) {
  const properties = feature?.properties ?? {};
  const fields = getDisplayFields(properties);
  const preferredField = fields.find((field) => /kecamatan|wadmkc|name|nama/i.test(field)) ?? fields[0];

  if (preferredField) return `${preferredField}:${properties[preferredField]}`;
  if (feature?.id !== undefined) return `id:${feature.id}`;
  return JSON.stringify(feature?.geometry?.coordinates?.[0]?.[0] ?? '');
}

function buildPopup(feature) {
  const properties = feature.properties ?? {};
  const rows = getDisplayFields(properties)
    .map(
      (field) => `
        <div class="flex items-center justify-between gap-3 border-b border-carbon-100 py-1.5 text-xs">
          <span class="font-bold text-carbon-600">${escapeHtml(field)}</span>
          <span class="text-right font-extrabold text-carbon-950">${escapeHtml(formatPropertyValue(properties[field]))}</span>
        </div>
      `,
    )
    .join('');

  return `
    <div class="space-y-2">
      <p class="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-700">Kecamatan.geojson</p>
      <h3 class="text-base font-extrabold text-carbon-950">Atribut Kecamatan</h3>
      <div class="mt-3 max-h-72 overflow-y-auto">${rows || '<p class="text-sm text-carbon-500">Tidak ada atribut yang dapat ditampilkan.</p>'}</div>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
