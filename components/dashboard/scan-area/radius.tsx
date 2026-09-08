import { NorseSlider } from "../norse-slider";

export function RadiusSlider({scanArea,onRadiusChange}) {

 return (
        <div className="min-w-[280px] flex-1 border-l border-slate-800 pl-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/icons/radius.png" className="h-6 w-6 object-contain" />
    
                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Detection Radius
                  </span>
                </div>
    
                <span className="text-sm font-semibold text-sky-400">
                  {scanArea.radius} km
                </span>
              </div>
    
              <NorseSlider
                value={scanArea.radius}
                min={5}
                max={50}
                onChange={onRadiusChange}
              />
            </div>
 )


}