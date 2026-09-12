import { Signal } from "./mjolnirSignal/signal";

type Props = {
  strength: number;
};

export function MjolnirSignal({ strength }: Props) {
  const intensity = strength / 100;

  return (
    <div className="pointer-events-none absolute left-1/2 top-5 z-10">
      <div className="w-[300px]">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="text-xs transition-colors duration-500"
            style={{
              color:
                strength > 70
                  ? "#fbbf24"
                  : strength > 30
                    ? "#38bdf8"
                    : "#64748b",
            }}
          >
            ⚡
          </span>

          <span className="text-sm uppercase tracking-[0.25em] text-slate-500">
            Mjölnir Signal
          </span>
        </div>

           <Signal strength={strength} intensity={intensity}/>     
      </div>
    </div>
  );
}