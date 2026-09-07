export function Coordinates({scanArea}) {

return (
          <div className="flex items-center gap-6 border-l border-slate-800 pl-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Latitude
            </p>

            <p className="mt-1 text-sm font-medium">
              {scanArea.latitude.toFixed(4)}°
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Longitude
            </p>

            <p className="mt-1 text-sm font-medium">
              {scanArea.longitude.toFixed(4)}°
            </p>
          </div>
        </div>
)

}