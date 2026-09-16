export function RadarGraphic({
  heading,
  signalStrength,
}: {
  heading: number;
  signalStrength: "none" | "weak" | "strong";
}) {
  const isStrong = signalStrength === "strong";
  const isWeak = signalStrength === "weak";

  const signalColor = isStrong
    ? "#67e8f9"
    : isWeak
      ? "#38bdf8"
      : "#94a3b8";

  const signalOpacity = isStrong ? 0.9 : isWeak ? 0.65 : 0.45;

  return (
    <div className="relative h-[250px] w-[250px]">
      {/* Subtle artifact surface */}
      <div
        className="absolute inset-[14px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(15,23,25,0.18), rgba(2,6,8,0.08) 65%, transparent 75%)",
        }}
      />

      {/* Main engraved ring */}
      <div
        className="absolute inset-[18px] rounded-full border-2"
        style={{
          borderColor: `rgba(103, 232, 249, ${signalOpacity})`,
          boxShadow: isStrong
            ? "0 0 14px rgba(103,232,249,0.18)"
            : "0 0 8px rgba(103,232,249,0.06)",
        }}
      />

      {/* Inner engraved ring */}
      <div
        className="absolute inset-[32px] rounded-full border border-slate-400/30"
      />

      {/* Rune inscription */}
      <svg
        className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
        viewBox="0 0 250 250"
      >
        <defs>
          <path
            id="rune-ring"
            d="
              M 125 125
              m -100 0
              a 100 100 0 1 1 200 0
              a 100 100 0 1 1 -200 0
            "
          />
        </defs>

        <text
          fill="rgba(203, 213, 225, 0.68)"
          fontSize="7"
          fontWeight="500"
          letterSpacing="3"
          style={{
            filter:
              "drop-shadow(0 0 3px rgba(148,163,184,0.3))",
          }}
        >
          <textPath
            href="#rune-ring"
            startOffset="0%"
          >
            ᛏ ᚺ ᛟ ᚱ · ᛗ ᛃ ᛟ ᛚ ᚾ ᛁ ᚱ · ᛏ ᚺ ᛟ ᚱ · ᛗ ᛃ ᛟ ᛚ ᚾ ᛁ ᚱ · ᛏ ᚺ ᛟ ᚱ · ᛗ ᛃ ᛟ ᛚ ᚾ ᛁ ᚱ
          </textPath>
        </text>
      </svg>

      {/* Cardinal engraving */}
      <div className="absolute left-1/2 top-[8px] -translate-x-1/2 text-[9px] text-slate-300/50">
        ᛏ
      </div>

      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[9px] text-slate-300/50">
        ᛉ
      </div>

      <div className="absolute left-[8px] top-1/2 -translate-y-1/2 text-[9px] text-slate-300/50">
        ᚠ
      </div>

      <div className="absolute right-[8px] top-1/2 -translate-y-1/2 text-[9px] text-slate-300/50">
        ᚱ
      </div>

      {/* Minimal crosshair */}
      <div className="absolute left-1/2 top-[34px] h-[182px] w-px -translate-x-1/2 bg-slate-400/15" />

      <div className="absolute left-[34px] top-1/2 h-px w-[182px] -translate-y-1/2 bg-slate-400/15" />

      {/* Norse center glyph */}
      <div
        className="absolute left-1/2 top-1/2 z-[4] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 border"
        style={{
          borderColor: `rgba(103, 232, 249, ${signalOpacity})`,
          boxShadow: isStrong
            ? "0 0 10px rgba(103,232,249,0.2)"
            : "none",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 z-[5] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: signalColor,
          boxShadow: `0 0 9px rgba(103,232,249,${signalOpacity})`,
        }}
      />

      {/* Radar sweep */}
      <div
        className="absolute left-1/2 top-1/2 z-[3] h-[91px] w-px origin-bottom"
        style={{
          transform: `rotate(${heading}deg)`,
          transformOrigin: "bottom center",
          background: `linear-gradient(
            to top,
            rgba(103,232,249,${signalOpacity}),
            rgba(103,232,249,0.08),
            transparent
          )`,
        }}
      />
    </div>
  );
}