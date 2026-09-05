import { CheckCircle2, Crosshair, Radio, Zap } from "lucide-react";

const systems = [
  {
    name: "GPS",
    description: "Location tracking",
    icon: Crosshair,
  },
  {
    name: "Electromagnetic Scanner",
    description: "Detecting unusual energy",
    icon: Radio,
  },
  {
    name: "Lightning Analyzer",
    description: "Asgardian energy signature",
    icon: Zap,
  },
];

export function DetectorStatus() {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Detector Status</h2>

          <span className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            ONLINE
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Asgardian Detection System
        </p>
      </div>

      <div className="space-y-3">
        {systems.map((system) => {
          const Icon = system.icon;

          return (
            <div
              key={system.name}
              className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3"
            >
              <div className="rounded-md bg-slate-800 p-2">
                <Icon className="h-4 w-4 text-slate-300" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {system.name}
                </p>

                <p className="text-xs text-slate-500">
                  {system.description}
                </p>
              </div>

              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          );
        })}
      </div>

      <div className="mt-6 border-t border-slate-800 pt-5">
        <button className="w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
          START SCAN
        </button>
      </div>
    </section>
  );
}