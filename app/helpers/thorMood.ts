import { useDetectorContext } from "../context/detector-context";

export function getThorMood(result: ReturnType<typeof useDetectorContext>["result"]) {
if (!result) {
  return {
    icon: "/icons/moods/skeptical.png",
    image: "/moods/skeptical.png",
    label: "Skeptical",
    message: "Waiting for a worthy signal...",
  };
}

if (result.isMjolnir) {
  return {
    icon: "/icons/moods/pleased.png",
    image: "/moods/pleased.png",
    label: "Pleased",
    message: "Finally. I knew you'd find it.",
  };
}

return {
  icon: "/icons/moods/annoyed.png",
   image: "/moods/angry.png",
  label: "Annoyed",
  message: "That is NOT my hammer.",
};
}