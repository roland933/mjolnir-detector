"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DetectorMap } from "@/components/dashboard/detector-map";
import {  RecentDetections } from "@/components/dashboard/recent-detections";
import { ScanArea } from "@/components/dashboard/map/scan-area";
import { useState } from "react";
import { ScanAreaType } from "../types/scan.area";
import { useDetectorContext } from "@/app/context/detector-context";
import { ThorMood } from "@/components/dashboard/thor-mood";
import { Background } from "@/components/dashboard/background";
import { NorsePanel } from "@/components/dashboard/norse-panel";
export default function DashboardPage() {
  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 47.4979,
    longitude: 19.0402,
    radius: 25,
  });

  const { scan,scanStatus } = useDetectorContext();
  return (



    <main className="min-h-screen  bg-[#080b0e] text-white">
      <Background />
      <div className="p-6 relative max-w-[1600px] mx-auto ">
        <DashboardHeader />
        
        <div className="bg-slate-950 h-full w-full p-3 rounded-xl shadow-md  backdrop-blur-3xl  border-4 border-slate-800/50">
        <ScanArea
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
          <DetectorMap
            scanArea={scanArea}
            setScanArea={setScanArea}
          />


          <div className="space-y-3">
            <NorsePanel >
                <ThorMood />
            </NorsePanel>
             <NorsePanel >
                <RecentDetections />
            </NorsePanel>
          </div>

        </div>

       


      </div>

      </div>

    </main>

  );
}