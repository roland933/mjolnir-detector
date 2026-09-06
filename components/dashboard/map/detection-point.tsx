import { DetectionResult } from "@/app/types/detector.result"

type Props = {
    result: DetectionResult | null,
}

export function DetectionPoint({ result }:Props) {

    if (!result) {
        return null
    }
    return (

        <div className="absolute right-[22%] top-[28%]">
            <div className="relative">
                <span className="absolute -inset-3 animate-ping rounded-full bg-red-400/20" />

                <div
  className={`relative h-3 w-3 rounded-full shadow-[0_0_15px_rgba(248,113,113,0.8)] ${
    result.isMjolnir
      ? "bg-amber-400"
      : "bg-red-400"
  }`}
/>
            </div>
        </div>

    )

}