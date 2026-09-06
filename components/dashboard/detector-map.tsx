
"use client";

import { useState } from "react";

import { ScanAreaType } from "@/app/types/scan.area";

import { MapOverlay } from "./map/map-overlay";
import { useDetectorContext } from "@/app/context/detector-context";




export function DetectorMap() {
  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 47.4979,
    longitude: 19.0402,
    radius: 25,
  });

 const { scanStatus, scan, result } = useDetectorContext();

  return (
    <section className="relative h-[600px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">


      <MapOverlay
        scanStatus={scanStatus}
        scan={() => scan(scanArea)}
        result={result}
        scanArea={scanArea}
        setScanArea={setScanArea}
      />

    </section>
  );
}