import { Bottom } from "./sidebar/Bottom";
import { Journal } from "./sidebar/Journal";
import { RuneProgress } from "./sidebar/RuneProgress";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarSectionHeader } from "./sidebar/SidebarSectionHeader";
import { SideBarWrapper } from "./sidebar/SidebarWrapper";
import { useGameStore } from "@/stores/gameStore";
import { GAME_CONFIG } from "@/app/config/gameConfig";
import { ReactNode } from "react";

export function SideBar() {

    const discoveredRunes = useGameStore(
    (state) => state.discoveredRunes
      );

      const discoveredScrolls = useGameStore(
        (state) => state.discoveredScrolls
      );

      const discoveredArtifacts = useGameStore(
        (state) => state.discoveredArtifacts
      );

      const collectedRelics = useGameStore(
        (state) => state.collectedRelics
      );

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

             <RuneProgress discoveredRunes={discoveredRunes} />
          </section>

     
         <section className="mt-7">
            <SidebarSectionHeader title="Discoveries"/>

                <div className="mt-3 divide-y divide-[#8b6b3f]/10">
                  <DiscoveryRow
                    icon={<img src="/icons/rune.png" className="h-6 w-6"/>}
                    label="Runes"
                     value={`${discoveredRunes.length} / ${GAME_CONFIG.DISCOVERED_RUNES}`}
                  />

                  <DiscoveryRow
                    icon="▤"
                    label="Scrolls"
                    value={`${discoveredScrolls.length} / ${GAME_CONFIG.DISCOVERED_SCROLLS}`}
                  />

                  <DiscoveryRow
                    icon="◇"
                    label="Artifacts"
                    value={`${discoveredArtifacts.length} / ${GAME_CONFIG.DISCOVERED_ARTIFACTS}`}
                  />

                  <DiscoveryRow
                    icon="ᛏ"
                    label="Relics"
                    value={`${collectedRelics.length} / ${GAME_CONFIG.DISCOVERED_RELICS}`}
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
  icon: ReactNode;
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