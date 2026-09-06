import { Navigation, Radar } from "lucide-react";
export function TopBar() {

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-4 backdrop-blur">
            <div>
                <div className="flex items-center gap-2">
                    <Radar className="h-4 w-4 text-emerald-400" />

                    <h2 className="text-sm font-semibold">
                        MJÖLNIR DETECTOR
                    </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                    Live detection map
                </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
                <Navigation className="h-3.5 w-3.5" />
                <span>47.4979° N, 19.0402° E</span>
            </div>
        </div>
    )


}