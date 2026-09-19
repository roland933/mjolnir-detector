import { PlayerPosition } from "@/app/hooks/usePlayerMovement";
import { PlayerMessage } from "./PlayerMessage";

type PlayerProps = {
   player:PlayerPosition,
   playerSize:number,
   directionRow:number,
   walking:boolean,
   playerMessage:string | null,

}

export function Player({ player, playerSize, directionRow, walking,playerMessage }:PlayerProps) {
  return (
    <div
      className="mjolnir-player relative"
      style={{
        left: Math.round(player.x - playerSize / 2),
        top: Math.round(player.y - playerSize / 2),
      }}
    >
      <div
        className={`mjolnir-wanderer ${walking ? "walking" : ""}`}
        style={{
          backgroundPositionY: `-${directionRow * playerSize}px`,
        }}
      />

        <PlayerMessage message={playerMessage} />
      
    </div>
  );
}


