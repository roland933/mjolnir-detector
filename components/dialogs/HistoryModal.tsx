"use client";

import { X, History } from "lucide-react";
import { useDetectorContext } from "@/app/context/detector-context";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function HistoryModal({ open, onClose }: Props) {
  const { history } = useDetectorContext();

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-sky-400" />

            <h2 className="text-sm font-semibold uppercase tracking-wider">
              Detection History
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {history.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-600">
              No detections recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((detection) => (
                <div
                  key={detection.id}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
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

                        <p className="mt-1 text-xs text-slate-500">
                          {detection.isMjolnir
                            ? "Mjölnir signature detected"
                            : "Common metal object"}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-600">
                      {formatDate(detection.timestamp)}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-3 border-t border-slate-800 pt-3 text-xs">
                    <div>
                      <span className="text-slate-600">LAT</span>
                      <p className="mt-1 text-slate-400">
                        {detection.latitude.toFixed(4)}°
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-600">LNG</span>
                      <p className="mt-1 text-slate-400">
                        {detection.longitude.toFixed(4)}°
                      </p>
                    </div>

                    <div>
                      <span className="text-slate-600">DISTANCE</span>
                      <p className="mt-1 text-slate-400">
                        {detection.distance.toFixed(1)} km
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400 transition hover:border-slate-500 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleString();
}