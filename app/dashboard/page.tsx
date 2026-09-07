"use client";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DetectorMap } from "@/components/dashboard/detector-map";
import { LiveFeed } from "@/components/dashboard/live-feed";
import { ScanArea } from "@/components/dashboard/map/scan-area";
import { useState } from "react";
import { ScanAreaType } from "../types/scan.area";


export default function DashboardPage() {
  const [scanArea, setScanArea] = useState<ScanAreaType>({
    latitude: 47.4979,
    longitude: 19.0402,
    radius: 25,
  });


  return (
  
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1800px] p-6">
        <DashboardHeader />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">


        <ScanArea
                scanArea={scanArea}
                onRadiusChange={(radius) =>
                  setScanArea((current) => ({
                    ...current,
                    radius,
                  }))
                }
              />


          <DetectorMap scanArea={scanArea} setScanArea={setScanArea}/>


          <LiveFeed />
        </div>
      </div>
    </main>

  );
}