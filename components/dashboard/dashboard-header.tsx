import { Radio } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="mb-3 flex items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center gap-1">

         

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
          className="flex items-center justify-center gap-1 text-md"
          style={{ fontFamily: "var(--font-norse)" }}
        >
        <img src="/icons/asgard_connection.png" className="h-6 w-6 object-contain"/>

          <span className="text-slate-500">
            ASGARD CONNECTION
          </span>

          <span className="font-medium text-sky-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]">
            ONLINE
          </span>
        </div>
      </div>
    </header>
  );
}