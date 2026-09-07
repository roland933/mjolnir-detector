"use client";

import { MapPin, Radius, Scan, Search } from "lucide-react";
import { ScanAreaType } from "@/app/types/scan.area";
import { useState } from "react";
import { ScanStatus } from "@/app/types/scan.status";
import { NorseSlider } from "../norse-slider";
import { Coordinates } from "../scan-area/coordinates";
import { Title } from "../scan-area/title";
import { Background } from "../scan-area/background";

type Props = {
  scanArea: ScanAreaType;
  scanStatus: ScanStatus;
  onRadiusChange: (radius: number) => void;
  onScan: () => void;
};

export function ScanArea({
  scanArea,
  onRadiusChange,
  onScan,
  scanStatus,
}: Props) {
  const [location, setLocation] = useState("");

  return (
    <section className="relative mb-3 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-4">
      <Background />

      <div className="relative z-10  flex flex-wrap items-center gap-6">
      
        <Title />

        <Coordinates scanArea={scanArea} />

        <div className="min-w-[260px] flex-1">
          <div className="flex items-center gap-1">
            <img src="/icons/search.png" className="h-6 w-6 object-contain" />

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
              <img src="/icons/radius.png" className="h-6 w-6 object-contain" />

              <span className="text-xs uppercase tracking-wider text-slate-500">
                Detection Radius
              </span>
            </div>

            <span className="text-sm font-semibold text-sky-400">
              {scanArea.radius} km
            </span>
          </div>

          <NorseSlider
            value={scanArea.radius}
            min={5}
            max={50}
            onChange={onRadiusChange}
          />
        </div>

        {/* Start Scan */}
        <button
          style={{ fontFamily: "var(--font-norse)" }}
          onClick={onScan}
          disabled={scanStatus === "scanning" || scanStatus === "analyzing"}
          className="flex w-42  items-center gap-2 rounded-lg border border-sky-500/40 hover:cursor-pointer bg-sky-500/10 px-4 py-3 text-md font-semibold uppercase tracking-wider text-sky-400 transition hover:border-sky-400 hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src="/icons/start_scan.png" className="h-7 w-7 object-contain" />
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
