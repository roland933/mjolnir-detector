import { DetectionResult } from "@/app/types/detector.result";
import { NorsePanel } from "../norse-panel";


type Props = {
  result: DetectionResult | null;
};

export function Result({ result }: Props) {
  if (!result) {
    return null;
  }


const image = result.image;
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-6 z-20 w-[300px] animate-in fade-in slide-in-from-top-2 duration-300">
      <NorsePanel>
        <div className="p-4">
          <div className="flex items-center justify-between">
            

            <span
             style={{ fontFamily: "var(--font-norse)" }}
              className={
                 `${result.isMjolnir ? "text-sky-400": "text-neutral-400"}`   
       
              }
            >
              {result.isMjolnir ? "MJÖLNIR" : "DISCOVERED ITEM"}
            </span>
          </div>

              <h3
        className="mt-3 text-xl"
        style={{ fontFamily: "var(--font-norse)" }}
      >
        {result.object}
      </h3>

      <p className="mt-1 text-sm uppercase tracking-widest text-neutral-500">
        {result.locationName}
      </p>

          {image && (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-800">
                    <img
                    src={image}
                    alt={result.object}
                    className="h-36 w-full object-cover"
                    />
                </div>
                )}

          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-neutral-300">
                Confidence
              </p>

              <p className="font-semibold">
                {result.confidence}%
              </p>
            </div>

            <div>
              <p className="text-xs text-neutral-300">
                Distance
              </p>

              <p className="font-semibold">
                {result.distance} km
              </p>
            </div>
          </div>

      
        </div>
      </NorsePanel>
    </div>
  );
}