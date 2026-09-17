import { DashboardHeader } from "@/components/dashboard/header/dashboard-header";
import { ThorMood } from "@/components/dashboard/thorMood/thor-mood";
import { RecentDetections } from "@/components/recentDetections/recent-detections";

export function SideBar() {

    return (
  <aside className="h-full w-[300px] shrink-0">
             
                <div
                  className="
            relative
            flex
            h-full
            flex-col
            overflow-hidden
           
            bg-neutral-950/50
            backdrop-blur-[3px]
          "
                >
        
                  <div className="relative z-10 flex h-full flex-col">
                
                   <DashboardHeader />
        
                    <ThorMood />
        
                    <div className="mt-3 min-h-0 flex-1  pt-3">
                      <RecentDetections />
                    </div>
                  </div>
                </div>
              </aside>
    )
}