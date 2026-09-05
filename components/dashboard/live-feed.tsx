import {
  AlertTriangle,
  CheckCircle2,
  Hammer,
  Radio,
} from "lucide-react";

const detections = [
  {
    id: 1,
    type: "UNKNOWN",
    object: "Unidentified metal object",
    distance: "8.4 km",
    time: "09:42:13",
    status: "possible",
  },
  {
    id: 2,
    type: "FALSE POSITIVE",
    object: "Frying pan",
    distance: "12.7 km",
    time: "09:41:02",
    status: "false",
  },
  {
    id: 3,
    type: "LOW SIGNAL",
    object: "Heavy metal object",
    distance: "18.2 km",
    time: "09:39:47",
    status: "low",
  },
];

function DetectionItem({
  type,
  object,
  distance,
  time,
  status,
}: {
  type: string;
  object: string;
  distance: string;
  time: string;
  status: "possible" | "false" | "low";
}) {
  const config = {
    possible: {
      icon: Hammer,
      iconClass: "text-amber-400",
      badgeClass: "text-amber-400",
    },
    false: {
      icon: AlertTriangle,
      iconClass: "text-slate-500",
      badgeClass: "text-slate-500",
    },
    low: {
      icon: CheckCircle2,
      iconClass: "text-slate-400",
      badgeClass: "text-slate-400",
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <div className="flex gap-3">
        <Icon className={`mt-0.5 h-4 w-4 ${current.iconClass}`} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`text-[10px] font-semibold tracking-wider ${current.badgeClass}`}
            >
              {type}
            </p>

            <span className="text-[10px] text-slate-600">
              {time}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-slate-300">
            {object}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Distance: {distance}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LiveFeed() {
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