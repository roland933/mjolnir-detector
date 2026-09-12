type Props = {
  strength: number;
};

export function MjolnirEnergyWaveform({ strength }: Props) {
  const intensity = Math.max(0, Math.min(100, strength));

  const opacity = 0.25 + intensity / 140;
  const scale = 0.85 + intensity / 650;

  return (
    <div className="relative h-[58px] w-[220px]">
      <svg
        viewBox="0 0 220 58"
        className="h-full w-full overflow-visible"
        fill="none"
      >
        {/* Outer energy fragments */}
        <g
          className="text-sky-400"
          style={{
            opacity,
            transformOrigin: "center",
            transform: `scaleY(${scale})`,
          }}
        >
          {/* Left energy */}
          <path
            d="M8 29H34L43 20L51 29L43 38L34 29"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right energy */}
          <path
            d="M212 29H186L177 20L169 29L177 38L186 29"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Upper energy arcs */}
          <path
            d="M48 22L58 12L68 22"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M172 22L162 12L152 22"
            stroke="currentColor"
            strokeWidth="1"
          />

          {/* Lower energy arcs */}
          <path
            d="M48 36L58 46L68 36"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M172 36L162 46L152 36"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>

        {/* Central rune energy */}
        <g
          className="mjolnir-rune-pulse text-sky-300"
          style={{
            opacity: 0.45 + intensity / 180,
            filter:
              intensity > 65
                ? "drop-shadow(0 0 5px rgba(56,189,248,0.45))"
                : undefined,
          }}
        >
          {/* Outer rune circle */}
          <circle
            cx="110"
            cy="29"
            r="14"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* Rune */}
          <path
            d="
              M110 17
              V41

              M102 21
              L110 29
              L118 21

              M102 37
              L110 29
              L118 37
            "
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central point */}
          <circle
            cx="110"
            cy="29"
            r="2"
            fill="currentColor"
          />
        </g>

        {/* Energy lines */}
        <g
          className="mjolnir-energy-breathe text-sky-400"
          style={{
            opacity: 0.2 + intensity / 160,
          }}
        >
          <path
            className="mjolnir-energy-flow"
            d="M60 29H92"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
          />

          <path
           className="mjolnir-energy-flow"
            d="M128 29H160"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        </g>
      </svg>
    </div>
  );
}