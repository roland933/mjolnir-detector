
"use client";

import { useState } from "react";

import { ScanAreaType } from "@/app/types/scan.area";

import { MapOverlay } from "./map/map-overlay";
import { RealMap } from "./map/real-map";
import { ScanStatus } from "@/app/types/scan.status";
import { DetectionResult } from "@/app/types/detector.result";

type Props = {
   scanStatus: ScanStatus;
   scan: (scanArea: ScanAreaType) => void;
   result: DetectionResult | null; 

}

export function DetectorMap({scanStatus,scan,result}:Props) {
  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 47.4979,
    longitude: 19.0402,
    radius: 25,
  });



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