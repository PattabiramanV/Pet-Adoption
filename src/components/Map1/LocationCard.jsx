import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import location from "../../assets/trytofind.png"; // Ensure this path is correct
import location_save from "../../assets/save.png"; // Ensure this path is correct

// Define custom marker icons
const defaultIcon = new L.Icon({
    iconUrl: location, // Default marker icon URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const lowestDistanceIcon = new L.Icon({
    iconUrl: location_save, // Red marker icon URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

function LocationCard({ location, isLowestDistance }) {
    return (
        <div className="map-card">
            <div className="map-card-header">
                <h2>{location.name}</h2>
                <p>Address: {location.address}</p>
                {location.distance && <p>Distance: {location.distance.toFixed(2)} km</p>}
            </div>
            <div className="map-card-body">
                <MapContainer 
                    center={[location.latitude, location.longitude]} 
                    zoom={15} 
                    style={{ height: '200px', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker 
                        position={[location.latitude, location.longitude]}
                        icon={isLowestDistance ? lowestDistanceIcon : defaultIcon}
                    >
                        <Popup>
                            <strong>{location.name}</strong><br />
                            <strong>Address:</strong>{location.address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default LocationCard;
