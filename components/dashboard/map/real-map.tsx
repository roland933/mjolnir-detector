"use client";
import { DetectionResult } from "@/app/types/detector.result";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Circle,
  Marker,
} from "react-leaflet";

import L from "leaflet";

export type VikingLocation = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type Props = {
  latitude: number;
  longitude: number;
  radius: number;
  detection: DetectionResult | null;
  onMapMove: (heading: number) => void;
  onLocationSelect: (latitude: number, longitude: number) => void;
  onSignalChange: (distance: number) => void;
  onNearbyLocationChange: (location: VikingLocation | null) => void;
  nearbyLocation: VikingLocation | null;
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
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return;
    }

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

const VIKING_LOCATIONS: VikingLocation[] = [
  {
    name: "Birka",
    country: "Sweden",
    latitude: 59.3361,
    longitude: 17.5453,
  },
  {
    name: "Kaupang",
    country: "Norway",
    latitude: 59.0353,
    longitude: 10.1065,
  },
  {
    name: "Hedeby",
    country: "Denmark",
    latitude: 54.4911,
    longitude: 9.5653,
  },
  {
    name: "Ribe",
    country: "Denmark",
    latitude: 55.3297,
    longitude: 8.7649,
  },
  {
    name: "Jelling",
    country: "Denmark",
    latitude: 55.7566,
    longitude: 9.4196,
  },
  {
    name: "Uppsala",
    country: "Sweden",
    latitude: 59.8586,
    longitude: 17.6389,
  },
  {
    name: "Trondheim",
    country: "Norway",
    latitude: 63.4305,
    longitude: 10.3951,
  },
  {
    name: "Borg",
    country: "Norway",
    latitude: 68.2333,
    longitude: 13.6167,
  },
];

const vikingIcon = L.divIcon({
  className: "",
  html: `
    <div class="viking-marker nearby">
      ᛟ
    </div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});



function RadarMovementController({
  onHeadingChange,
  onSignalChange,
  onNearbyLocationChange,
}: {
  onHeadingChange: (heading: number) => void;
  onSignalChange: (distance: number) => void;
  onNearbyLocationChange: (location: VikingLocation | null) => void;
}) {
  const map = useMap();
  const previousCenter = useRef<L.LatLng | null>(null);

  const updateSignal = () => {
    const center = map.getCenter();

    let nearestLocation = null;
    let nearestDistance = Infinity;

    VIKING_LOCATIONS.forEach((location) => {
      const distance = center.distanceTo(
        L.latLng(location.latitude, location.longitude)
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestLocation = location;
      }
    });

    onSignalChange(nearestDistance);

    if (nearestDistance < 40000) {
      onNearbyLocationChange(nearestLocation);
    } else {
      onNearbyLocationChange(null);
    }
  };

  useEffect(() => {
    updateSignal();
  }, []);

  useMapEvents({
    move() {
      const currentCenter = map.getCenter();

      if (!previousCenter.current) {
        previousCenter.current = currentCenter;
        return;
      }

      const previous = previousCenter.current;

      const dx = currentCenter.lng - previous.lng;
      const dy = currentCenter.lat - previous.lat;

      if (
        Math.abs(dx) < 0.00001 &&
        Math.abs(dy) < 0.00001
      ) {
        return;
      }

      const angle =
        (Math.atan2(dx, dy) * 180) / Math.PI;

      onHeadingChange(angle);

      previousCenter.current = currentCenter;

      updateSignal();
    },

    moveend() {
      previousCenter.current = null;

      updateSignal();
    },
  });

  return null;
}

export function RealMap({
  onLocationSelect,
  radius,
  latitude,
  longitude,
  detection,
  onMapMove,
  onSignalChange,
  onNearbyLocationChange,
  nearbyLocation

}: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">

      <MapContainer
        center={[64.5, 13.5]}
        zoom={5}
        maxBounds={[
          [45, -70],
          [80, 40],
        ]}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

        {nearbyLocation && (
          <Marker
            key={nearbyLocation.name}
            position={[
              nearbyLocation.latitude,
              nearbyLocation.longitude,
            ]}
            icon={vikingIcon}
          />
        )}

        <MapController
          latitude={latitude}
          longitude={longitude}
        />

        <RadarMovementController
          onHeadingChange={onMapMove}
          onSignalChange={onSignalChange}
          onNearbyLocationChange={onNearbyLocationChange}
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

        <MapCenterHandler
          onLocationSelect={onLocationSelect}
        />
      </MapContainer>

      {/* Nordic texture */}
      <div
        className="
    pointer-events-none
    absolute inset-0
    z-[500]
    opacity-20
  "
        style={{
          backgroundImage: "url('/maps/texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark vignette */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          z-[501]
        "
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />

    </div>
  );
}