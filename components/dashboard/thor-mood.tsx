"use client";

import { Circle, MessageCircle } from "lucide-react";
import { useDetectorContext } from "@/app/context/detector-context";
import { CardTexture } from "./card-texture";

export function ThorMood() {
  const { result } = useDetectorContext();

  const mood = getThorMood(result);

  return (
    <section className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/80">
      <CardTexture />
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-slate-400" />

          <h2 className="text-sm font-semibold uppercase tracking-wider" 
                         style={{
                fontFamily: "var(--font-norse)",
                background:
                  "linear-gradient(180deg, #dbeafe 0%, #8da9bd 45%, #526b7a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 14px rgba(80, 160, 220, 0.22)",
              }}
                         
                         >
            Thor Connection
          </h2>
        </div>

        <div className="flex items-center gap-1 text-xs text-emerald-400"   style={{ fontFamily: "var(--font-norse)" }}>
          <Circle className="h-2 w-2 fill-current animate-pulse" />
          ONLINE
        </div>
      </div>

      <div className="relative h-64 overflow-hidden bg-slate-950 mb-3">
        <img
          src="/thor.png"
          alt="Thor"
          className="h-full w-full object-cover object-[50%_15%]"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="px-4 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Thor's Mood
        </p>

        <div className="mt-2 flex items-center gap-1">
         <img
            src={mood.icon}
            alt={mood.label}
            className="h-9 w-9 object-contain"
          />

          <span className="text-lg font-semibold uppercase tracking-wider text-amber-400"   style={{ fontFamily: "var(--font-norse)" }}>
            {mood.label}
          </span>
        </div>

        <p className="mt-3 text-md italic text-slate-400" >
          "{mood.message}"
        </p>
      </div>
    </section>
  );
}

function getThorMood(result: ReturnType<typeof useDetectorContext>["result"]) {
if (!result) {
  return {
    icon: "/icons/moods/skeptical.png",
    label: "Skeptical",
    message: "Waiting for a worthy signal...",
  };
}

if (result.isMjolnir) {
  return {
    icon: "/icons/moods/pleased.png",
    label: "Pleased",
    message: "Finally. I knew you'd find it.",
  };
}

return {
  icon: "/icons/moods/annoyed.png",
  label: "Annoyed",
  message: "That is NOT my hammer.",
};
}