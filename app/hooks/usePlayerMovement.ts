import { useEffect, useRef, useState } from "react";

export type Direction =
  | "down"
  | "up"
  | "left"
  | "right";

type PlayerPosition = {
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

          return {
            x: nextX,
            y: nextY,
          };
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