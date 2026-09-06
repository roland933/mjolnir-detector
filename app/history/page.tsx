"use client";

import { Hammer, AlertTriangle } from "lucide-react";
import { useDetectorContext } from "@/app/context/detector-context";

export default function HistoryPage() {
  const { history } = useDetectorContext();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1200px] p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Detection History
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Previous Mjölnir detection events
          </p>
        </div>

        <div className="space-y-3">
          {history.map((detection) => {
            const Icon = detection.isMjolnir
              ? Hammer
              : AlertTriangle;

            return (
              <div
                key={detection.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="flex items-center gap-4">
                  <Icon
                    className={`h-5 w-5 ${
                      detection.isMjolnir
                        ? "text-amber-400"
                        : "text-slate-500"
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {detection.object}
                      </p>

                      <span className="text-xs text-slate-600">
                        {new Date(
                          detection.timestamp
                        ).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="mt-2 flex gap-5 text-xs text-slate-500">
                      <span>
                        Distance: {detection.distance} km
                      </span>

                      <span>
                        Confidence: {detection.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {history.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-800 p-10 text-center">
            <p className="text-sm text-slate-500">
              No detection events yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}