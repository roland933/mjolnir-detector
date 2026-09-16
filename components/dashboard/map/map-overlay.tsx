import { Radar } from "./radar";
import { Result } from "./result";
import { ScanStatus } from "@/app/types/scan.status";
import { DetectionResult } from "@/app/types/detector.result";
import { ScanAreaType } from "@/app/types/scan.area";
import { useDetectorContext } from "@/app/context/detector-context";
import { useEffect } from "react";
import { VikingLocation } from "./realMap/real-map";
import { playSound } from "@/lib/audio/sounds";
type Props = {
  scanStatus: ScanStatus;
  scan: () => void;
  result: DetectionResult | null;
  scanArea: ScanAreaType;
  radarHeading: number;
  signalStrength: "none" | "weak" | "strong";
  mjolnirSignal: number;
 nearbyLocation: VikingLocation | null,
  discoveredLocations: Set<string>;
  signalLocation:  VikingLocation | null,
};

export function MapOverlay({
  scanStatus,
  result,
  radarHeading,
  signalStrength,
  nearbyLocation,
  discoveredLocations,
  signalLocation,
  scan,
}: Props) {
  const { showResult, setShowResult } = useDetectorContext();

  useEffect(() => {
    if (!result) {
      return;
    }

    const timeout = setTimeout(() => {
      setShowResult(false);
    }, 6000);

    return () => clearTimeout(timeout);
  }, [result]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "e") return;
       console.log(4444,scanStatus,signalStrength)
      if (
        signalStrength !== "strong" ||
        !nearbyLocation ||
        scanStatus !== "idle"
      ) {
        return;
      }
      playSound("scan",0.3)
      scan();
      
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    signalStrength,
    nearbyLocation,
    scanStatus,
    scan,
  ]);



  return (
    <div className="pointer-events-none absolute inset-0 z-[1000]">

      <Radar
        scanStatus={scanStatus}
        heading={radarHeading}
        nearbyLocation={nearbyLocation}
        signalStrength={signalStrength}
        discoveredLocations={discoveredLocations}
        signalLocation={signalLocation}
        onScan={scan}
        mjolnirDetected={
          scanStatus === "result" && result?.isMjolnir === true
        }

      />

      {showResult && <Result result={result} />}
    </div>
  );
}
