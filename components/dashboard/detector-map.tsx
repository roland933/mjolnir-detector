
"use client";


import { ScanAreaType } from "@/app/types/scan.area";
import { MapOverlay } from "./map/map-overlay";
import { useDetectorContext } from "@/app/context/detector-context";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { VikingLocation } from "./map/real-map";

const RealMap = dynamic(
  () => import("./map/real-map").then((mod) => mod.RealMap),
  {
    ssr: false,
  }
);
type Props = {
  scanArea: ScanAreaType,
  setScanArea: React.Dispatch<React.SetStateAction<ScanAreaType>>;


}




export function DetectorMap({ scanArea, setScanArea }: Props) {

  const { scanStatus, scan, result } = useDetectorContext();
  const [radarHeading, setRadarHeading] = useState(0);
  const [nearestVikingDistance, setNearestVikingDistance] = useState(Infinity);
  const [nearbyLocation, setNearbyLocation] =
    useState<VikingLocation | null>(null);

  const update = (latitude: number, longitude: number) => {
    setScanArea((current) => ({
      ...current,
      latitude,
      longitude,
    }));
  };

  const signalStrength =
    nearestVikingDistance < 30000
      ? "strong"
      : nearestVikingDistance < 100000
        ? "weak"
        : "none";

  return (
    <section className="relative h-min-[600px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="absolute inset-0 z-0">
        <RealMap onLocationSelect={update}
          detection={result}
          onMapMove={setRadarHeading}
          onSignalChange={setNearestVikingDistance}
          latitude={scanArea.latitude}
          nearbyLocation={nearbyLocation}
          signalStrength={signalStrength}
          onNearbyLocationChange={setNearbyLocation}
          longitude={scanArea.longitude}
          scanStatus={scanStatus}
        />
      </div>
      <MapOverlay
        scanStatus={scanStatus}
        signalStrength={signalStrength}
        radarHeading={radarHeading}
        scan={() => {
          if (!nearbyLocation) return;

          scan(scanArea, nearbyLocation);
        }}
        result={result}
        scanArea={scanArea}

      />

    </section>
  );
}