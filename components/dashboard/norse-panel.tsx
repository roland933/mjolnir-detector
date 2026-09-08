import { ReactNode } from "react";

type NorsePanelVariant = "default" | "subtle" | "accent" | "danger";

type Props = {
  children: ReactNode;
  variant?: NorsePanelVariant;
  className?: string;
};

const variants = {
  default: {
    border: "border-slate-700/70",
    inner: "border-slate-600/25",
    accent: "text-slate-500",
    cornerColor:"text-slate-500/60",
    background: "bg-slate-950/80"
  },
  subtle: {
    border: "border-slate-800",
    inner: "border-slate-700/20",
    accent: "text-slate-600",
  },
  accent: {
    border: "border-sky-500/50",
    inner: "border-sky-400/20",
    accent: "text-sky-400",
    cornerColor:"text-sky-500/60",
    background: "bg-sky-950/80"
  },
  danger: {
    border: "border-red-500/40",
    inner: "border-red-400/15",
    accent: "text-red-400",
    cornerColor:"text-red-500/60",
    background: "bg-red-950/80"
  },
};

function NorseCorner({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
}) {
  const rotation = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];


  return (
    <div
      className={`pointer-events-none absolute h-8 w-8 ${rotation} ${
        position === "top-left"
          ? "left-2 top-2"
          : position === "top-right"
            ? "right-2 top-2"
            : position === "bottom-right"
              ? "bottom-2 right-2"
              : "bottom-2 left-2"
      }`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="h-full w-full text-slate-500/60"
      >
        <path
          d="M2 30V12L12 2H30"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        <path
          d="M5 24V14L14 5H24"
          stroke="currentColor"
          strokeWidth="1"
        />

        <path
          d="M8 20L20 8"
          stroke="currentColor"
          strokeWidth="1"
        />

        <path
          d="M13 19L19 13L23 17L17 23Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export function NorsePanel({
  children,
  variant = "default",
  className = "",
}: Props) {
  const style = variants[variant];

  return (
    <section
      className={`
        relative overflow-hidden rounded-xl
        backdrop-blur-[2px]
        border ${style.border}
       ${style.background}
        
        ${className}
      `}
    >
      {/* Background texture */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/thor-card-texture.png')]
          bg-cover
          bg-center
          opacity-[0.10]
        "
      />

      {/* Inner border */}
      <div
        className={`
          pointer-events-none
          absolute inset-1
          rounded-lg
          border ${style.inner}
        `}
      />

      {/* Norse corners */}
      <NorseCorner position="top-left" />
      <NorseCorner position="top-right" />
      <NorseCorner position="bottom-right" />
      <NorseCorner position="bottom-left" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}