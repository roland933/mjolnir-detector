export function SideBarWrapper({children}) {
    return (
         <aside className="h-full w-[300px] shrink-0">
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          border-r
          border-[#8b6b3f]/25
          bg-[#0b0d0f]/70
          text-[#d6d0c4]
          shadow-[8px_0_30px_rgba(0,0,0,0.35)]
        "
      >

        <div className="relative z-10 flex h-full flex-col px-5 py-6">

            {children}
        </div>

        </div>
        </aside>
    )
}