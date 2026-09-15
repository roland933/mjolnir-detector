import { ScanStatus } from "@/app/types/scan.status";
import { Crosshair, ScanSearch } from "lucide-react";
import { RadarGraphic } from "./radar/radar-graphic";
import { VikingLocation } from "./realMap/real-map";
import {  ScanStatusMarker } from "./radar/scan-status-marker";
import { Sweep } from "./radar/sweep";

type RadarProps = {
  heading: number;
  signalStrength: "none" | "weak" | "strong";
  onScan: () => void;
  scanStatus: ScanStatus;
  mjolnirDetected: boolean;
  nearbyLocation: VikingLocation | null,
  discoveredLocations: Set<string>
  signalLocation: VikingLocation | null,
};

export function Radar({ heading, signalStrength, onScan, scanStatus, mjolnirDetected,nearbyLocation,discoveredLocations,signalLocation }: RadarProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[320px] w-[320px]">

      <div className="absolute inset-0 text-slate-400/20 z-0">
            <RadarGraphic />
          </div>


        {scanStatus === "idle" && signalLocation &&
  !discoveredLocations.has(signalLocation.name) && (
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-10
        h-[70px]
        w-[70px]
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      <div className="absolute inset-0 rounded-full border-2 border-sky-300/60 animate-proximity-wave" />

      <div className="absolute inset-0 rounded-full border border-sky-200/35 animate-proximity-wave-delayed" />
    </div>
  )}


  <ScanStatusMarker  scanStatus={scanStatus}/>



        {/* Center */}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        
            <button
              type="button"
              onClick={onScan}
              disabled={signalStrength !== "strong"}
              className={`
        pointer-events-auto
        flex h-11 w-11 items-center justify-center
        rounded-full border-2
        transition-all duration-300

        ${signalStrength === "none"
                  ? `
              cursor-default
              border-sky-400/80
              bg-sky-400/15
              shadow-[0_0_18px_rgba(56,189,248,0.25)]
            `
                  : signalStrength === "weak"
                    ? `
              cursor-default
              animate-pulse
              border-sky-300
              bg-sky-400/30
              shadow-[0_0_28px_rgba(56,189,248,0.5)]
            `
                    : `
              cursor-pointer
              animate-pulse
              border-sky-200
              bg-sky-400/50
              shadow-[0_0_45px_rgba(56,189,248,0.85)]
            `
                }
      `}
            >
              {signalStrength === "strong" ? (
                <ScanSearch className="h-5 w-5 text-sky-100" />
              ) : (
                <Crosshair className="h-5 w-5 text-sky-300" />
              )}
            </button>
          
        </div>

       <Sweep heading={heading} />

      </div>
    </div>
  );
}