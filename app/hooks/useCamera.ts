export function useCamera(MAP_WIDTH,MAP_HEIGHT,viewportSize,player) {

    const cameraX = Math.max(
    0,
    Math.min(
      Math.max(
        0,
        MAP_WIDTH -
        viewportSize.width
      ),
      player.x -
      viewportSize.width / 2
    )
  );

  const cameraY = Math.max(
    0,
    Math.min(
      Math.max(
        0,
        MAP_HEIGHT -
        viewportSize.height
      ),
      player.y -
      viewportSize.height / 2
    )
  );

  return {
    cameraX,
    cameraY
  }

}