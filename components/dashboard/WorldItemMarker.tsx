import { WorldItem } from "@/app/data/world.item";
import { Rune } from "./items/Rune";
import { Chest } from "./items/Chest";

export function WorldItemMarker({
  item,
  player,
  discoveredRunes,
  discoveredChests,
}: {
  item: WorldItem;
  player: { x: number; y: number };
  discoveredRunes: string[];
  discoveredChests:string[];
}) {
  const distance = Math.hypot(
    player.x - item.x,
    player.y - item.y
  );

  const isNearby = distance <= 70;

const isDiscovered =
  (item.type === "rune" &&
    discoveredRunes.includes(item.id)) ||
  (item.type === "chest" &&
    discoveredChests.includes(item.id));

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: item.x,
        top: item.y,
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* INTERACTION LABEL */}
        {isNearby && !isDiscovered && (
          <div
            className="
              absolute
              bottom-full
              left-1/2
              mb-2
              -translate-x-1/2
              whitespace-nowrap
              bg-black/60
              px-2.5
              py-1
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#d6d0c4]
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            "
          >
            {item.type === "rune" ? "Examine" : "Open"}
          </div>
        )}

      
       {item.type === "rune" && (
            <Rune isDiscovered={isDiscovered} />
          )}

          {item.type === "chest" && (
            <Chest isDiscovered={isDiscovered} />
          )}
      
      </div>
    </div>
  );
}
