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
import { ScanStatus } from "@/app/types/scan.status";
import { ZoomControl } from "react-leaflet";
import { MapBoundaryFog } from "./MapBoundaryFog";
import { NordicTexture } from "./nordic-texture";

export type VikingLocation = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  isMjolnir: boolean;
  image?: string;
  falsePositive?: string;
};

type Props = {
  latitude: number;
  longitude: number;
  detection: DetectionResult | null;
  onMapMove: (heading: number) => void;
  onLocationSelect: (latitude: number, longitude: number) => void;
  onSignalChange: (distance: number) => void;
  onNearbyLocationChange: (location: VikingLocation | null) => void;
  onLocationDiscovered: (location: VikingLocation) => void
  discoveredLocations: Set<string>;
  nearbyLocation: VikingLocation | null;
  signalStrength: "none" | "weak" | "strong";
  scanStatus: ScanStatus;

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
  name: "Þingvellir",
  country: "Iceland",
  latitude: 64.2559,
  longitude: -21.129,
  isMjolnir: true,
},
  {
    name: "Birka",
    country: "Sweden",
    latitude: 59.3361,
    longitude: 17.5453,
    isMjolnir: false,
    falsePositive: "Heavy Wrench",
    image: "/images/detections/heavy-wrench.png",
  },
  {
    name: "Kaupang",
    country: "Norway",
    latitude: 59.0353,
    longitude: 10.1065,
    isMjolnir: false,
    falsePositive: "Suspicious Rock",
    image: "/images/detections/heavy-wrench.png",
  },
  {
    name: "Hedeby",
    country: "Denmark",
    latitude: 54.4911,
    longitude: 9.5653,
    isMjolnir: false,
    falsePositive: "Metal Pipe",
    image: "/images/detections/heavy-wrench.png",
  },
  {
    name: "Ribe",
    country: "Denmark",
    latitude: 55.3297,
    longitude: 8.7649,
    isMjolnir: false,
    falsePositive: "Garden Shovel",
    image: "/images/detections/heavy-wrench.png",
  },
  {
    name: "Jelling",
    country: "Denmark",
    latitude: 55.7566,
    longitude: 9.4196,
    isMjolnir: false,
    falsePositive: "Frying Pan",
    image: "/images/detections/heavy-wrench.png",
  },
  {
    name: "Uppsala",
    country: "Sweden",
    latitude: 59.8586,
    longitude: 17.6389,
    isMjolnir: false,
    falsePositive: "Metal Pipe",
    image: "/images/detections/heavy-wrench.png",
  },
 
  {
    name: "Borg",
    country: "Norway",
    latitude: 68.2333,
    longitude: 13.6167,
    isMjolnir: false,
    falsePositive: "Suspicious Rock",
    image: "/images/detections/heavy-wrench.png",
  },
];

const vikingIcon = L.divIcon({
  className: "",
  html: `
    <div class="viking-marker">
      ᛟ
    </div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

const nearbyVikingIcon = L.divIcon({
  className: "",
  html: `
    <div class="viking-marker nearby">
      ᛟ
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const strongVikingIcon = L.divIcon({
  className: "",
  html: `
    <div class="viking-marker strong">
      ᛟ
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const discoveredVikingIcon = L.divIcon({
  className: "",
  html: `
    <div class="viking-marker discovered">
      ᛟ
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});



function RadarMovementController({
  onHeadingChange,
  onSignalChange,
  onNearbyLocationChange,
  onLocationDiscovered,
}: {
  onHeadingChange: (heading: number) => void;
  onSignalChange: (distance: number) => void;
  onNearbyLocationChange: (location: VikingLocation | null) => void;
  onLocationDiscovered: (location: VikingLocation) => void
}) {
  const map = useMap();
  const previousCenter = useRef<L.LatLng | null>(null);

  const updateSignal = () => {
    const center = map.getCenter();

    let nearestLocation: VikingLocation | null = null;
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

    if (nearestDistance < 100000) {
     onLocationDiscovered(nearestLocation);
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

function MapInteractionController({
  scanStatus,
}: {
  scanStatus: ScanStatus;
}) {
  const map = useMap();

  useEffect(() => {
    const locked =
      scanStatus === "scanning" ||
      scanStatus === "analyzing";

    if (locked) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      map.touchZoom.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.touchZoom.enable();
    }

    return () => {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.touchZoom.enable();
    };
  }, [scanStatus, map]);

  return null;
}

export function RealMap({
  onLocationSelect,
  latitude,
  longitude,
  detection,
  onMapMove,
  onSignalChange,
  onNearbyLocationChange,
  onLocationDiscovered,
  discoveredLocations,
  nearbyLocation,
  signalStrength,
  scanStatus

}: Props) {
  return (
    <div className="relative h-full w-full ">

      <MapContainer
        center={[64.5, 13.5]}
        zoom={5}
        minZoom={5}

        zoomControl={false}
      maxBounds={[
        [25, -120],
        [88, 100],
      ]}

        maxBoundsViscosity={1.0}
        className="h-full w-full"
      >
        <ZoomControl position="bottomright" />

        <MapInteractionController scanStatus={scanStatus} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />

           {/* Map boundary fog */}
        <MapBoundaryFog />

        {VIKING_LOCATIONS
        .filter((location) => discoveredLocations.has(location.name))
        .map((location) => (
          <Marker
            key={`discovered-${location.name}`}
            position={[location.latitude, location.longitude]}
            icon={discoveredVikingIcon}
          />
        ))}


        {nearbyLocation &&
  signalStrength !== "none" &&
  !discoveredLocations.has(nearbyLocation.name) && (
    <>
      <Marker
        key={nearbyLocation.name}
        position={[
          nearbyLocation.latitude,
          nearbyLocation.longitude,
        ]}
        icon={vikingIcon}
      />

      {scanStatus === "analyzing" && (
        <Circle
          center={[
            nearbyLocation.latitude,
            nearbyLocation.longitude,
          ]}
          radius={12000}
          pathOptions={{
            color: "#38bdf8",
            weight: 2,
            opacity: 0.7,
            fillColor: "#38bdf8",
            fillOpacity: 0.08,
            className: "analyzing-marker",
          }}
        />
      )}
    </>
)}

        <MapController
          latitude={latitude}
          longitude={longitude}
        />

        <RadarMovementController
          onHeadingChange={onMapMove}
          onSignalChange={onSignalChange}
          onNearbyLocationChange={onNearbyLocationChange}
          onLocationDiscovered={onLocationDiscovered}
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

     
     <NordicTexture />

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