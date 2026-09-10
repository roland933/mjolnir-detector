import { Crosshair } from "lucide-react";

type RadarProps = {
  heading: number;
  signalActive: boolean;
   signalStrength: "none" | "weak" | "strong";
};

export function Radar({ heading, signalActive,signalStrength }: RadarProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative h-[320px] w-[320px]">

        {/* Outer rings */}
        <div className="absolute inset-0 rounded-full border border-slate-500/70" />
        <div className="absolute inset-[60px] rounded-full border border-slate-500/60" />
        <div className="absolute inset-[120px] rounded-full border border-slate-600/60" />
        <div className="absolute inset-[180px] rounded-full border border-slate-600/50" />

        {/* Crosshair */}
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-slate-500/35" />
        <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-slate-500/35" />

        {/* Norse cardinal runes */}
        <div className="absolute left-1/2 top-[-12px] -translate-x-1/2 text-xl font-medium text-slate-400/90">
          ᛏ
        </div>

        <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 text-xl font-medium text-slate-400/90">
          ᛟ
        </div>

        <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 text-xl font-medium text-slate-400/90">
          ᚠ
        </div>

        <div className="absolute right-[-12px] top-1/2 -translate-y-1/2 text-xl font-medium text-slate-400/90">
          ᚱ
        </div>

        {/* Cardinal ticks */}
        <div className="absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 bg-slate-400/80" />
        <div className="absolute bottom-0 left-1/2 h-5 w-[2px] -translate-x-1/2 bg-slate-400/80" />
        <div className="absolute left-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-slate-400/80" />
        <div className="absolute right-0 top-1/2 h-[2px] w-5 -translate-y-1/2 bg-slate-400/80" />

    {/* Center */}
      {/* Center */}
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  <div
    className={`
      flex h-11 w-11 items-center justify-center
      rounded-full border-2
      transition-all duration-300

      ${
        signalStrength === "none"
          ? `
            border-sky-400/80
            bg-sky-400/15
            shadow-[0_0_18px_rgba(56,189,248,0.25)]
          `
          : signalStrength === "weak"
          ? `
            animate-pulse
            border-sky-300
            bg-sky-400/30
            shadow-[0_0_28px_rgba(56,189,248,0.5)]
          `
          : `
            animate-pulse
            border-sky-200
            bg-sky-400/50
            shadow-[0_0_45px_rgba(56,189,248,0.85)]
          `
      }
    `}
  >
    <Crosshair
      className={`
        h-5 w-5 transition-all duration-300
        ${
          signalStrength === "strong"
            ? "text-sky-100"
            : "text-sky-300"
        }
      `}
    />
  </div>
</div>

        {/* Sweep */}
        <div
          className="absolute left-1/2 top-1/2 h-[160px] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-sky-300/90 via-sky-400/50 to-transparent transition-transform duration-300"
          style={{
            transform: `translate(-50%, -100%) rotate(${heading}deg)`,
          }}
        />

      </div>
    </div>
  );
}