import { useEffect, useState } from "react";



export function useViewPort(viewportRef) {

      const [viewportSize, setViewportSize] =

        useState({
          width: 1100,
          height: 650,
        });

   

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



          return {viewportSize}

}