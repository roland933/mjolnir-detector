import { useState } from "react";
import { ScanStatus } from "../types/scan.status";
import { DetectionResult } from "../types/detector.result";
import { generateDetection } from "../lib/detector";
import { ScanAreaType } from "../types/scan.area";
import { DetectionHistoryItem } from "../types/detection.history";

export const useDetector = () => {

  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<DetectionHistoryItem[]>([]);

  const scan = (scanArea: ScanAreaType) => {
    setResult(null);
    setScanStatus("scanning");

    setTimeout(() => {
      setScanStatus("analyzing");
    }, 1500);

    setTimeout(() => {
      const detection = generateDetection(scanArea);

      setResult(detection);

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
  };
};