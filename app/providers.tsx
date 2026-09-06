"use client";

import { ReactNode } from "react";
import { DetectorProvider } from "./context/detector-context";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <DetectorProvider>
      {children}
    </DetectorProvider>
  );
}