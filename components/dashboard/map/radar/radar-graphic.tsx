export function RadarGraphic() {
  const ticks = Array.from({ length: 24 });

  return (
    <svg
      viewBox="0 0 320 320"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* Outer frame */}
      <circle
        cx="160"
        cy="160"
        r="154"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />

      <circle
        cx="160"
        cy="160"
        r="146"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />

      {/* Norse ring */}
      <circle
        cx="160"
        cy="160"
        r="132"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />

      <circle
        cx="160"
        cy="160"
        r="124"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.35"
      />

      {/* Radar rings */}
      <circle
        cx="160"
        cy="160"
        r="96"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.28"
      />

      <circle
        cx="160"
        cy="160"
        r="64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />

      <circle
        cx="160"
        cy="160"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />

      {/* Cardinal lines */}
      <line
        x1="160"
        y1="24"
        x2="160"
        y2="296"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />

      <line
        x1="24"
        y1="160"
        x2="296"
        y2="160"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />

      {/* Diagonal guides */}
      <line
        x1="64"
        y1="64"
        x2="256"
        y2="256"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />

      <line
        x1="256"
        y1="64"
        x2="64"
        y2="256"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />

      {/* Outer ticks */}
      {ticks.map((_, index) => {
        const angle = index * 15;
        const major = index % 6 === 0;

        return (
          <line
            key={angle}
            x1="160"
            y1={major ? "8" : "12"}
            x2="160"
            y2={major ? "24" : "19"}
            stroke="currentColor"
            strokeWidth={major ? 1.5 : 1}
            opacity={major ? 0.5 : 0.25}
            transform={`rotate(${angle} 160 160)`}
          />
        );
      })}

      {/* Cardinal Norse markers */}
      <text
        x="160"
        y="18"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current"
        fontSize="17"
        opacity="0.55"
      >
        ᛏ
      </text>

      <text
        x="302"
        y="160"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current"
        fontSize="17"
        opacity="0.55"
      >
        ᚱ
      </text>

      <text
        x="160"
        y="302"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current"
        fontSize="17"
        opacity="0.55"
      >
        ᛟ
      </text>

      <text
        x="18"
        y="160"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-current"
        fontSize="17"
        opacity="0.55"
      >
        ᚠ
      </text>

      {/* Small rune groups */}
      <text
        x="92"
        y="46"
        className="fill-current"
        fontSize="11"
        letterSpacing="5"
        opacity="0.28"
      >
        ᚱᛟᚾ
      </text>

      <text
        x="205"
        y="46"
        className="fill-current"
        fontSize="11"
        letterSpacing="5"
        opacity="0.28"
      >
        ᛏᚨᛚ
      </text>

      <text
        x="92"
        y="282"
        className="fill-current"
        fontSize="11"
        letterSpacing="5"
        opacity="0.28"
      >
        ᛉᚠᚱ
      </text>

      <text
        x="205"
        y="282"
        className="fill-current"
        fontSize="11"
        letterSpacing="5"
        opacity="0.28"
      >
        ᛞᛟᚾ
      </text>

      {/* Center */}
      <circle
        cx="160"
        cy="160"
        r="8"
        fill="currentColor"
        opacity="0.18"
      />

      <circle
        cx="160"
        cy="160"
        r="3"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}