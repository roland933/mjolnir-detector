import { Journal } from "./Journal";
import { RuneProgress } from "./RuneProgress";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarSectionHeader } from "./SidebarSectionHeader";

export function SideBar() {
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

          <SidebarHeader />

          <section className="mt-6">
          
            <SidebarSectionHeader title="Objective"/>

            <p className="mt-4 text-center text-[13px] leading-5 text-[#aaa398]">
              Find the three ancient runes
              <br />
              to unlock Relic.
            </p>

             <RuneProgress />
          </section>

     
          <section className="mt-7">
            <SidebarSectionHeader title="Discoveries"/>
   
            <div className="mt-3 divide-y divide-[#8b6b3f]/10">
              <DiscoveryRow
                icon="ᚱ"
                label="Runes"
                value="0 / 3"
              />

              <DiscoveryRow
                icon="▤"
                label="Scrolls"
                value="0 / 5"
              />

              <DiscoveryRow
                icon="◇"
                label="Artifacts"
                value="0 / 4"
              />
            </div>
          </section>

         
          <section className="mt-7">
            <SidebarSectionHeader title="Journal"/>
            <Journal />
          </section>

          
          <div className="mt-auto pt-6">
            <div className="h-px bg-[#8b6b3f]/20" />

            <p
              className="
                mt-4
                text-center
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#625b51]
              "
            >
              Explore · Discover · Unlock
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function DiscoveryRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center py-3">
      <span className="w-8 text-center text-lg text-[#9a805b]">
        {icon}
      </span>

      <span className="flex-1 text-[12px] text-[#9a9388]">
        {label}
      </span>

      <span className="text-[10px] tracking-[0.15em] text-[#6f695f]">
        {value}
      </span>
    </div>
  );
}