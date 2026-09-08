export function Location({location,setLocation,onLocationSearch}) {
    return (
           <div className="min-w-[260px] flex-1">
          <div className="flex items-center gap-1">
            <img src="/icons/search.png" className="h-6 w-6 object-contain" />

            <span className="text-[10px] uppercase tracking-wider text-slate-500">
              Location
            </span>
          </div>

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && location.trim()) {
                onLocationSearch(location.trim());
              }
            }}
            placeholder="Search location..."
            className="mt-1 w-full border-b border-slate-700 bg-transparent py-1 text-sm text-white outline-none placeholder:text-slate-600 focus:border-sky-400"
          />
        </div>
    )

}