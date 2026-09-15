export function ScanStatusMarker({scanStatus}) {
    return(
        <>
        {scanStatus === "scanning" && (
  <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
    <div className="rounded-md border border-cyan-300/20 bg-neutral-950/55 px-4 py-1.5 backdrop-blur-md">
      <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-cyan-200 drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]">
        SCANNING
      </span>
    </div>
  </div>
)}

{scanStatus === "analyzing" && (
  <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
    <div className="rounded-md border border-slate-300/15 bg-neutral-950/55 px-4 py-1.5 backdrop-blur-md">
      <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-slate-200 drop-shadow-[0_0_6px_rgba(226,232,240,0.7)]">
        ANALYZING...
      </span>
    </div>
  </div>
)}
</>
    )
}