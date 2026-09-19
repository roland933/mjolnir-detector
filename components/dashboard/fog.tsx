export function Fog({showFog,player,cameraX,cameraY}) {
    return (
        <>
             {showFog && (
            <div
              className="mjolnir-fog"
              style={{
                "--fog-x": `${player.x - cameraX}px`,
                "--fog-y": `${player.y - cameraY}px`,
              } as React.CSSProperties}
            />
          )}
        
        </>
    )
}