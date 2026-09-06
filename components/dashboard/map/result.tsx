import { DetectionResult } from "@/app/types/detector.result"

type Props = {
    result: DetectionResult | null,
}

export function Result({result}:Props) {

    if (!result) {
            return null;
        }

    return (

                <div className="absolute left-1/2 top-24 z-20 w-[280px] -translate-x-1/2">
                    <div
                    className={`rounded-xl border p-4 backdrop-blur ${
                        result.isMjolnir
                        ? "border-amber-400/40 bg-amber-400/10"
                        : "border-slate-700 bg-slate-900/95"
                    }`}
                    >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Detection Result
                        </span>

                        <span
                        className={
                            result.isMjolnir
                            ? "text-amber-400"
                            : "text-slate-500"
                        }
                        >
                        {result.isMjolnir ? "MATCH" : "FALSE POSITIVE"}
                        </span>
                    </div>

                    <h3 className="mt-3 text-xl font-bold">
                        {result.object}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                        <p className="text-xs text-slate-500">
                            Confidence
                        </p>

                        <p className="font-semibold">
                            {result.confidence}%
                        </p>
                        </div>

                        <div>
                        <p className="text-xs text-slate-500">
                            Distance
                        </p>

                        <p className="font-semibold">
                            {result.distance} km
                        </p>
                        </div>
                    </div>

                    {!result.isMjolnir && (
                        <p className="mt-4 text-xs text-slate-500">
                        The detector remains unconvinced.
                        </p>
                    )}

                    {result.isMjolnir && (
                        <p className="mt-4 text-sm font-medium text-amber-400">
                        ⚡ Asgardian energy signature confirmed.
                        </p>
                    )}
                    </div>
                </div>
    )

    


}