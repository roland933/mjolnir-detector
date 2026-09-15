"use client";
import { DashboardHeader } from "@/components/dashboard/header/dashboard-header";
import { DetectorMap } from "@/components/dashboard/detector-map";
import { RecentDetections } from "@/components/recentDetections/recent-detections";
import { useEffect, useState } from "react";
import { ScanAreaType } from "../types/scan.area";
import { useDetectorContext } from "@/app/context/detector-context";
import { ThorMood } from "@/components/dashboard/thorMood/thor-mood";
import { Background } from "@/components/dashboard/background";
import { EndingModal } from "@/components/dialogs/ending-modal";
import { Toaster } from "@/components/ui/toast";
import { Lightning } from "@/components/dashboard/ending/lightning";
import { useSoundEffects } from "../hooks/use-sound-effects";

export default function DashboardPage() {
  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 64.5,
    longitude: 13.5,
    radius: 25,
  });

  const { result } = useDetectorContext();
  const [endingOpen, setEndingOpen] = useState(false);

  const { playThunder } = useSoundEffects();

  useEffect(() => {
    if (!result?.isMjolnir) {
      return;
    }

    const timeout = setTimeout(() => {
     
      playThunder();
      setTimeout(() => {
        setEndingOpen(true);
      }, 500);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [result]);

  return (
    <main className="relative h-screen overflow-hidden bg-[#080b0e] text-white">
      <Toaster />

      <Background />
      

      {/* Full screen map */}
      <div className="absolute inset-0">
        <DetectorMap scanArea={scanArea} setScanArea={setScanArea} />
      </div>

      {/* Left HUD */}
      <aside
        className="
    absolute
    left-0
    top-0
    z-[1100]
    h-full
    w-[300px]
    px-4
    py-4
     
  "
      >
        <div
          className="
    relative
    flex
    h-full
    flex-col
    overflow-hidden
    rounded-xl
    bg-neutral-950/30
    backdrop-blur-[3px]
  "
        >
          {/* Sidebar texture */}
          <div
            className="
      pointer-events-none
      absolute inset-0
      bg-[url('/card-texture.png')]
      bg-cover
      bg-center
      opacity-[0.07]
      grayscale
    "
          />

          <div className="relative z-10 flex h-full flex-col">
            {/* Header */}
            <DashboardHeader />

            {/* Thor */}

            <ThorMood />

            {/* Recent */}
            <div className="mt-3 min-h-0 flex-1  pt-3">
              <RecentDetections />
            </div>
          </div>
        </div>
      </aside>

      <EndingModal open={endingOpen} onClose={() => setEndingOpen(false)} />
    </main>
  );
}
