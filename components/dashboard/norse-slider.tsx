"use client";

type Props = {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function NorseSlider({
  value,
  min,
  max,
  onChange,
}: Props) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative mt-2 w-full">
      {/* Slider track */}
      <div className="relative h-3">
        {/* Outer metal track */}
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-sm border border-slate-700 bg-slate-950/90" />

        {/* Filled track */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-sky-500/80"
          style={{
            width: `${percentage}%`,
          }}
        />

        {/* Rune markers */}
        <div className="absolute inset-0 flex items-center justify-between px-0.5">
          <span className="h-2 w-2 rotate-45 border border-slate-600 bg-slate-900" />
          <span className="h-2 w-2 rotate-45 border border-slate-600 bg-slate-900" />
        </div>

        {/* Rune thumb */}
        <div
          className="
            pointer-events-none
            absolute top-1/2
            h-6 w-6
            -translate-x-1/2 -translate-y-1/2
            rotate-45
            rounded-sm
            border border-sky-400/70
            bg-slate-900
            shadow-[0_0_10px_rgba(56,189,248,0.25)]
          "
          style={{
            left: `${percentage}%`,
          }}
        >
          <div className="flex h-full w-full -rotate-45 items-center justify-center">
            <span className="h-2 w-2 rotate-45 border border-sky-400/80" />
          </div>
        </div>

        {/* Actual input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className="
            absolute inset-0
            h-full w-full
            cursor-pointer
            opacity-0
          "
        />
      </div>
    </div>
  );
}