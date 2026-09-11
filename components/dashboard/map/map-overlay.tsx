import { Radar } from "./radar";
import { Result } from "./result";
import { ScanStatus } from "@/app/types/scan.status";
import { DetectionResult } from "@/app/types/detector.result";
import { ScanAreaType } from "@/app/types/scan.area";
import { useDetectorContext } from "@/app/context/detector-context";
import { useEffect } from "react";

type Props = {
  scanStatus: ScanStatus;
  scan: () => void;
  result: DetectionResult | null;
  scanArea: ScanAreaType;
  radarHeading: number;
  signalStrength: "none" | "weak" | "strong";
};

export function MapOverlay({
  scanStatus,
  result,
  radarHeading,
  signalStrength,
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

  return (
    <div className="pointer-events-none absolute inset-0 z-[1000]">
      <Radar
        scanStatus={scanStatus}
        heading={radarHeading}
        signalStrength={signalStrength}
        onScan={scan}
         mjolnirDetected={
    scanStatus === "result" && result?.isMjolnir === true
  }
        
      />

      {showResult && <Result result={result} />}
    </div>
  );
}
