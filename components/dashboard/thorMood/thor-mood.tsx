"use client";

import { useDetectorContext } from "@/app/context/detector-context";
import { getThorMood } from "@/app/helpers/thorMood";

export function ThorMood() {
  const { result } = useDetectorContext();

  const mood = getThorMood(result);

  return (
    <section className="relative overflow-hidden ">
      <div className="relative h-64 overflow-hidden bg-neutral-950">

        {/* Thor image */}
        <img
          src={mood.image}
          alt="Thor"
          className="absolute inset-0 h-full w-full object-cover object-[50%_15%]"
        />

        {/* Dark gradient */}
        <div
          className="
            pointer-events-none
            absolute inset-x-0 bottom-0
            z-10
            h-32
            bg-gradient-to-t
            from-neutral-950
            via-neutral-950/70
            to-transparent
          "
        />

        {/* Online */}
        <div
          className="
            absolute
            right-3
            top-3
            z-20
            flex
            items-center
            gap-1
            text-xs
            text-emerald-400
          "
          style={{ fontFamily: "var(--font-norse)" }}
        >
          <img
            src="/icons/online.png"
            alt=""
            className="h-5 w-5 animate-pulse"
          />

          ONLINE
        </div>

        {/* Mood */}
        <div className="absolute bottom-3 left-4 z-20">
          <div className="flex items-center gap-1">
            

            <span
              className="text-lg font-semibold uppercase tracking-wider text-neutral-300"
              style={{ fontFamily: "var(--font-norse)" }}
            >
              {mood.label}
            </span>
          </div>

          <p className="mt-1 text-sm italic text-neutral-400">
            "{mood.message}"
          </p>
        </div>

      </div>
    </section>
  );
}