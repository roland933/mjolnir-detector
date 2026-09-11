export type DetectionResult = {
  object: string;
  confidence: number;
  distance: number;
  isMjolnir: boolean;
  latitude: number;
  longitude: number;

  locationName: string;
  image?: string;
};