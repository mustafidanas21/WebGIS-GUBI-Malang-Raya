import { BarChart3, Database, Info, MapPinned, MousePointer2, Search } from 'lucide-react';
import { formatPropertyValue, getDisplayFields } from '../../services/VectorService.js';

export default function InfoPanel({
  selectedFeature,
  activeLayer,
  vectorStatus,
  rasterStatus,
  attributeFields,
  coordinates,
  searchQuery,
  onSearchQueryChange,
  searchResults,
  onSelectSearch,
}) {
  const properties = selectedFeature?.properties;
  const activeRasterStatus = activeLayer ? rasterStatus[activeLayer.id] : null;

  return (
    <aside className="flex h-full flex-col border-l border-carbon-200 bg-white">
      <div className="border-b border-carbon-200 p-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">
          <Info size={18} aria-hidden="true" />
          Informasi
        </div>
        <h2 className="mt-1 text-lg font-extrabold text-carbon-950">Inspektor Peta</h2>
        <p className="mt-1 text-xs leading-5 text-carbon-600">Cari kecamatan atau klik polygon.</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <SearchPanel
          value={searchQuery}
          results={searchResults}
          isLoading={vectorStatus.loading}
          onChange={onSearchQueryChange}
          onSelect={onSelectSearch}
        />

        <section className="mt-3 rounded-lg border border-carbon-200 bg-white p-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-carbon-900">
            <MousePointer2 size={17} aria-hidden="true" />
            Coordinate
          </div>
          <p className="mt-3 rounded-md bg-carbon-950 px-3 py-2 font-mono text-xs text-warning-200">
            {coordinates ? `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}` : 'Gerakkan kursor di atas peta'}
          </p>
        </section>

        <section className="mt-3 rounded-lg border border-carbon-200 bg-white p-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-carbon-900">
            <Database size={17} aria-hidden="true" />
            Status Data
          </div>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-carbon-600">
            <p>Vector: {vectorStatus.loading ? 'memuat Kecamatan.geojson...' : vectorStatus.error || 'Kecamatan.geojson siap'}</p>
            <p>Raster aktif: {activeRasterStatus?.loading ? 'memuat GeoTIFF...' : activeRasterStatus?.error || 'siap'}</p>
            <p>Field terbaca: {attributeFields.length}</p>
          </div>
        </section>

        <section className="mt-3 rounded-lg border border-carbon-200 bg-white p-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-carbon-900">
            <BarChart3 size={17} aria-hidden="true" />
            Layer Aktif
          </div>
          <p className="mt-3 text-lg font-extrabold text-carbon-950">{activeLayer?.fullName ?? activeLayer?.name}</p>
          <p className="mt-2 text-sm leading-6 text-carbon-600">{activeLayer?.description}</p>
        </section>

        <section className="mt-3 rounded-lg border border-carbon-200 bg-white p-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-carbon-900">
            <MapPinned size={17} aria-hidden="true" />
            Atribut Feature
          </div>
          {properties ? (
            <AttributeTable properties={properties} />
          ) : (
            <p className="mt-3 text-sm leading-6 text-carbon-600">
              Klik polygon kecamatan pada peta untuk melihat seluruh atribut asli dari GeoJSON.
            </p>
          )}
        </section>
      </div>
    </aside>
  );
}

function SearchPanel({ value, results, isLoading, onChange, onSelect }) {
  return (
    <section className="rounded-lg border border-carbon-200 bg-carbon-50 p-3">
      <label htmlFor="webgis-search" className="flex items-center gap-2 text-sm font-extrabold text-carbon-900">
        <Search size={17} aria-hidden="true" />
        Search
      </label>
      <input
        id="webgis-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cari kecamatan..."
        className="focus-ring mt-3 w-full rounded-md border border-carbon-200 bg-white px-3 py-2 text-sm text-carbon-900 outline-none"
      />
      <div className="mt-3 grid gap-2">
        {results.map((result) => (
          <button
            key={result.name}
            type="button"
            className="focus-ring rounded-md bg-white px-3 py-2 text-left text-sm font-semibold text-carbon-700 transition hover:bg-brand-50 hover:text-brand-800"
            onClick={() => onSelect(result)}
          >
            {result.name}
          </button>
        ))}
        {!isLoading && results.length === 0 ? (
          <p className="rounded-md bg-white px-3 py-2 text-sm text-carbon-500">Kecamatan tidak ditemukan.</p>
        ) : null}
      </div>
    </section>
  );
}

function AttributeTable({ properties }) {
  const fields = getDisplayFields(properties);

  if (!fields.length) {
    return <p className="mt-3 text-sm leading-6 text-carbon-600">Tidak ada atribut yang dapat ditampilkan.</p>;
  }

  return (
    <div className="mt-4 grid gap-2">
      {fields.map((field) => (
        <div key={field} className="rounded-md bg-carbon-50 px-3 py-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-carbon-500">{field}</p>
          <p className="mt-1 break-words text-sm font-bold text-carbon-900">{formatPropertyValue(properties[field])}</p>
        </div>
      ))}
    </div>
  );
}
