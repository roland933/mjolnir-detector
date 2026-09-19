import { useEffect } from "react";
import { WORLD_ITEMS } from "@/app/data/world.item";

type PlayerPosition = {
  x: number;
  y: number;
};

type UseWorldInteractionProps = {
  player: PlayerPosition;

  discoveredRunes: string[];

  setDiscoveredRunes: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  discoveredChests: string[];
  setDiscoveredChests: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  discoveredScrolls:string[],
  setDiscoveredScrolls: React.Dispatch<
    React.SetStateAction<string[]>
  >;

  discoveredRelic:string[],
  setDiscoveredRelic: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  
  setDiscoveryMessage: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  setPlalyerMessage: React.Dispatch<
    React.SetStateAction<string | null>
  >;
};

export function useWorldInteraction({
  player,
  discoveredRunes,
  setDiscoveredRunes,
  discoveredChests,
  setDiscoveredChests,
  discoveredScrolls,
  setDiscoveredScrolls,
  discoveredRelic,
  setDiscoveredRelic,
  setPlalyerMessage,
  setDiscoveryMessage,
}: UseWorldInteractionProps) {
  useEffect(() => {

    const INTERACTION_DISTANCE = 70;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key !== "e") {
        return;
      }

      event.preventDefault();

      const nearbyItem = WORLD_ITEMS.find((item) => {
        const distance = Math.hypot(
          player.x - item.x,
          player.y - item.y
        );

        if (distance > INTERACTION_DISTANCE) {
          return false;
        }

        if (item.type === "rune") {
          return !discoveredRunes.includes(item.id);
        }

        if (item.type === "chest") {
          return !discoveredChests.includes(item.id);
        }

         if (item.type === "scroll") {
          return !discoveredScrolls.includes(item.id);
        }

        if(item.type === "mjolnir") {
           return !discoveredRelic.includes(item.id);
        }

        return false;
      });

      if (!nearbyItem) {
        return;
      }

      if (nearbyItem.type === "rune") {
        setDiscoveredRunes((current) => [
          ...current,
          nearbyItem.id,
        ]);

        setDiscoveryMessage(
          `Discovered ${nearbyItem.name ?? "Unknown Rune"}`
        );
      }

      if (nearbyItem.type === "chest") {
        setDiscoveredChests((current) => [
          ...current,
          nearbyItem.id,
        ]);

        setDiscoveryMessage("Chest opened");
      }

      if (nearbyItem.type === "scroll") {
        setDiscoveredScrolls((current) => [
          ...current,
          nearbyItem.id,
        ]);

        setDiscoveryMessage("Collected");
      }

       if (nearbyItem.type === "mjolnir" && discoveredRunes.length === 4) {
        setDiscoveredRelic((current) => [
          ...current,
          nearbyItem.id,
        ]);

        setDiscoveryMessage("Collected mjölnir");
      }
      
       if (nearbyItem.type === "mjolnir" && discoveredRunes.length !== 4) {

        setPlalyerMessage("Mhh... I need to find all the runes");
      } 

      setTimeout(() => {
        setDiscoveryMessage(null);
        setPlalyerMessage(null);
      }, 3000);

 

    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    player,
    discoveredRunes,
    discoveredChests,
    setDiscoveredRunes,
    setDiscoveredChests,
    setDiscoveryMessage,
  ]);
}