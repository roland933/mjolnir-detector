import { useDetectorContext } from "../context/detector-context";
import { EndingState } from "../types/ending.type";

export function getThorMood(
  result: ReturnType<typeof useDetectorContext>["result"],
  scanStatus: ReturnType<typeof useDetectorContext>["scanStatus"],
  endingState: EndingState
) {
  if (endingState === "angry") {
    return {
      image: "/moods/angry.png",
      label: "Annoyed",
      message: "That is NOT my hammer.",
    };
  }

  if (scanStatus === "scanning" || scanStatus === "analyzing") {
    return {
      image: "/moods/focused.png",
      label: "Focused",
      message: "Stay sharp. Something is out there...",
    };
  }

  if (!result) {
    return {
      image: "/moods/skeptical.png",
      label: "Skeptical",
      message: "Waiting for a worthy signal...",
    };
  }

  if (result.isMjolnir) {
    return {
      image: "/moods/pleased.png",
      label: "Pleased",
      message: "Finally. I knew you'd find it.",
    };
  }

  return {
    image: "/moods/angry.png",
    label: "Annoyed",
    message: "That is NOT my hammer.",
  };
}