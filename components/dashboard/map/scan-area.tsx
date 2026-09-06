"use client";

import { useState } from "react";
import { MapPin, Radius } from "lucide-react";
import { ScanAreaType } from "@/app/types/scan.area";

type Props = {
   scanArea: ScanAreaType;
  onRadiusChange:(n:number) => void
}


export function ScanArea({scanArea,onRadiusChange}:Props) {
const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="absolute left-5 top-20 z-20 w-64 rounded-xl border border-slate-800 bg-slate-950/90 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Radius className="h-4 w-4 text-emerald-400" />

        <h3 className="text-sm font-semibold">
          Scan Area
        </h3>
      </div>

      <p className="mt-1 text-xs text-slate-500">
        Configure detection range
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-slate-500">
            Detection Radius
          </span>

          <span className="text-sm font-semibold text-emerald-400">
            {scanArea.radius} km
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="50"
          value={scanArea.radius}
          onChange={(event) => {
  onRadiusChange(Number(event.target.value));
  setConfirmed(false);
}}
          className="mt-3 w-full accent-emerald-400"
        />
      </div>

      <div className="mt-5 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <MapPin className="h-3.5 w-3.5" />

          <span>Center coordinates</span>
        </div>

       <p className="mt-2 text-sm font-medium">
          {scanArea.latitude.toFixed(4)}° N,{" "}
          {scanArea.longitude.toFixed(4)}° E
        </p>
      </div>

      <button  onClick={() => setConfirmed(true)} className="mt-4 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium uppercase tracking-wider transition hover:border-slate-500 hover:bg-slate-900">
        {confirmed ? "Area Confirmed" : "Confirm Area"}
      </button>
    </div>
  );
}