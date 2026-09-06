"use client";

import { createContext, ReactNode, useContext } from "react";
import { useDetector } from "@/app/hooks/useDetector";

type DetectorContextType = ReturnType<typeof useDetector>;

export const DetectorContext =
  createContext<DetectorContextType | null>(null);

type Props = {
  children: ReactNode;
};

export function DetectorProvider({ children }: Props) {
    
  const detector = useDetector();

  return (
    <DetectorContext.Provider value={detector}>
      {children}
    </DetectorContext.Provider>
  );
}

export function useDetectorContext() {
  const context = useContext(DetectorContext);

  if (!context) {
    throw new Error(
      "useDetectorContext must be used inside DetectorProvider"
    );
  }

  return context;
}