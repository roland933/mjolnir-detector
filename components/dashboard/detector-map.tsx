
"use client";


import { ScanAreaType } from "@/app/types/scan.area";
import { MapOverlay } from "./map/map-overlay";
import { useDetectorContext } from "@/app/context/detector-context";

import dynamic from "next/dynamic";
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
  const update = (latitude: number, longitude: number) => {
    setScanArea((current) => ({
      ...current,
      latitude,
      longitude,
    }));
  };

  return (
    <section className="relative h-[600px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="absolute inset-0 z-0">
        <RealMap onLocationSelect={update}
                   detection={result}  
                 latitude={scanArea.latitude}
                 longitude={scanArea.longitude}
                 radius={scanArea.radius}/>
      </div>
      <MapOverlay
        scanStatus={scanStatus}
        scan={() => scan(scanArea)}
        result={result}
        scanArea={scanArea}

      />

    </section>
  );
}