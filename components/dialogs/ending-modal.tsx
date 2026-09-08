"use client";


import { X } from "lucide-react";
import { NorsePanel } from "../dashboard/norse-panel";
import { useEffect, useState } from "react";
import { AngryContent } from "../dashboard/ending/angry-content";
import { ChoiceContent } from "../dashboard/ending/choice";
import { Thor } from "../dashboard/ending/thor";
import { toast } from "@/components/ui/toast"
import { GoodContent } from "../dashboard/ending/good-content";


type EndingChoice = "return" | "keep";

export type EndingState = "choice" | "angry" | "return";


type Props = {
  open: boolean;
  onClose: () => void;
  onChoice: (choice: EndingChoice) => void;
};

export function EndingModal({ open, onClose, onChoice }: Props) {


  const [endingState, setEndingState] = useState<EndingState>("choice");

  const handleReturnChoice = () => {
    setEndingState("return");
    onChoice("return")
  }

  const handleKeepChoice = () => {
    setEndingState("angry");
    onChoice("keep");
  }

useEffect(() => {
  
  if (endingState !== "angry" && endingState !== "return") {
    return;
  }

  const timeout = setTimeout(() => {
    onClose();

    toast.add({
      title:
        endingState === "angry"
          ? "THOR CONNECTION OFFLINE"
          : "GIFT RECEIVED — NEW LIFE POTION",
    });
  }, 5000);

  return () => clearTimeout(timeout);
}, [endingState]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-md">

      <div className="relative w-full max-w-5xl">


        <NorsePanel className="overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 text-slate-500 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid min-h-[600px] lg:grid-cols-2">

            <Thor endingState={endingState}/>

            <div className="relative flex flex-col justify-center p-8 lg:p-12">
              {endingState === "choice" ? (
  <>
    <ChoiceContent />

    <div className="mt-10 space-y-3">
      {/* Return Mjölnir */}
      <button
        type="button"
        onClick={handleReturnChoice}
        className="
          group relative w-full cursor-pointer overflow-hidden rounded-lg
          border border-sky-500/40
          bg-slate-950/80
          p-4 text-left
          transition
          hover:border-sky-400
          hover:bg-sky-500/10
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[url('/card-texture.png')]
            bg-cover bg-center
            opacity-20
          "
        />

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
        onClick={handleKeepChoice}
        className="
          group relative w-full cursor-pointer overflow-hidden rounded-lg
          border border-red-500/40
          bg-slate-950/80
          p-4 text-left
          transition
          hover:border-red-400
          hover:bg-red-500/10
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[url('/card-texture.png')]
            bg-cover bg-center
            opacity-20
          "
        />

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
  </>
) : endingState === "angry" ? (
  <AngryContent />
) : (
  <GoodContent />
)}
            </div>





          </div>
        </NorsePanel>
      </div>
    </div>
  );
}