import { useSoundEffects } from "@/app/hooks/use-sound-effects";
import { useState } from "react";
import { ScanStatus } from "../types/scan.status";
import { DetectionResult } from "../types/detector.result";
import { generateDetection } from "../lib/detector";
import { ScanAreaType } from "../types/scan.area";
import { DetectionHistoryItem } from "../types/detection.history";
import { playSound } from "@/lib/audio/sounds";
type DetectionTarget = {
  name: string;
  latitude: number;
  longitude: number;
};

export const useDetector = () => {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<DetectionHistoryItem[]>([]);
  const [showResult, setShowResult] = useState(false);


  const scan = (
    scanArea: ScanAreaType,
    target: DetectionTarget,
    distance: number,
     onComplete?: (detection: DetectionResult) => void
  ) => {
    setResult(null);
    setScanStatus("scanning");

    setTimeout(() => {
      setScanStatus("analyzing");
    }, 1500);

    setTimeout(() => {
      const detection = generateDetection(
        target,
        distance
      );

      if (detection.isMjolnir) {
       playSound("mjolnir",0.5)
      } else {
        playSound("discoveredItem",0.3)
      }

      setResult(detection);
      setShowResult(true);

      setHistory((current) => [
        {
          ...detection,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        },
        ...current,
      ]);

      setScanStatus("result");
      onComplete?.(detection);
    }, 3000);
  };

  return {
    scanStatus,
    result,
    history,
    scan,
    showResult,
    setShowResult,
    setScanStatus
  };
};