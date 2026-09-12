import { ReactNode } from "react";

type NorsePanelVariant = "default" | "subtle" | "accent" | "danger";

type Props = {
  children: ReactNode;
  variant?: NorsePanelVariant;
  className?: string;
};

const variants = {
  default: {
    border: "border-neutral-400/20",
    inner: "border-neutral-300/10",
    accent: "text-neutral-400",
    cornerColor: "text-neutral-400/40",
    background: "bg-neutral-950/50",
  },

  subtle: {
    border: "border-neutral-500/10",
    inner: "border-neutral-400/5",
    accent: "text-neutral-500",
    cornerColor: "text-neutral-500/30",
    background: "bg-neutral-950/35",
  },

  accent: {
    border: "border-sky-400/35",
    inner: "border-sky-300/10",
    accent: "text-sky-400",
    cornerColor: "text-sky-400/40",
    background: "bg-neutral-950/50",
  },

  danger: {
    border: "border-red-400/30",
    inner: "border-red-300/10",
    accent: "text-red-400",
    cornerColor: "text-red-400/35",
    background: "bg-neutral-950/50",
  },
};

function NorseCorner({
  position,
  color,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
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
        className={`h-full w-full ${color}`}
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
        relative
        overflow-hidden
        rounded-xl
        border
        ${style.border}
        ${style.background}
        backdrop-blur-md
        ${className}
      `}
    >
      {/* Rune texture */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[url('/card-texture.png')]
          bg-cover
          bg-center
          opacity-[0.055]
          grayscale
        "
      />

      {/* Soft overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-neutral-900/10
        "
      />

      {/* Inner border */}
      <div
        className={`
          pointer-events-none
          absolute inset-1
          rounded-lg
          border
          ${style.inner}
        `}
      />

 

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}