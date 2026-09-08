"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DetectorMap } from "@/components/dashboard/detector-map";
import { RecentDetections } from "@/components/dashboard/recent-detections";
import { ScanArea } from "@/components/dashboard/map/scan-area";
import { useEffect, useState } from "react";
import { ScanAreaType } from "../types/scan.area";
import { useDetectorContext } from "@/app/context/detector-context";
import { ThorMood } from "@/components/dashboard/thor-mood";
import { Background } from "@/components/dashboard/background";
import { NorsePanel } from "@/components/dashboard/norse-panel";
import { DashboardWrapper } from "@/components/dashboard/dashboard-wrapper";
import { LocationResult } from "../lib/geocoding";
import { EndingModal } from "@/components/dialogs/ending-modal";
import { Toaster } from "@/components/ui/toast";


export default function DashboardPage() {


  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 47.4979,
    longitude: 19.0402,
    radius: 25,
  });

  const { scan, scanStatus,result } = useDetectorContext();

  const [endingOpen, setEndingOpen] = useState(true);

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
    setEndingOpen(true);
  }, 1500);

  return () => clearTimeout(timeout);
}, [result]);



  return (
     
    <main className="min-h-screen  bg-[#080b0e] text-white">
      <Toaster />
      <Background />
      <div className="p-6 relative max-w-[1700px] mx-auto ">
        <DashboardHeader />

        <DashboardWrapper>
          <div className="relative mx-auto w-full max-w-[1550px] px-4 py-5">
            <ScanArea
              onLocationSearch={handleLocationSearch}
              scanArea={scanArea}
              onRadiusChange={(radius) =>
                setScanArea((current) => ({
                  ...current,
                  radius,
                }))
              }
              scanStatus={scanStatus}
              onScan={() => scan(scanArea)}
            />

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_360px]">
              <DetectorMap scanArea={scanArea} setScanArea={setScanArea} />

              <div className="space-y-3">
                <NorsePanel >
                  <ThorMood />
                </NorsePanel>
                <NorsePanel>
                  <RecentDetections />
                </NorsePanel>
              </div>
            </div>
          </div>
        </DashboardWrapper>
      </div>
      <EndingModal
        open={endingOpen}
       
        onClose={() => setEndingOpen(false)}
      />
    </main>
  );
}
