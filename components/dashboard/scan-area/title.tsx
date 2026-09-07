export function Title() {
    return (
          <div className="flex items-center gap-2">
          <img src="/icons/location.png" />

          <div>
            <h3 className="text-sm font-semibold">Scan Area</h3>

            <p className="text-xs text-slate-500">Configure detection range</p>
          </div>
        </div>
    )
}