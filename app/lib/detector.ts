import { DetectionResult } from "../types/detector.result";
import { ScanAreaType } from "../types/scan.area";

export const generateDetection = (
  scanArea: ScanAreaType
): DetectionResult => {

  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * scanArea.radius;

  const latitude =
    scanArea.latitude +
    (distance * Math.cos(angle)) / 111;

  const longitude =
    scanArea.longitude +
    (distance * Math.sin(angle)) /
    (111 * Math.cos((scanArea.latitude * Math.PI) / 180));




  const isMjolnir = Math.random() > 0.7;

  if (isMjolnir) {
    return {
      object: "MJÖLNIR",
      confidence: 99.7,
      distance: Number(distance.toFixed(1)),
      isMjolnir: true,
      latitude,
      longitude,

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
    latitude,
    longitude,
  };
};