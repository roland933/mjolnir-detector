import {
  useRef,
  useState,
} from "react";

import "./MjolnirWorldMap.css";
import { WORLD_ITEMS } from "@/app/data/world.item";
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

const MAP_WIDTH = 1536;
const MAP_HEIGHT = 1024;

const PLAYER_SPEED = 130;
const PLAYER_SIZE = 64;

type MjolnirWorldMapProps = {
  debug?: boolean;
  showControls?: boolean;
  showFog?: boolean;
};

export default function MjolnirWorldMap({
  debug = false,
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
    mapWidth: MAP_WIDTH,
    mapHeight: MAP_HEIGHT,
    playerSize: PLAYER_SIZE,
    playerSpeed: PLAYER_SPEED,
  });

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [discoveredRunes, setDiscoveredRunes] = useState<string[]>([]);
  const [discoveredChests, setDiscoveredChests] = useState<string[]>([]);
  const [discoveredScrolls, setDiscoveredScrolls] = useState<string[]>([]);
  const [discoveryMessage, setDiscoveryMessage] = useState<string | null>(null);
  const {viewportSize} = useViewPort(viewportRef);

  useCollisionMask(MAP_WIDTH,MAP_HEIGHT);

  useWorldInteraction({
      player,
      discoveredRunes,
      discoveredChests,
      discoveredScrolls,
      setDiscoveredRunes,
      setDiscoveredChests,
      setDiscoveryMessage,
      setDiscoveredScrolls
    });

  const {cameraX,cameraY} = useCamera(MAP_WIDTH,MAP_HEIGHT,viewportSize,player)
  const directionRow = getDirectionRow(direction);

  return (
    <>
      <DiscoveredMessage discoveryMessage={discoveryMessage} />

      <div
        ref={viewportRef}
        className="mjolnir-world-map"
      >
        <div
          className="relative mjolnir-world"
          style={{
            width: MAP_WIDTH,
            height: MAP_HEIGHT,

            transform: `
            translate(
              ${-cameraX}px,
              ${-cameraY}px
            )
          `,
          }}
        >

          <Fog showFog={showFog} player={player} cameraX={cameraX} cameraY={cameraY}/>

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
              discoveredScrolls={discoveredScrolls}
              discoveredChests={discoveredChests}
              discoveredRunes={discoveredRunes} />
          ))}

          {/* PLAYER */}

          <Player player={player} 
                  PLAYER_SIZE={PLAYER_SIZE} 
                  directionRow={directionRow} 
                  walking={walking}/>


        </div>

      </div>
    </>
  );

}