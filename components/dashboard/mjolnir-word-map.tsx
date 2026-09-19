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

          {showFog && (
            <div
              className="mjolnir-fog"
              style={{
                "--fog-x": `${player.x - cameraX}px`,
                "--fog-y": `${player.y - cameraY}px`,
              } as React.CSSProperties}
            />
          )}

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

          <div
            className="mjolnir-player"
            style={{
              left:
                player.x -
                PLAYER_SIZE / 2,

              top:
                player.y -
                PLAYER_SIZE / 2,
            }}
          >
            <div
              className={`mjolnir-wanderer ${walking
                  ? "walking"
                  : ""
                }`}
              style={{
                backgroundPositionY:
                  `-${directionRow *
                  PLAYER_SIZE
                  }px`,
              }}
            />
          </div>
        </div>



        {/* DEBUG */}

        {debug && (
          <div className="mjolnir-debug">
            <div>
              Direction:{" "}
              <strong>
                {direction}
              </strong>
            </div>

            <div>
              Walking:{" "}
              <strong>
                {walking
                  ? "YES"
                  : "NO"}
              </strong>
            </div>

            <div>
              Position:{" "}
              {Math.round(
                player.x
              )}{" "}
              /{" "}
              {Math.round(
                player.y
              )}
            </div>

            <div>
              Viewport:{" "}
              {Math.round(
                viewportSize.width
              )}{" "}
              /{" "}
              {Math.round(
                viewportSize.height
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

}