// src/components/MapComponent.tsx
import React from 'react';
import { GoogleMap, useLoadScript, Marker, Library } from '@react-google-maps/api';

const libraries: Library[] = ['places']; // List of libraries you want to use

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.0461, // Latitude for Israel
  lng: 34.8516, // Longitude for Israel
};

export const MapPage: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Your API key
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={8}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
