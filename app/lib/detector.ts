import { DetectionResult } from "../types/detector.result";
import { ScanAreaType } from "../types/scan.area";

type DetectionTarget = {
  name: string;
  latitude: number;
  longitude: number;
};

export const generateDetection = (
  scanArea: ScanAreaType,
  target: DetectionTarget
): DetectionResult => {
  const latitude = target.latitude;
  const longitude = target.longitude;

  return {
    object: "MJÖLNIR",
    confidence: 99.7,
    distance: Number(
      Math.sqrt(
        Math.pow(latitude - scanArea.latitude, 2) +
        Math.pow(longitude - scanArea.longitude, 2)
      ).toFixed(1)
    ),
    isMjolnir: true,
    latitude,
    longitude,
  };
};