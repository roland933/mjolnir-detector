import { useEffect } from "react";
import {
  ITEM_LOOT,
  ItemLootType,
  WORLD_ITEMS,
} from "@/app/data/world.item";
import { GAME_CONFIG } from "../config/gameConfig";
import { useGameStore } from "../../stores/gameStore"
import { playSound } from "@/lib/audio/sounds";

type PlayerPosition = {
  x: number;
  y: number;
};

type UseWorldInteractionProps = {
  player: PlayerPosition;

  setDiscoveryMessage: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  setPlalyerMessage: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  setShowRelicsModal: React.Dispatch<
    React.SetStateAction<ItemLootType | null>
  >;

  setShowEndingModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

export function useWorldInteraction({
  player,
  setDiscoveryMessage,
  setPlalyerMessage,
  setShowRelicsModal,
  setShowEndingModal,
}: UseWorldInteractionProps) {
  const discoveredRunes = useGameStore(
    (state) => state.discoveredRunes
  );

  const discoveredChests = useGameStore(
    (state) => state.discoveredChests
  );

  const discoveredScrolls = useGameStore(
    (state) => state.discoveredScrolls
  );

  const collectedRelics = useGameStore(
    (state) => state.collectedRelics
  );

  const addRune = useGameStore(
    (state) => state.addRune
  );

  const addChest = useGameStore(
    (state) => state.addChest
  );

  const addScroll = useGameStore(
    (state) => state.addScroll
  );

  const addRelic = useGameStore(
    (state) => state.addRelic
  );

  useEffect(() => {
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

        if (
          distance > GAME_CONFIG.INTERACTION_DISTANCE
        ) {
          return false;
        }

        if (item.type === "rune") {
          return !discoveredRunes.includes(item.id);
        }

        if (item.type === "relics") {
          return !collectedRelics.includes(item.id);
        }

        if (item.type === "scroll") {
          return !discoveredScrolls.includes(item.id);
        }

        if (item.type === "mjolnir") {
          return true;
        }

        return false;
      });

      if (!nearbyItem) {
        return;
      }

      // RUNE
      if (nearbyItem.type === "rune") {
        playSound("rune")
        addRune(nearbyItem.id);

        setDiscoveryMessage(
          `Discovered ${
            nearbyItem.name ?? "Unknown Rune"
          }`
        );
      }

      // RELICS
      if (nearbyItem.type === "relics") {
        playSound("relics")
        addRelic(nearbyItem.id);

         setDiscoveryMessage(
          `Discovered ${
            nearbyItem.name ?? "Unknown Relics"
          }`
        );
  
      }

      // SCROLL
      if (nearbyItem.type === "scroll") {
        playSound("pergament")
        addScroll(nearbyItem.id);

        setDiscoveryMessage("Collected");
      }

      // MJÖLNIR
      if (nearbyItem.type === "mjolnir") {
        const hasAllRunes =
          discoveredRunes.length ===
          GAME_CONFIG.DISCOVERED_RUNES;

        const hasAllRelics =
          collectedRelics.length ===
          GAME_CONFIG.DISCOVERED_RELICS;

        if (hasAllRunes && hasAllRelics) {
          setDiscoveryMessage(
            "Collected mjölnir"
          );

          setTimeout(() => {
            setShowEndingModal(true);
          }, 1500);

          return;
        }

        setPlalyerMessage(
          "Mhh... I’m not ready to lift it yet."
        );
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
    discoveredScrolls,
    collectedRelics,
    addRune,
    addChest,
    addScroll,
    addRelic,
    setDiscoveryMessage,
    setPlalyerMessage,
    setShowRelicsModal,
    setShowEndingModal,
  ]);
}