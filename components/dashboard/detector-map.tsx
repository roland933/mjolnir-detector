
"use client";


import { ScanAreaType } from "@/app/types/scan.area";
import { MapOverlay } from "./map/map-overlay";
import { useDetectorContext } from "@/app/context/detector-context";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { VikingLocation } from "./map/realMap/real-map";

const RealMap = dynamic(
  () => import("./map/realMap/real-map").then((mod) => mod.RealMap),
  {
    ssr: false,
  }
);
type Props = {
  scanArea: ScanAreaType,
  setScanArea: React.Dispatch<React.SetStateAction<ScanAreaType>>;
}


export function DetectorMap({ scanArea, setScanArea }: Props) {

  const { scanStatus, scan, result,setScanStatus } = useDetectorContext();
  const [radarHeading, setRadarHeading] = useState(0);
  const [nearestVikingDistance, setNearestVikingDistance] = useState(Infinity);
  const [nearbyLocation, setNearbyLocation] = useState<VikingLocation | null>(null);
  const [discoveredLocation, setDiscoveredLocations] = useState<Set<VikingLocation>>(new Set())
  const [signalLocation, setSignalLocation] =
    useState<VikingLocation | null>(null);

  const mjolnirSignal =
    nearbyLocation?.isMjolnir
      ? Math.max(
        0,
        Math.min(
          100,
          Math.round(100 - (nearestVikingDistance / 100000) * 100)
        )
      )
      : 0;
  const update = (latitude: number, longitude: number) => {
    setScanArea((current) => ({
      ...current,
      latitude,
      longitude,
    }));
  };

const signalStrength =
  nearestVikingDistance < 120000
    ? "strong"
    : nearestVikingDistance < 400000
      ? "weak"
      : "none";


  const handleLocationDiscovered = (location: VikingLocation) => {
    setDiscoveredLocations((current) => {
      const next = new Set(current);
      next.add(location.name);
      return next;
    });
  };



  return (
    <section className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <RealMap onLocationSelect={update}
          detection={result}
          onMapMove={setRadarHeading}
          onSignalChange={setNearestVikingDistance}
          latitude={scanArea.latitude}
          nearbyLocation={nearbyLocation}
          signalStrength={signalStrength}
          onNearbyLocationChange={setNearbyLocation}
          signalLocation={signalLocation}
          onSignalLocationChange={setSignalLocation}
          discoveredLocations={discoveredLocation}
          longitude={scanArea.longitude}
          scanStatus={scanStatus}
        />
      </div>
      <MapOverlay
        scanStatus={scanStatus}
        signalStrength={signalStrength}
        mjolnirSignal={mjolnirSignal}
        radarHeading={radarHeading}
        signalLocation={signalLocation}
        nearbyLocation={nearbyLocation}
        discoveredLocations={discoveredLocation}

        scan={() => {
          if ((!nearbyLocation) || (discoveredLocation.has(nearbyLocation.name))) return;

          scan(
            scanArea,
            nearbyLocation,
            nearestVikingDistance,
            () => {
              handleLocationDiscovered(nearbyLocation);
              setScanStatus('idle')
            }
          );
        }}
        result={result}
        scanArea={scanArea}

      />

    </section>
  );
}