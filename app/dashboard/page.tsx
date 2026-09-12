"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DetectorMap } from "@/components/dashboard/detector-map";
import { RecentDetections } from "@/components/dashboard/recent-detections";
import { useEffect, useState } from "react";
import { ScanAreaType } from "../types/scan.area";
import { useDetectorContext } from "@/app/context/detector-context";
import { ThorMood } from "@/components/dashboard/thor-mood";
import { Background } from "@/components/dashboard/background";
import { NorsePanel } from "@/components/dashboard/norse-panel";
import { LocationResult } from "../lib/geocoding";
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

  const { scan, scanStatus,result } = useDetectorContext();
  const [endingOpen, setEndingOpen] = useState(false);
  const [lightning, setLightning] = useState(false);

    const {
    playThunder,
  } = useSoundEffects();


  const handleLocationSearch = (location: LocationResult) => {
    setScanArea((current) => ({
      ...current,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  };




useEffect(() => {
  if (!result?.isMjolnir) {
    return;
  }

  const timeout = setTimeout(() => {
    setLightning(true);
    playThunder();
    setTimeout(() =>   {
      setEndingOpen(true);
    }, 500);
  }, 1500);

  return () => clearTimeout(timeout);
}, [result]);



return (
  <main className="relative h-screen overflow-hidden bg-[#080b0e] text-white">
    <Toaster />

    <Background />
    <Lightning active={lightning} />

    {/* Full screen map */}
    <div className="absolute inset-0">
      <DetectorMap
        scanArea={scanArea}
        setScanArea={setScanArea}
      />
    </div>

    {/* Left HUD */}
    <aside
      className="
        absolute
        left-0
        top-0
        z-[1100]
        flex
        h-full
        w-[320px]
        flex-col
        px-4
        py-5
      "
    >
      <DashboardHeader />

      <div className="mt-4 flex flex-1 flex-col gap-4">
        <NorsePanel>
          <ThorMood />
        </NorsePanel>

        <div className="min-h-0 flex-1">
          <NorsePanel>
            <RecentDetections />
          </NorsePanel>
        </div>
      </div>
    </aside>

    <EndingModal
      open={endingOpen}
      onClose={() => setEndingOpen(false)}
    />
  </main>
);
}
