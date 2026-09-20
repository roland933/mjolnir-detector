export function SidebarSectionHeader({title}) {
    return (

         <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#8b6b3f]/25" />

              <span
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#a58a62]
                "
              >
               {title}
              </span>

              <span className="h-px flex-1 bg-[#8b6b3f]/25" />
            </div>

    )

}