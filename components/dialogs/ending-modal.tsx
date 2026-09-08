"use client";


import { X } from "lucide-react";
import { NorsePanel } from "../dashboard/norse-panel";
type EndingChoice = "return" | "keep";
type Props = {
  open: boolean;
  onClose: () => void;
   onChoice: (choice: EndingChoice) => void;
};



export function EndingModal({ open, onClose }: Props) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-md">
        
      <div className="relative w-full max-w-5xl">
        <NorsePanel  className="overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 text-slate-500 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid min-h-[600px] lg:grid-cols-2">
            {/* Thor */}
            <div className="relative min-h-[400px] overflow-hidden">
              <img
                src="/thor.png"
                alt="Thor"
                className="absolute inset-0 h-full w-full object-cover object-[50%_15%]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-center p-8 lg:p-12">
              <p
                style={{ fontFamily: "var(--font-norse)" }}
                className="text-3xl tracking-wider text-sky-400"
              >
                MJÖLNIR FOUND
              </p>

              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                Asgardian relic confirmed
              </p>

              <div className="mt-10">
                <p className="text-2xl font-semibold leading-relaxed text-slate-300">
                  "YESS!! You found my hammer,
                  <br />
                  little mortal!"
                </p>

                <p className="mt-3 text-lg italic text-slate-400">
                  Give me back.
                </p>
              </div>

            <div className="mt-10 space-y-3">
  {/* Return Mjölnir */}
  <button
    type="button"
    className="
    cursor-pointer
      group relative overflow-hidden rounded-lg
      border border-sky-500/40
      w-full
      bg-slate-950/80
      p-4
      text-left
      transition
      hover:border-sky-400
      hover:bg-sky-500/10
    "
  >
    {/* Texture */}
    <div
      className="
        pointer-events-none absolute inset-0
        bg-[url('/card-texture.png')]
        bg-cover bg-center
        opacity-20
      "
    />

    {/* Content */}
    <div className="relative z-10 flex items-center gap-4">
      <img
        src="/icons/return-mjolnir.png"
        alt=""
        className="h-14 w-14 object-contain opacity-90 transition group-hover:scale-105"
      />

      <div>
        <p
          style={{ fontFamily: "var(--font-norse)" }}
          className="text-2xl tracking-wider text-sky-400"
        >
          RETURN MJÖLNIR
        </p>

        <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-500">
          To Thor
        </p>
      </div>
    </div>
  </button>

  {/* Keep Mjölnir */}
  <button
    type="button"
    className="
    w-full
     cursor-pointer
      group relative overflow-hidden rounded-lg
      border border-red-500/40
      bg-slate-950/80
      
      p-4
      text-left
      transition
      hover:border-red-400
      hover:bg-red-500/10
    "
  >
    {/* Texture */}
    <div
      className="
        pointer-events-none absolute inset-0
        bg-[url('/card-texture.png')]
        bg-cover bg-center
        opacity-20
      "
    />

    {/* Content */}
    <div className="relative z-10 flex items-center gap-4">
      <img
        src="/icons/keep-mjolnir.png"
        alt=""
        className="h-14 w-14 object-contain opacity-90 transition group-hover:scale-105"
      />

      <div>
        <p
          style={{ fontFamily: "var(--font-norse)" }}
          className="text-2xl tracking-wider text-red-400"
        >
          KEEP IT
        </p>

        <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-500">
          For myself...
        </p>
      </div>
    </div>
  </button>
</div>
            </div>
          </div>
        </NorsePanel>
      </div>
    </div>
  );
}