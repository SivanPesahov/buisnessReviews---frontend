// src/components/MapComponent.tsx
import React from 'react';
import { GoogleMap, useLoadScript, Marker, Library } from '@react-google-maps/api';

const libraries: Library[] = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 31.0461,
  lng: 34.8516,
};

export const MapPage: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
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
