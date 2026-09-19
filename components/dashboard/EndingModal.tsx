"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type EndingModalProps = {
  open: boolean;
  onClose: () => void;
};

export function EndingModal({
  open,
  onClose,
}: EndingModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="
          !max-w-6xl
          overflow-hidden
          border-[#756344]
          bg-[#101211]
          p-0
          text-[#d8d0bd]
        "
      >
        <div
          className="
            relative
            min-h-[650px]
            overflow-hidden
            bg-cover
            bg-center
          "
          style={{
            backgroundImage: "url('/ending-cavern.png')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Content */}
          <div className="relative z-10 flex min-h-[650px] flex-col items-center px-8 py-10">
            <h2 className="text-5xl font-semibold tracking-[0.25em] text-[#d8d0bd]">
              MJÖLNIR
            </h2>

            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#a9a292]">
              The lost hammer has been found
            </p>

            {/* Mjölnir */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <img
                src="/items/mjolnir.png"
                alt="Mjölnir"
                className="
                 
                  max-w-[350px]
                  object-contain
                  drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]
                "
              />
            </div>
            <div
  className="
    absolute
    left-1/2
    bottom-60
    z-20
    -translate-x-1/2
    text-center
  "
>
  <p className="text-3xl font-semibold tracking-[0.25em] text-[#d8d0bd]">
    ENTER RAGNARÖK
  </p>

  <p className="mt-3 text-xl text-[#918b7d]">
    The ancient relics have been recovered.
  </p>

  <button
    type="button"
    onClick={onClose}
    className="
      mt-8
      border
      border-[#756344]
      bg-[#171817]/90
      px-12
      py-3
      text-sm
      tracking-[0.25em]
      text-[#d8d0bd]
      transition
      cursor-pointer
      hover:bg-[#756344]/20
    "
  >
    CONTINUE
  </button>
</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}