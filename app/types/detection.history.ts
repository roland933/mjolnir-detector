import { DetectionResult } from "./detector.result";

export type DetectionHistoryItem = DetectionResult & {
  id: string;
  timestamp: string;
};