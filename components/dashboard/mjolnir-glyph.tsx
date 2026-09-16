type MjolnirGlyphProps = {
  className?: string;
};

export function MjolnirGlyph({
  className = "",
}: MjolnirGlyphProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mjölnir head */}
      <path
        d="
          M17 25
          L30 13
          L70 13
          L83 25
          L77 43
          L61 40
          L57 52
          L43 52
          L39 40
          L23 43
          Z
        "
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Rune mark */}
      <path
        d="
          M50 18
          L57 29
          L50 39
          L43 29
          Z
          M46 29H54
        "
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* Handle */}
      <path
        d="
          M43 50
          L44 91
          L50 108
          L56 91
          L57 50
        "
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Handle engraving */}
      <path
        d="
          M50 62
          L55 69
          L50 76
          L45 69
          Z
        "
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Bottom rune cut */}
      <path
        d="M44 91L50 85L56 91"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}