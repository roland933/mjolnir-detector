"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

type Props = {
  onLocationSelect: (latitude: number, longitude: number) => void;
};

function MapClickHandler({ onLocationSelect }: Props) {
  useMapEvents({
    click(event) {
      onLocationSelect(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

export function RealMap({ onLocationSelect }: Props) {
  return (
    <MapContainer
      center={[47.4979, 19.0402]}
      zoom={8}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}