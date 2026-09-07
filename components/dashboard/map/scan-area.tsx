"use client";

import { MapPin, Radius, Scan, Search } from "lucide-react";
import { ScanAreaType } from "@/app/types/scan.area";
import { useState } from "react";
import { ScanStatus } from "@/app/types/scan.status";

type Props = {
  scanArea: ScanAreaType;
  scanStatus:ScanStatus
  onRadiusChange: (radius: number) => void;
  onScan: () => void;
};

export function ScanArea({
  scanArea,
  onRadiusChange,
  onScan,
  scanStatus
}: Props) {
const [location, setLocation] = useState("");

  return (
  <section className="relative mb-4 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/80 px-5 py-4">
     <div
    className="
      pointer-events-none
      absolute inset-0
      bg-[url('/scan-area-texture.png')]
      bg-cover
      bg-center
      opacity-[0.12]
    "
  />

      <div className="relative z-10  flex flex-wrap items-center gap-6">
        {/* Title */}
        <div className="flex items-center gap-2">
          <img src="/icons/location.png" />

          <div>
            <h3 className="text-sm font-semibold">
              Scan Area
            </h3>

            <p className="text-xs text-slate-500">
              Configure detection range
            </p>
          </div>
        </div>

        {/* Coordinates */}
        <div className="flex items-center gap-6 border-l border-slate-800 pl-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Latitude
            </p>

            <p className="mt-1 text-sm font-medium">
              {scanArea.latitude.toFixed(4)}°
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Longitude
            </p>

            <p className="mt-1 text-sm font-medium">
              {scanArea.longitude.toFixed(4)}°
            </p>
          </div>
        </div>

        <div className="min-w-[260px] flex-1">
  <div className="flex items-center gap-1">
      <img src="/icons/search.png" className="h-6 w-6 object-contain"/>
   

    <span className="text-[10px] uppercase tracking-wider text-slate-500">
      Location
    </span>
  </div>

  <input
    type="text"
    value={location}
    onChange={(event) => setLocation(event.target.value)}
    placeholder="Search location..."
    className="mt-1 w-full border-b border-slate-700 bg-transparent py-1 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-400"
  />
</div>

        {/* Radius */}
        <div className="min-w-[280px] flex-1 border-l border-slate-800 pl-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
             <img src="/icons/radius.png" className="h-6 w-6 object-contain"/>

              <span className="text-xs uppercase tracking-wider text-slate-500">
                Detection Radius
              </span>
            </div>

            <span className="text-sm font-semibold text-sky-400">
              {scanArea.radius} km
            </span>
          </div>

          <input
            type="range"
            min="5"
            max="50"
            value={scanArea.radius}
            onChange={(event) =>
              onRadiusChange(Number(event.target.value))
            }
            className="mt-2 w-full accent-sky-400"
          />
        </div>

        {/* Start Scan */}
      <button
              style={{ fontFamily: "var(--font-norse)" }}
          onClick={onScan}
          disabled={scanStatus === "scanning" || scanStatus === "analyzing"}
          className="flex  items-center gap-2 rounded-lg border border-sky-500/40 hover:cursor-pointer bg-sky-500/10 px-4 py-3 text-md font-semibold uppercase tracking-wider text-sky-400 transition hover:border-sky-400 hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src="/icons/start_scan.png" className="h-7 w-7 object-contain"/>
          {scanStatus === "scanning"
            ? "Scanning..."
            : scanStatus === "analyzing"
              ? "Analyzing..."
              : "Start Scan"}
        </button>
      </div>
    </section>
  );
}