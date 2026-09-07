import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function NorseCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const rotation = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  const positionClass = {
    "top-left": "left-3 top-3",
    "top-right": "right-3 top-3",
    "bottom-right": "bottom-3 right-3",
    "bottom-left": "bottom-3 left-3",
  }[position];

  return (
    <div
      className={`pointer-events-none absolute h-12 w-12 ${positionClass} ${rotation}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="h-full w-full text-slate-600/50"
      >
        <path
          d="M3 45V16L16 3H45"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M7 37V18L18 7H37"
          stroke="currentColor"
          strokeWidth="1"
        />

        <path
          d="M11 31L31 11"
          stroke="currentColor"
          strokeWidth="1"
        />

        <path
          d="M17 30L30 17L37 24L24 37Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export function DashboardWrapper({
  children,
  className = "",
}: Props) {
  return (
    <main
      className={`
        relative overflow-hidden
        rounded-2xl
        border border-slate-800/90
        bg-slate-950/90
       
        ${className}
      `}
    >
      {/* Background texture */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/dashboard-texture.png')]
          bg-cover
          bg-center
          opacity-[0.10]
        "
      />

      {/* Subtle inner border */}
      <div
        className="
          pointer-events-none
          absolute inset-1
          rounded-xl
          border border-slate-700/20
        "
      />

      {/* Norse corners */}
      <NorseCorner position="top-left" />
      <NorseCorner position="top-right" />
      <NorseCorner position="bottom-left" />
      <NorseCorner position="bottom-right" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}