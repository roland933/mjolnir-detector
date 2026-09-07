import { ScanStatus } from "@/app/types/scan.status"
import { Crosshair } from "lucide-react"

type Props  = {
    scanStatus:ScanStatus
}

export function Radar({scanStatus}:Props) {
return(
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[320px] w-[320px]">
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-slate-700/60" />
          <div className="absolute inset-[60px] rounded-full border border-slate-700/60" />
          <div className="absolute inset-[120px] rounded-full border border-slate-700/60" />
          <div className="absolute inset-[180px] rounded-full border border-slate-700/60" />

          {/* Crosshair */}
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-800" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-800" />

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-400/10">
              <Crosshair className="h-5 w-5 text-emerald-400" />
            </div>
          </div>



          {/* Scan line */}
          <div className="absolute left-1/2 top-1/2 h-[200px] w-px origin-bottom -translate-x-1/2 -translate-y-full rotate-[35deg] bg-gradient-to-t from-emerald-400/70 to-transparent" />
        </div>
      </div>
)

}