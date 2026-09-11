import { useSoundEffects } from "@/app/hooks/use-sound-effects";
import { useState } from "react";
import { ScanStatus } from "../types/scan.status";
import { DetectionResult } from "../types/detector.result";
import { generateDetection } from "../lib/detector";
import { ScanAreaType } from "../types/scan.area";
import { DetectionHistoryItem } from "../types/detection.history";

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

  const {
    playFalseSignal,
    playMjolnirFound,
  } = useSoundEffects();

  const scan = (
    scanArea: ScanAreaType,
    target: DetectionTarget,
    distance: number,
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
        playMjolnirFound();
      } else {
        playFalseSignal();
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
    }, 3000);
  };

  return {
    scanStatus,
    result,
    history,
    scan,
    showResult,
    setShowResult,
  };
};