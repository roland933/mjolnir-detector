import { DetectionResult } from "../types/detector.result";
import { ScanAreaType } from "../types/scan.area";

type DetectionTarget = {
  name: string;
  latitude: number;
  longitude: number;
  isMjolnir: boolean;
  falsePositive?: string;
   image?: string;
};

export const generateDetection = (

  target: DetectionTarget,
  distance: number
): DetectionResult => {
  const isMjolnir = target.isMjolnir;

return {
  object: isMjolnir
    ? "MJÖLNIR"
    : target.falsePositive ?? "UNKNOWN",

  confidence: isMjolnir ? 99.7 : 72,

  distance: Number((distance / 1000).toFixed(1)),

  isMjolnir,

  latitude: target.latitude,
  longitude: target.longitude,

  locationName: target.name,
  image: target.image,
};
};