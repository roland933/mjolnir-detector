import { useEffect, useRef, useState } from "react";

export type Direction =
  | "down"
  | "up"
  | "left"
  | "right";

export type PlayerPosition = {
  x: number;
  y: number;
};

type UsePlayerMovementProps = {
  initialPosition: PlayerPosition;
  mapWidth: number;
  mapHeight: number;
  playerSize: number;
  playerSpeed: number;
};

export function usePlayerMovement({
  initialPosition,
  mapWidth,
  mapHeight,
  playerSize,
  playerSpeed,
}: UsePlayerMovementProps) {
  const [player, setPlayer] =
    useState<PlayerPosition>(initialPosition);

  const [direction, setDirection] =
    useState<Direction>("up");

  const [walking, setWalking] =
    useState(false);

  const keys =
    useRef<Set<string>>(new Set());

  const animationFrame =
    useRef<number | null>(null);

  const lastTime =
    useRef<number | null>(null);

  const collisionCanvas =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const image = new Image();

    image.src = "/collision-mask.png";

    image.onload = () => {
      const canvas =
        document.createElement("canvas");

      canvas.width = image.width;
      canvas.height = image.height;

      const context =
        canvas.getContext("2d");

      if (!context) return;

      context.drawImage(image, 0, 0);

      collisionCanvas.current = canvas;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      if (
        ["w", "a", "s", "d"].includes(key)
      ) {
        event.preventDefault();
        keys.current.add(key);
      }
    };

    const handleKeyUp = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      keys.current.delete(key);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp
      );
    };
  }, []);

  const isBlocked = (
    x: number,
    y: number
  ) => {
    const canvas =
      collisionCanvas.current;

    if (!canvas) {
      return false;
    }

    const context =
      canvas.getContext("2d");

    if (!context) {
      return false;
    }

    const pixel =
      context.getImageData(
        Math.floor(x),
        Math.floor(y),
        1,
        1
      ).data;

    return pixel[0] > 200;
  };

  const canMoveTo = (
    x: number,
    y: number
  ) => {
    const radius = playerSize * 0.25;

    return (
      !isBlocked(x, y - radius) &&
      !isBlocked(x, y + radius) &&
      !isBlocked(x - radius, y) &&
      !isBlocked(x + radius, y)
    );
  };

  useEffect(() => {
    const update = (time: number) => {
      if (lastTime.current === null) {
        lastTime.current = time;
      }

      const delta = Math.min(
        (time - lastTime.current) / 1000,
        0.05
      );

      lastTime.current = time;

      let dx = 0;
      let dy = 0;

      if (keys.current.has("w")) {
        dy -= 1;
      }

      if (keys.current.has("s")) {
        dy += 1;
      }

      if (keys.current.has("a")) {
        dx -= 1;
      }

      if (keys.current.has("d")) {
        dx += 1;
      }

      const isMoving =
        dx !== 0 || dy !== 0;

      setWalking(isMoving);

      if (isMoving) {
        const length = Math.sqrt(
          dx * dx + dy * dy
        );

        dx /= length;
        dy /= length;

        if (Math.abs(dx) > Math.abs(dy)) {
          setDirection(
            dx > 0 ? "right" : "left"
          );
        } else {
          setDirection(
            dy > 0 ? "down" : "up"
          );
        }

        setPlayer((current) => {
          const nextX = Math.max(
            playerSize / 2,
            Math.min(
              mapWidth - playerSize / 2,
              current.x +
                dx *
                  playerSpeed *
                  delta
            )
          );

          const nextY = Math.max(
            playerSize / 2,
            Math.min(
              mapHeight - playerSize / 2,
              current.y +
                dy *
                  playerSpeed *
                  delta
            )
          );

          if (canMoveTo(nextX, nextY)) {
            return {
              x: nextX,
              y: nextY,
            };
          }

          return current;
        });
      }

      animationFrame.current =
        requestAnimationFrame(update);
    };

    animationFrame.current =
      requestAnimationFrame(update);

    return () => {
      if (
        animationFrame.current !== null
      ) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, [
    mapWidth,
    mapHeight,
    playerSize,
    playerSpeed,
  ]);

  return {
    player,
    direction,
    walking,
  };
}

export function getDirectionRow(
  direction: Direction
) {
  return {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
  }[direction];
}