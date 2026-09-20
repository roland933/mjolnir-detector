import { WorldItem } from "@/app/data/world.item";
import { Rune } from "./items/Rune";
import { Relics } from "./items/Relics";
import { ItemLabel } from "./items/ItemLabel";
import { Scroll } from "./items/Scroll";
import { Relic } from "./items/Relic";
import { useGameStore } from "@/stores/gameStore";

export function WorldItemMarker({
  item,
  player,
  discoveredRelic,
}: {
  item: WorldItem;
  player: { x: number; y: number };
  discoveredRelic: string[];
}) {
  const distance = Math.hypot(
    player.x - item.x,
    player.y - item.y
  );

    const {discoveredRunes,discoveredScrolls,collectedRelics} = useGameStore();

  const isNearby = distance <= 70;

  const isDiscovered =
    (item.type === "rune" &&
      discoveredRunes.includes(item.id)) ||
    (item.type === "relics" &&
      collectedRelics.includes(item.id)) ||
    (item.type === "scroll" &&
      discoveredScrolls.includes(item.id)) || 
       (item.type === "mjolnir" &&
      discoveredRelic.includes(item.id));

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: item.x,
        top: item.y,
      }}
    >
      <div className="relative flex items-center justify-center">
         
        <ItemLabel 
          isDiscovered={isDiscovered}
          isNearby={isNearby}
          itemType={item.type} />


        {item.type === "rune" && (
          <Rune isDiscovered={isDiscovered} item={item}/>
        )}

        {item.type === "relics" && (
          <Relics isDiscovered={isDiscovered} item={item}/>
        )}

        {item.type === "scroll" && (
          <Scroll isDiscovered={isDiscovered} />
        )}

         {item.type === "mjolnir" && (
          <Relic isDiscovered={isDiscovered} />
        )}

      </div>
    </div>
  );
}
