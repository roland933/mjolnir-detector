import { useEffect, useRef } from "react";

export function useCollisionMask(MAP_WIDTH:number,MAP_HEIGHT:number) {
  const collisionData = useRef<Uint8ClampedArray | null>(null);
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

}