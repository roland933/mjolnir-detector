import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DetectorStatus } from "@/components/dashboard/detector-status";
import { DetectorMap } from "@/components/dashboard/detector-map";
import { LiveFeed } from "@/components/dashboard/live-feed";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-[1800px] p-6">
        <DashboardHeader />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">

          <DetectorStatus />


          <DetectorMap />


          <LiveFeed />
        </div>
      </div>
    </main>
  );
}