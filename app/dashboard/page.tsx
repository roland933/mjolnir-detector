"use client";

import { useEffect, useState } from "react";
import { Background } from "@/components/dashboard/background";
import { Toaster } from "@/components/ui/toast";
import { SideBar } from "./layout/Sidebar";
import MjolnirWorldMap from "@/components/dashboard/mjolnir-word-map";

export default function DashboardPage() {

  const [endingOpen, setEndingOpen] = useState(false);

  return (
    <main className="relative h-screen overflow-hidden  text-white p-8 bg-[#080b0e]/50 ">
      <Toaster />

      <Background />
      
      <div className="relative z-10 flex h-full w-[1700px] mx-auto border border-slate-400/15 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
       
          <SideBar />

        <main className="min-w-0 flex-1">
            <MjolnirWorldMap showFog={false}/>
        </main>
      </div>

    </main>
  );
}