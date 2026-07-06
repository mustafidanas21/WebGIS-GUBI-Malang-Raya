import { GeoJSON, MapContainer, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { simulationCenter } from '../../data/learningActivityData.js';
import { getGubiCategory } from '../../data/gubiAnalysisData.js';

export default function SimulationMap({ geoJson, simulation }) {
  return (
    <div className="h-full w-full min-h-0 overflow-hidden rounded-lg border border-carbon-200 bg-carbon-900 shadow-soft">
      <MapContainer center={simulationCenter} zoom={11} scrollWheelZoom={false} className="h-full w-full" zoomControl={false}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {geoJson ? (
          <GeoJSON
            key={`${simulation.status.label}-${simulation.change}`}
            data={geoJson}
            style={(feature) => simulationFeatureStyle(feature, simulation.change)}
            onEachFeature={(feature, leafletLayer) => {
              const name = feature.properties.name ?? feature.properties['KEP_MAL.WADMKC'] ?? '-';
              const baseGubi = Number(feature?.properties?.gubi ?? 0);
              const simulatedGubi = baseGubi + simulation.change;
              const category = getGubiCategory(simulatedGubi);
              
              leafletLayer.bindTooltip(
                `<strong>Kecamatan ${name}</strong><br/>
                 GUBI Awal: ${baseGubi.toFixed(2)}<br/>
                 GUBI Simulasi: ${simulatedGubi.toFixed(2)} (${category.shortLabel})`,
                { sticky: true }
              );
            }}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}

function simulationFeatureStyle(feature, change) {
  const baseGubi = Number(feature?.properties?.gubi ?? 0);
  const category = getGubiCategory(baseGubi + change);

  return {
    color: category.color,
    fillColor: category.color,
    fillOpacity: 0.58,
    opacity: 1,
    weight: 2,
  };
}
