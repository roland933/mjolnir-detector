"use client";

import { Crosshair, Navigation, Radar, ScanLine } from "lucide-react";
import { useState } from "react";


type ScanStatus = "idle" | "scanning" | "detected" | "analyzing" | "result";;

type DetectionResult = {
  object: string;
  confidence: number;
  distance: number;
  isMjolnir: boolean;
};

export function DetectorMap() {

const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");


const [result, setResult] =
  useState<DetectionResult | null>(null);

const generateDetection = (): DetectionResult => {
  const isMjolnir = Math.random() > 0.7;

  if (isMjolnir) {
    return {
      object: "MJÖLNIR",
      confidence: 99.7,
      distance: 12.4,
      isMjolnir: true,
    };
  }

  const falsePositives = [
    "Frying Pan",
    "Heavy Wrench",
    "Metal Pipe",
    "Garden Shovel",
    "Suspicious Rock",
  ];

  const object =
    falsePositives[
      Math.floor(Math.random() * falsePositives.length)
    ];

  return {
    object,
    confidence: Math.floor(Math.random() * 30) + 50,
    distance: Number(
      (Math.random() * 20 + 2).toFixed(1)
    ),
    isMjolnir: false,
  };
};  

const handleScan = () => {
  if (scanStatus !== "idle") {
    return;
  }

  setResult(null);
  setScanStatus("scanning");

  setTimeout(() => {
    setScanStatus("analyzing");
  }, 1500);

  setTimeout(() => {
    const detection = generateDetection();

    setResult(detection);
    setScanStatus("result");
  }, 3000);
};


  return (
    <section className="relative min-h-[600px] overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-4 backdrop-blur">
        <div>
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-emerald-400" />

            <h2 className="text-sm font-semibold">
              MJÖLNIR DETECTOR
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Live detection map
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Navigation className="h-3.5 w-3.5" />
          <span>47.4979° N, 19.0402° E</span>
        </div>
      </div>

      {/* Radar */}
      <div className="absolute inset-0 flex items-center justify-center pt-16">
        <div className="relative h-[420px] w-[420px]">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-slate-700/60" />
          <div className="absolute inset-[60px] rounded-full border border-slate-700/60" />
          <div className="absolute inset-[120px] rounded-full border border-slate-700/60" />
          <div className="absolute inset-[180px] rounded-full border border-slate-700/60" />

          {/* Crosshair */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-800" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-800" />

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-400/10">
              <Crosshair className="h-5 w-5 text-emerald-400" />
            </div>
          </div>

          {/* Detection */}
        {scanStatus === "detected" && (
                <div className="absolute right-[22%] top-[28%]">
                    <div className="relative">
                    <span className="absolute -inset-3 animate-ping rounded-full bg-red-400/20" />

                    <div className="relative h-3 w-3 rounded-full bg-red-400 shadow-[0_0_15px_rgba(248,113,113,0.8)]" />
                    </div>
                </div>
                )}

          {/* Scan line */}
          <div className="absolute left-1/2 top-1/2 h-[200px] w-px origin-bottom -translate-x-1/2 -translate-y-full rotate-[35deg] bg-gradient-to-t from-emerald-400/70 to-transparent" />
        </div>
      </div>

      {scanStatus === "result" && result && (
  <div className="absolute left-1/2 top-24 z-20 w-[280px] -translate-x-1/2">
    <div
      className={`rounded-xl border p-4 backdrop-blur ${
        result.isMjolnir
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-slate-700 bg-slate-900/95"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Detection Result
        </span>

        <span
          className={
            result.isMjolnir
              ? "text-amber-400"
              : "text-slate-500"
          }
        >
          {result.isMjolnir ? "MATCH" : "FALSE POSITIVE"}
        </span>
      </div>

      <h3 className="mt-3 text-xl font-bold">
        {result.object}
      </h3>

      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-slate-500">
            Confidence
          </p>

          <p className="font-semibold">
            {result.confidence}%
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Distance
          </p>

          <p className="font-semibold">
            {result.distance} km
          </p>
        </div>
      </div>

      {!result.isMjolnir && (
        <p className="mt-4 text-xs text-slate-500">
          The detector remains unconvinced.
        </p>
      )}

      {result.isMjolnir && (
        <p className="mt-4 text-sm font-medium text-amber-400">
          ⚡ Asgardian energy signature confirmed.
        </p>
      )}
    </div>
  </div>
)}

      {/* Bottom information */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-slate-800 bg-slate-950/90 px-5 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Detection radius
            </p>

            <p className="mt-1 text-lg font-semibold">
              25.0 km
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Signal strength
            </p>

            <p className="mt-1 text-lg font-semibold text-emerald-400">
              72%
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Status
            </p>

          <p className="mt-1 flex items-center gap-2 text-sm font-medium">
  <span
    className={`h-2 w-2 rounded-full ${
      scanStatus === "scanning"
        ? "animate-pulse bg-emerald-400"
        : scanStatus === "detected"
          ? "bg-red-400"
          : "bg-amber-400"
    }`}
  />

  {scanStatus === "idle" && "Monitoring"}

  {scanStatus === "scanning" && "Scanning"}

  {scanStatus === "detected" && "Detection found"}
</p>
          </div>

         <button
                    onClick={handleScan}
                    disabled={scanStatus !== "idle"}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:border-slate-500 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                    <ScanLine className="h-4 w-4" />

                   {scanStatus === "scanning" && "Scanning..."}
                    {scanStatus === "analyzing" && "Analyzing..."}
                    {scanStatus === "result" && "Scan Complete"}
                    {scanStatus === "idle" && "Scan Area"}
                    </button>
        </div>
      </div>
    </section>
  );
}