"use client";

import { ArrowRight, History } from "lucide-react";
import { useDetectorContext } from "@/app/context/detector-context";
import { useState } from "react";
import { HistoryModal } from "../dialogs/HistoryModal";

export function RecentDetections() {
  const { history } = useDetectorContext();

  const recentDetections = history.slice(0, 2);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
    <section className="rounded-xl border border-slate-800 bg-slate-900/80">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-400" />

          <h2 className="text-sm font-semibold uppercase tracking-wider"   style={{
                fontFamily: "var(--font-norse)",
                background:
                  "linear-gradient(180deg, #dbeafe 0%, #8da9bd 45%, #526b7a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 14px rgba(80, 160, 220, 0.22)",
              }}>
            Recent Detections
          </h2>
        </div>

        <ArrowRight className="h-4 w-4 text-slate-600" />
      </div>

      <div className="p-4">
        {recentDetections.length === 0 ? (
          <p className="py-6 text-center text-md text-slate-600">
            No detections recorded yet.
          </p>
        ) : (
          <div className="space-y-3">
            {recentDetections.map((detection) => (
              <div
                key={detection.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      detection.isMjolnir
                        ? "bg-amber-400"
                        : "bg-red-500"
                    }`}
                  />

                  <div>
                    <p className="text-sm font-medium">
                      {detection.object}
                    </p>

                    <p className="text-[11px] text-slate-600">
                      {detection.isMjolnir
                        ? "Mjölnir signature detected"
                        : "Common metal object"}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-slate-600">
                  {formatTime(detection.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
         style={{ fontFamily: "var(--font-norse)" }}
        onClick={() => setHistoryOpen(true)}
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 transition hover:border-sky-500/40 hover:text-sky-400"
        >
          <History className="h-3.5 w-3.5" />
          View History
        </button>
      </div>
    </section>

     <HistoryModal
      open={historyOpen}
      onClose={() => setHistoryOpen(false)}
    />
    </>
  );
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diff < 60) {
    return `${diff}s ago`;
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  }

  return `${Math.floor(diff / 3600)}h ago`;
}