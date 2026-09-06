import { DetectionHistoryItem } from "@/app/types/detection.history";
import { useDetectorContext } from "@/app/context/detector-context";
import {
  AlertTriangle,
 
  Hammer,
  Radio,
} from "lucide-react";


function DetectionItem({
 object,
  distance,
  isMjolnir,
  timestamp,
}: DetectionHistoryItem) {
const config = isMjolnir
  ? {
      icon: Hammer,
      iconClass: "text-amber-400",
      badgeClass: "text-amber-400",
      type: "POSSIBLE",
    }
  : {
      icon: AlertTriangle,
      iconClass: "text-slate-500",
      badgeClass: "text-slate-500",
      type: "FALSE POSITIVE",
    };


const Icon = config.icon;

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <div className="flex gap-3">
      <Icon className={`mt-0.5 h-4 w-4 ${config.iconClass}`} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
          <p
              className={`text-[10px] font-semibold tracking-wider ${config.badgeClass}`}
            >
              {config.type}
            </p>
            <span className="text-[10px] text-slate-600">
              {new Date(timestamp).toLocaleTimeString()}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-slate-300">
            {object}
          </p>

         <p className="mt-1 text-xs text-slate-600">
            Distance: {distance} km
          </p>
        </div>
      </div>
    </div>
  );
}

export function LiveFeed() {
  const { history } = useDetectorContext();
   const detections = history.slice(0, 3);
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-emerald-400" />

            <h2 className="font-semibold">
              Live Feed
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Recent detection events
          </p>
        </div>

        <span className="flex items-center gap-2 text-xs text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </div>

      <div className="space-y-3">
        {detections.map((detection) => (
          <DetectionItem
            key={detection.id}
            {...detection}
          />
        ))}
      </div>

      <div className="mt-5 border-t border-slate-800 pt-4">
        <button className="w-full text-center text-xs text-slate-500 transition hover:text-white">
          View detection history →
        </button>
      </div>
    </section>
  );
}