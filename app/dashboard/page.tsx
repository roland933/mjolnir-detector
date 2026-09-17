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
import { SideBar } from "./layout/Sidebar";

export default function DashboardPage() {
  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 64.5,
    longitude: 13.5,
    radius: 25,
  });

  const { result } = useDetectorContext();
  const [endingOpen, setEndingOpen] = useState(false);

  useEffect(() => {
    if (!result?.isMjolnir) {
      return;
    }

    const timeout = setTimeout(() => {
      setTimeout(() => {
        setEndingOpen(true);
      }, 500);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [result]);

  return (
    <main className="relative h-screen overflow-hidden bg-neutral-950/90 text-white p-8">
      <Toaster />

      <Background />
       
       
      <div className="relative z-10 flex h-full w-full mx-auto border border-slate-400/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ">
       
          <SideBar />

        <main className="min-w-0 flex-1">
          <DetectorMap
            scanArea={scanArea}
            setScanArea={setScanArea}
          />
        </main>
      </div>

      <EndingModal
        open={endingOpen}
        onClose={() => setEndingOpen(false)}
      />
    </main>
  );
}