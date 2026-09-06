import { DetectionResult } from "../types/detector.result";
import { ScanAreaType } from "../types/scan.area";

export const generateDetection = (
  scanArea: ScanAreaType
): DetectionResult => {
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