"use client";
import { DetectionResult } from "@/app/types/detector.result";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap,Circle } from "react-leaflet";

type Props = {
  latitude: number;
  longitude: number;
  radius: number;
  detection: DetectionResult | null;
  onLocationSelect: (latitude: number, longitude: number) => void;
};

function MapController({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude]);
  }, [latitude, longitude, map]);

  return null;
}

function MapCenterHandler({ onLocationSelect }: Props) {
  const map = useMapEvents({
    moveend() {
      const center = map.getCenter();

      onLocationSelect(center.lat, center.lng);
    },
  });

  return null;
}

export function RealMap({ onLocationSelect, radius, latitude, longitude,detection }: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={8}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      <MapController
        latitude={latitude}
        longitude={longitude}
      />

      <Circle
        center={[latitude, longitude]}
        radius={radius * 1000}
      />

  {detection && (
      <Circle
        center={[detection.latitude, detection.longitude]}
        radius={1500}
       
        pathOptions={{
          color: detection.isMjolnir ? "#fbbf24" : "#ef4444",
          fillColor: detection.isMjolnir ? "#fbbf24" : "#ef4444",
          fillOpacity: 0.8,
        }}
      />
    )}




      <MapCenterHandler onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}