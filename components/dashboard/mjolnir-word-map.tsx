import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./MjolnirWorldMap.css";

type Direction =
  | "down"
  | "up"
  | "left"
  | "right";

type VikingLocation = {
  id: string;
  name: string;
  x: number;
  y: number;
  rune: string;

  discovered?: boolean;

  item?: {
    name: string;
  };
};



/*
 * =========================
 * WORLD
 * =========================
 */

const MAP_WIDTH = 2100;
const MAP_HEIGHT = 882;

/*
 * =========================
 * PLAYER
 * =========================
 */

const PLAYER_SPEED = 130;
const PLAYER_SIZE = 64;

/*
 * =========================
 * VIKING LOCATIONS
 * =========================
 */

const VIKING_LOCATIONS: VikingLocation[] = [
  {
    id: "borg",
    name: "Borg",
    x: 250,
    y: 230,
    rune: "ᛒ",
  },

  {
    id: "trondheim",
    name: "Trondheim",
    x: 760,
    y: 150,
    rune: "ᛏ",
    item: {
      name: "Ancient Rune",
    },
  },

  {
    id: "uppsala",
    name: "Uppsala",
    x: 1120,
    y: 280,
    rune: "ᚢ",
  },

  {
    id: "kaupang",
    name: "Kaupang",
    x: 430,
    y: 440,
    rune: "ᚲ",
    item: {
      name: "Old Viking Compass",
    },
  },

  {
    id: "birka",
    name: "Birka",
    x: 850,
    y: 400,
    rune: "ᛒ",
    item: {
      name: "Broken Mjölnir Fragment",
    },
  },

  {
    id: "ribe",
    name: "Ribe",
    x: 300,
    y: 690,
    rune: "ᚱ",
  },

  {
    id: "hedby",
    name: "Hedeby",
    x: 560,
    y: 650,
    rune: "ᚺ",
  },

  {
    id: "jelling",
    name: "Jelling",
    x: 1250,
    y: 680,
    rune: "ᛃ",
  },
];

/*
 * =========================
 * HELPERS
 * =========================
 */

function getDirectionRow(
  direction: Direction
) {
  return {
    down: 0,
    up: 1,
    left: 2,
    right: 3,
  }[direction];
}

/*
 * =========================
 * COMPONENT
 * =========================
 */

type MjolnirWorldMapProps = {
  debug?: boolean;
  showControls?: boolean;
    showFog?: boolean;
};

