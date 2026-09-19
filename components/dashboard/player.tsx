export function Player({ player, PLAYER_SIZE, directionRow, walking }) {
  return (
    <div
      className="mjolnir-player"
      style={{
        left: Math.round(player.x - PLAYER_SIZE / 2),
        top: Math.round(player.y - PLAYER_SIZE / 2),
      }}
    >
      <div
        className={`mjolnir-wanderer ${walking ? "walking" : ""}`}
        style={{
          backgroundPositionY: `-${directionRow * PLAYER_SIZE}px`,
        }}
      />
    </div>
  );
}