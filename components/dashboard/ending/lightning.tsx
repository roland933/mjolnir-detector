"use client";

type Props = {
  active: boolean;
};

export function Lightning({ active }: Props) {
  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[4000] overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="
            M 52 -5
            L 46 22
            L 55 20
            L 43 48
            L 51 45
            L 37 105
          "
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          className="animate-lightning"
        />

        <path
          d="
            M 52 -5
            L 46 22
            L 55 20
            L 43 48
            L 51 45
            L 37 105
          "
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-sky-300/70 animate-lightning"
        />
      </svg>

      <div className="absolute inset-0 bg-white/10 animate-lightning-flash" />
    </div>
  );
}