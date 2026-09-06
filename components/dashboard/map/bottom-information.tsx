import { ScanStatus } from "@/app/types/scan.status";
import { ScanLine } from "lucide-react";

type Props = {
    scanStatus:ScanStatus,
    onClick:() => void,
    radius:number,

}

export function BottomInformation({ scanStatus,onClick,radius }:Props) {
    return (
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-slate-800 bg-slate-950/90 px-5 py-4 backdrop-blur">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Detection radius
                    </p>

                    <p className="mt-1 text-lg font-semibold">
                        {radius} km
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Signal strength
                    </p>

                    <p className="mt-1 text-lg font-semibold text-emerald-400">
                        72%
                    </p>
                </div>

                <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                        Status
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                        <span
                            className={`h-2 w-2 rounded-full ${scanStatus === "scanning"
                                    ? "animate-pulse bg-emerald-400"
                                    : scanStatus === "result"
                                        ? "bg-red-400"
                                        : "bg-amber-400"
                                }`}
                        />

                        {scanStatus === "idle" && "Monitoring"}
                        {scanStatus === "scanning" && "Scanning"}
                        {scanStatus === "analyzing" && "Analyzing"}
                        {scanStatus === "result" && "Detection found"}
                    </p>
                </div>

                <button
                    onClick={onClick}
                   disabled={
  scanStatus === "scanning" ||
  scanStatus === "analyzing"
}
                    className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm transition hover:border-slate-500 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ScanLine className="h-4 w-4" />

                  {scanStatus === "idle" && "Start Scan"}
                {scanStatus === "scanning" && "Scanning..."}
                {scanStatus === "analyzing" && "Analyzing..."}
                {scanStatus === "result" && "Scan Again"}
                </button>
            </div>
        </div>
    )


}