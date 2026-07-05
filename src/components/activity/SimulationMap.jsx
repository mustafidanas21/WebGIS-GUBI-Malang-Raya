import { GeoJSON, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import { simulationCenter, simulationZoneGeoJson } from '../../data/learningActivityData.js';

export default function SimulationMap({ simulation }) {
  return (
    <div className="h-[280px] overflow-hidden rounded-lg border border-carbon-200 bg-carbon-900 shadow-soft lg:h-[300px]">
      <MapContainer center={simulationCenter} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={simulation.status.label}
          data={simulationZoneGeoJson}
          style={{
            color: simulation.status.color,
            fillColor: simulation.status.color,
            fillOpacity: 0.55,
            opacity: 1,
            weight: 4,
          }}
        >
          <Tooltip sticky>
            <span>Status GUBI: {simulation.status.label}</span>
          </Tooltip>
        </GeoJSON>
      </MapContainer>
    </div>
  );
}