export default function MjolnirWorldMap({
  debug = false,
  showControls = false,
   showFog = true,
}: MjolnirWorldMapProps) {
  /*
   * =========================
   * VIEWPORT
   * =========================
   */

  const viewportRef =
    useRef<HTMLDivElement | null>(null);

  const [viewportSize, setViewportSize] =
    useState({
      width: 1100,
      height: 650,
    });

  /*
   * =========================
   * PLAYER
   * =========================
   */

  const [player, setPlayer] = useState({
    x: MAP_WIDTH / 2,
    y: MAP_HEIGHT / 2,
  });

  const [direction, setDirection] =
    useState<Direction>("down");

  const [walking, setWalking] =
    useState(false);

  /*
   * =========================
   * COLLISION
   * =========================
   */

  const collisionData =
    useRef<Uint8ClampedArray | null>(
      null
    );

  /*
   * =========================
   * INPUT
   * =========================
   */

  const keys =
    useRef<Set<string>>(new Set());

  /*
   * =========================
   * GAME LOOP
   * =========================
   */

  const animationFrame =
    useRef<number | null>(null);

  const lastTime =
    useRef<number | null>(null);

  /*
   * =========================
   * RESPONSIVE VIEWPORT
   * =========================
   */

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    const observer =
      new ResizeObserver(
        ([entry]) => {
          setViewportSize({
            width:
              entry.contentRect.width,
            height:
              entry.contentRect.height,
          });
        }
      );

    observer.observe(
      viewportRef.current
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * =========================
   * LOAD COLLISION MASK
   * =========================
   */

  useEffect(() => {
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = "/collision-mask.png";

    image.onload = () => {
      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width = MAP_WIDTH;
      canvas.height = MAP_HEIGHT;

      const context =
        canvas.getContext("2d");

      if (!context) {
        return;
      }

      context.drawImage(
        image,
        0,
        0,
        MAP_WIDTH,
        MAP_HEIGHT
      );

      try {
        const imageData =
          context.getImageData(
            0,
            0,
            MAP_WIDTH,
            MAP_HEIGHT
          );

        collisionData.current =
          imageData.data;
      } catch (error) {
        console.error(
          "Failed to read collision mask:",
          error
        );
      }
    };

    image.onerror = () => {
      console.error(
        "Failed to load collision-mask.png"
      );
    };
  }, []);

  /*
   * =========================
   * KEYBOARD
   * =========================
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      const key =
        event.key.toLowerCase();

      if (
        ["w", "a", "s", "d"].includes(
          key
        )
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

  /*
   * =========================
   * COLLISION
   * =========================
   */

  const isWalkable = (
    x: number,
    y: number
  ) => {
    const data =
      collisionData.current;

    /*
     * Collision mask hasn't loaded yet.
     */

    if (!data) {
      return true;
    }

    const px = Math.round(x);
    const py = Math.round(y);

    if (
      px < 0 ||
      px >= MAP_WIDTH ||
      py < 0 ||
      py >= MAP_HEIGHT
    ) {
      return false;
    }

    const index =
      (py * MAP_WIDTH + px) * 4;

    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];

    const brightness =
      (red + green + blue) / 3;

    /*
     * Black = land
     * White = water
     */

    return brightness < 180;
  };

  /*
   * =========================
   * GAME LOOP
   * =========================
   */

  useEffect(() => {
    const update = (time: number) => {
      if (
        lastTime.current === null
      ) {
        lastTime.current = time;
      }

      const delta = Math.min(
        (time -
          lastTime.current) /
          1000,
        0.05
      );

      lastTime.current = time;

      let dx = 0;
      let dy = 0;

      if (
        keys.current.has("w")
      ) {
        dy -= 1;
      }

      if (
        keys.current.has("s")
      ) {
        dy += 1;
      }

      if (
        keys.current.has("a")
      ) {
        dx -= 1;
      }

      if (
        keys.current.has("d")
      ) {
        dx += 1;
      }

      const isMoving =
        dx !== 0 || dy !== 0;

      setWalking(isMoving);

      if (isMoving) {
        /*
         * Normalize diagonal movement
         */

        const length = Math.sqrt(
          dx * dx + dy * dy
        );

        dx /= length;
        dy /= length;

        /*
         * Direction
         */

        if (
          Math.abs(dx) >
          Math.abs(dy)
        ) {
          setDirection(
            dx > 0
              ? "right"
              : "left"
          );
        } else {
          setDirection(
            dy > 0
              ? "down"
              : "up"
          );
        }

        /*
         * Position
         */

        setPlayer((current) => {
          const nextX =
            Math.max(
              PLAYER_SIZE / 2,
              Math.min(
                MAP_WIDTH -
                  PLAYER_SIZE / 2,
                current.x +
                  dx *
                    PLAYER_SPEED *
                    delta
              )
            );

          const nextY =
            Math.max(
              PLAYER_SIZE / 2,
              Math.min(
                MAP_HEIGHT -
                  PLAYER_SIZE / 2,
                current.y +
                  dy *
                    PLAYER_SPEED *
                    delta
              )
            );

          /*
           * Collision
           */

          if (
            !isWalkable(
              nextX,
              nextY
            )
          ) {
            return current;
          }

          return {
            x: nextX,
            y: nextY,
          };
        });
      }

      animationFrame.current =
        requestAnimationFrame(
          update
        );
    };

    animationFrame.current =
      requestAnimationFrame(
        update
      );

    return () => {
      if (
        animationFrame.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }
    };
  }, []);

  /*
   * =========================
   * CAMERA
   * =========================
   */

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

  /*
   * =========================
   * SPRITE
   * =========================
   */

  const directionRow =
    getDirectionRow(direction);

  /*
   * =========================
   * RENDER
   * =========================
   */

  return (
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


        {/* MAP */}

        <img
          src="/viking-map2.png"
          className="mjolnir-world-map-image"
          draggable={false}
          alt=""
        />

        {/* VIKING LOCATIONS */}

        {VIKING_LOCATIONS.map(
          (location) => (
            <div
              key={location.id}
              className="mjolnir-location"
              style={{
                left: location.x,
                top: location.y,
              }}
            >
              <div className="mjolnir-location-marker">
                {location.rune}
              </div>

              <div className="mjolnir-location-name">
                {location.name}
              </div>
            </div>
          )
        )}

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
            className={`mjolnir-wanderer ${
              walking
                ? "walking"
                : ""
            }`}
            style={{
              backgroundPositionY:
                `-${
                  directionRow *
                  PLAYER_SIZE
                }px`,
            }}
          />
        </div>
      </div>



      {/* CONTROLS */}

      {showControls && (
        <div className="mjolnir-controls">
          <div className="mjolnir-controls-title">
            WANDERER
          </div>

          <div>
            <kbd>W</kbd>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd>
          </div>

          <span>
            Explore the world
          </span>
        </div>
      )}

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
  );
}