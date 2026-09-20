import {
  useRef,
  useState,
} from "react";

import "./MjolnirWorldMap.css";
import { ItemLootType, LootType, WORLD_ITEMS } from "@/app/data/world.item";
import { WorldItemMarker } from "./WorldItemMarker";
import { DiscoveredMessage } from "./discovered-message";
import { useCamera } from "@/app/hooks/useCamera";

import {
  Direction,
  usePlayerMovement,
  getDirectionRow
} from "../../app/hooks/usePlayerMovement";

import { useWorldInteraction } from "../../app/hooks/useWorldInteraction";
import { useViewPort } from "@/app/hooks/useViewPort";
import { useCollisionMask } from "@/app/hooks/useCollisionMask";
import { Player } from "./player";
import { Fog } from "./fog";
import { RelicsModal } from "./RelicsModal";
import { GAME_CONFIG } from "@/app/config/gameConfig";
import { EndingModal } from "./EndingModal";
import { useGameStore } from "../../stores/gameStore"


type MjolnirWorldMapProps = {
  debug?: boolean;
  showControls?: boolean;
  showFog?: boolean;
};

export default function MjolnirWorldMap({
  showFog = true,
}: MjolnirWorldMapProps) {

  const {
    player,
    direction,
    walking,
  } = usePlayerMovement({
    initialPosition: {
      x: 450,
      y: 821,
    },
    mapWidth: GAME_CONFIG.MAP_WIDTH,
    mapHeight: GAME_CONFIG.MAP_HEIGHT,
    playerSize: GAME_CONFIG.PLAYER_SIZE,
    playerSpeed: GAME_CONFIG.PLAYER_SPEED,
  });

  const viewportRef = useRef<HTMLDivElement | null>(null);

  const {discoveredRunes,discoveredScrolls,discoveredChests,collectedRelics} = useGameStore();

  const [discoveryMessage, setDiscoveryMessage] = useState<string | null>(null);
  const [playerMessage, setPlalyerMessage] = useState<string | null>(null);
  const [showRelicsModal, setShowRelicsModal] = useState<ItemLootType | null>(null);
  const [showEndingModal, setShowEndingModal] = useState<boolean>(false);

  const {viewportSize} = useViewPort(viewportRef);

  useCollisionMask(GAME_CONFIG.MAP_WIDTH,GAME_CONFIG.MAP_HEIGHT);

  useWorldInteraction({
      player,
      setDiscoveryMessage,
      setPlalyerMessage,
      setShowRelicsModal,
      setShowEndingModal
    });

  const {cameraX,cameraY} = useCamera(GAME_CONFIG.MAP_WIDTH,GAME_CONFIG.MAP_HEIGHT,viewportSize,player)
  const directionRow = getDirectionRow(direction);

  return (
    <>
      <DiscoveredMessage discoveryMessage={discoveryMessage} />
      <RelicsModal
        relic={showRelicsModal}
        onClose={() => setShowRelicsModal(null)}
      />

      <EndingModal
        open={showEndingModal}
        onClose={() => setShowEndingModal(false)}
      />

      <div
        ref={viewportRef}
        className="mjolnir-world-map"
      >
        <div
          className="relative mjolnir-world"
          style={{
            width: GAME_CONFIG.MAP_WIDTH,
            height: GAME_CONFIG.MAP_HEIGHT,

            transform: `
            translate(
              ${-cameraX}px,
              ${-cameraY}px
            )
          `,
          }}
        >

          <Fog discoveredRunes={discoveredRunes} showFog={true} player={player} cameraX={cameraX} cameraY={cameraY}/>

          <img
            src="/viking-map2.png"
            className="mjolnir-world-map-image"
            draggable={false}
            alt=""
          />

          {WORLD_ITEMS.map((item) => (
            <WorldItemMarker
              key={item.id}
              item={item}
              player={player}
              discoveredRelic={collectedRelics}
               />
          ))}

          <Player player={player}
                  playerMessage={playerMessage} 
                  playerSize={GAME_CONFIG.PLAYER_SIZE} 
                  directionRow={directionRow} 
                  walking={walking}/>


        </div>

      </div>
    </>
  );

}