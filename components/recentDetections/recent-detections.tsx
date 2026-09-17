"use client";

import { ArrowRight } from "lucide-react";
import { useDetectorContext } from "@/app/context/detector-context";
import { useState } from "react";
import { HistoryModal } from "../dialogs/HistoryModal";
import { PanelHeader } from "../panel/panel-header";
import { formatTime } from "@/app/helpers/formatTime";

export function RecentDetections() {
  const { history } = useDetectorContext();

  const recentDetections = history.slice(0, 3);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <>
    <section className="relative rounded-xl overflow-hidden">

       <PanelHeader title="Recent Detections">
               <ArrowRight className="h-4 w-4 text-neutral-600" />
        </PanelHeader>
      

      <div className="p-4">
        {recentDetections.length === 0 ? (
          <p className="py-6 text-center text-md text-neutral-300">
            No detections recorded yet.
          </p>
        ) : (
          <div className="space-y-3">
            {recentDetections.map((detection) => (
              <div
                key={detection.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                 

                  <div>
                    <p className="text-sm font-medium"  style={{ fontFamily: "var(--font-norse)" }}>
                      {detection.object}
                    </p>

                    <p className="text-xs text-neutral-600">
                      {detection.isMjolnir
                        ? "Mjölnir signature detected"
                        : "Common metal object"}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-neutral-600">
                  {formatTime(detection.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}


      <div className="flex justify-center">
        {recentDetections.length > 2 && (
        <button
         style={{ fontFamily: "var(--font-norse)" }}
        onClick={() => setHistoryOpen(true)}
          type="button"
          className="mt-3 flex w-50 hover:cursor-pointer  items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 transition hover:border-sky-500/40 hover:text-sky-400"
        >
       
          View History
        </button>
        )}
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

