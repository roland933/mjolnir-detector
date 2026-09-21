export function Fog({
  showFog,
  player,
  cameraX,
  cameraY,
  discoveredRunes,
}) {
  const fogRadius = 280 + discoveredRunes.length * 60;

  return (
    <>
      {showFog && (
        <div
          className="mjolnir-fog"
          style={{
            "--fog-x": `${player.x - cameraX}px`,
            "--fog-y": `${player.y - cameraY}px`,
            "--fog-radius": `${fogRadius}px`,
          } as React.CSSProperties}
        />
      )}
    </>
  );
}