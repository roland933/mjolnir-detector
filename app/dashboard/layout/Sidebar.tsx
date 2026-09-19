import { Bottom } from "./sidebar/Bottom";
import { Journal } from "./sidebar/Journal";
import { RuneProgress } from "./sidebar/RuneProgress";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarSectionHeader } from "./sidebar/SidebarSectionHeader";
import { SideBarWrapper } from "./sidebar/SidebarWrapper";

export function SideBar() {
  return (
    <SideBarWrapper >

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

          
          <Bottom />
     </SideBarWrapper>
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