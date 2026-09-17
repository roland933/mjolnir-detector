import { ScanStatus } from "@/app/types/scan.status";
import { VikingLocation } from "./realMap/real-map";
import { ScanStatusMarker } from "./radar/scan-status-marker";

type RadarProps = {
  heading: number;
  signalStrength: "none" | "weak" | "strong";
  onScan: () => void;
  scanStatus: ScanStatus;
  mjolnirDetected: boolean;
  nearbyLocation: VikingLocation | null;
  discoveredLocations: Set<string>;
  signalLocation: VikingLocation | null;
};

export function Radar({
  heading,
  signalStrength,
  onScan,
  scanStatus,
  mjolnirDetected,
  nearbyLocation,
  discoveredLocations,
  signalLocation,
}: RadarProps) {
  const detectorEffect =
  signalStrength === "strong"
    ? "animate-detector-strong"
    : signalStrength === "weak"
      ? "animate-detector-weak"
      : "drop-shadow-[0_8px_6px_rgba(0,0,0,0.65)]";
  return (
    
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[230px] w-[230px]">

        <ScanStatusMarker scanStatus={scanStatus} />

        {/* Center detector */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <button
            type="button"
            onClick={onScan}
            disabled={signalStrength !== "strong"}
            className={`
              pointer-events-auto
              relative flex h-[110px] w-[110px]
              items-center justify-center
              transition-all duration-300

              ${
                signalStrength === "none"
                  ? `
                    opacity-70
                  `
                  : signalStrength === "weak"
                    ? `
                      drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]
                    `
                    : `
                      cursor-pointer
                      animate-pulse
                      drop-shadow-[0_0_22px_rgba(56,189,248,0.85)]
                    `
              }
            `}
          >
            <img
              src="/idle.png"
              alt="Mjölnir detector"
              className={`h-20 w-20 object-contain ${detectorEffect}`}
            />
          </button>
        </div>

      </div>
    </div>
  );
}