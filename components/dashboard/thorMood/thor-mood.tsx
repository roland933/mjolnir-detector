"use client";

import { useDetectorContext } from "@/app/context/detector-context";
import { getThorMood } from "@/app/helpers/thorMood";
import { ThorImage } from "../thorImage";
import { ThorStatus } from "./thor-status";



export function ThorMood() {
  const { result,scanStatus } = useDetectorContext();

  const mood = getThorMood(result,scanStatus);

  return (
    <section className="relative overflow-hidden ">
      <div className="relative h-64 overflow-hidden bg-neutral-950">

        <ThorImage />

        <ThorStatus />

        {/* Mood */}
        <div className="absolute bottom-3 left-3 z-20">
          <div className="flex items-center">
            
            <span
              className="text-lg font-semibold uppercase tracking-wider text-neutral-300"
              style={{ fontFamily: "var(--font-norse)" }}
            >
              {mood.label}
            </span>
          </div>

          <p className="mt-1 text-md italic text-neutral-400">
            "{mood.message}"
          </p>
        </div>

      </div>
    </section>
  );
}