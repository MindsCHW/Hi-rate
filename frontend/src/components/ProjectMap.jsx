import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Function to get color-coded marker icon based on rating
const getMarkerIcon = (rating) => {
  let color = 'blue';
  if (rating === 1) color = 'red';
  else if (rating === 5) color = 'orange';
  else if (rating === 10) color = 'green';

  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// A sub-component to update map center dynamically when project changes
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
};

const ProjectMap = ({ project, coordinates }) => {
  if (!coordinates) return null;
  
  const center = [coordinates.lat, coordinates.lng];
  
  // Simulate some chainage markers for the road in the project with ratings
  const simulatedChainages = [
    { id: 1, lat: coordinates.lat + 0.005, lng: coordinates.lng + 0.005, title: 'Chainage 110.5', rating: 1 },
    { id: 2, lat: coordinates.lat - 0.008, lng: coordinates.lng - 0.002, title: 'Chainage 115.2', rating: 5 },
    { id: 3, lat: coordinates.lat + 0.012, lng: coordinates.lng - 0.010, title: 'Chainage 120.0', rating: 10 },
    { id: 4, lat: coordinates.lat - 0.005, lng: coordinates.lng + 0.015, title: 'Chainage 125.4', rating: 1 },
  ];

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-borderColor shadow-sm relative z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={center} />
        
        {/* Main Project Marker */}
        <Marker position={center}>
          <Popup>
            <div className="text-center">
              <strong>{project}</strong><br />
              Project HQ
            </div>
          </Popup>
        </Marker>

        {/* Chainage Rating Markers */}
        {simulatedChainages.map(point => (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={getMarkerIcon(point.rating)}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-gray-800 text-sm border-b pb-1 mb-1">{point.title}</h3>
                <p className={`text-xs font-medium ${point.rating === 1 ? 'text-red-600' : point.rating === 5 ? 'text-orange-600' : 'text-green-600'}`}>Rating: {point.rating}</p>
                <button className="mt-2 text-xs bg-primary text-white px-2 py-1 rounded w-full hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ProjectMap;
