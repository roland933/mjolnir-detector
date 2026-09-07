import { Radio } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="mb-3 flex items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center gap-1">

          {/* Mjölnir */}
          <img
            src="/mjolnir.png"
            alt="Mjölnir"
            className="
              h-15 w-15 object-contain
              animate-[mjolnir-glow_4s_ease-in-out_infinite]
              
            "
          />

          {/* Title */}
          <h1
              style={{
                fontFamily: "var(--font-norse)",
                background:
                  "linear-gradient(180deg, #dbeafe 0%, #8da9bd 45%, #526b7a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 14px rgba(80, 160, 220, 0.22)",
              }}
              className="mb-2 text-2xl tracking-wider"
            >
              MJÖLNIR DETECTOR
            </h1>
        </div>

        {/* Connection */}
        <div
          className="flex items-center justify-center gap-2 text-md"
          style={{ fontFamily: "var(--font-norse)" }}
        >
          <Radio className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.35)]" />

          <span className="text-slate-500">
            ASGARD CONNECTION
          </span>

          <span className="font-medium text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}