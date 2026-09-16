"use client";
import { DetectionResult } from "@/app/types/detector.result";
import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import { ScanStatus } from "@/app/types/scan.status";
import { ZoomControl } from "react-leaflet";
import { VIKING_LOCATIONS } from "@/app/data/viking.locations";
import { DarkVignette } from "./dark-vignette";
import { VikingLocationMarker } from "./viking-locations-marker";

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
  signalLocation: VikingLocation | null;
  onSignalLocationChange: (location: VikingLocation | null) => void;

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

function RadarMovementController({
  onHeadingChange,
  onSignalChange,
  onNearbyLocationChange,
 onSignalLocationChange
}: {
  onHeadingChange: (heading: number) => void;
  onSignalChange: (distance: number) => void;
  onNearbyLocationChange: (location: VikingLocation | null) => void;
  onSignalLocationChange: (
  location: VikingLocation | null
) => void;
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

    if (nearestDistance < 200000 && nearestLocation) {
          onNearbyLocationChange(nearestLocation);
        } else {
          onNearbyLocationChange(null);
        }

        if (nearestDistance < 300000 && nearestLocation) {
          onSignalLocationChange(nearestLocation);
        } else {
          onSignalLocationChange(null);
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
  onSignalLocationChange,
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


        <VikingLocationMarker discoveredLocations={discoveredLocations} 
                              signalStrength={signalStrength} 
                              nearbyLocation={nearbyLocation}
                              scanStatus={scanStatus}
                              
                              />


        <MapController
          latitude={latitude}
          longitude={longitude}
        />

        <RadarMovementController
          onHeadingChange={onMapMove}
          onSignalChange={onSignalChange}
          onNearbyLocationChange={onNearbyLocationChange}
          onLocationDiscovered={onLocationDiscovered}
          onSignalLocationChange={onSignalLocationChange}
        />


        <MapCenterHandler
          onLocationSelect={onLocationSelect}
        />


      </MapContainer>

    
      <DarkVignette />

   
    </div>
  );
}