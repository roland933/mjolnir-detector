"use client";

import { ArrowRight } from "lucide-react";
import { useDetectorContext } from "@/app/context/detector-context";
import { useState } from "react";
import { HistoryModal } from "../dialogs/HistoryModal";
import { CardTexture } from "./card-texture";
import { PanelHeader } from "../panel/panel-header";

export function RecentDetections() {
  const { history } = useDetectorContext();

  const recentDetections = history.slice(0, 2);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
    <section className="relative rounded-xl overflow-hidden">

       <CardTexture />

       <PanelHeader title="Recent Detections">
               <ArrowRight className="h-4 w-4 text-slate-600" />
        </PanelHeader>
      

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
      <div className="flex justify-center">
        <button
         style={{ fontFamily: "var(--font-norse)" }}
        onClick={() => setHistoryOpen(true)}
          type="button"
          className="mt-0 flex w-50  items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400 transition hover:border-sky-500/40 hover:text-sky-400"
        >
          <img src="/icons/history.png" className="h-5 w-5 object-contain"/>
          View History
        </button>
      </div>
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