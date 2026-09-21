import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

type InstructionDialogProps = {
  open: boolean;
  onStart: () => void;
};

export function InstructionDialog({
  open,
  onStart,
}: InstructionDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        className="
          max-w-2xl
          overflow-hidden
          border-[#6f604c]/60
          bg-[#0b0d0d]
          p-0
          text-[#c4bba9]
          shadow-2xl
        "
      >
        <div
          className="
            relative
            min-h-[520px]
            overflow-hidden
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              "url('/ending-cavern.png')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />

          <div
            className="
              relative
              z-10
              flex
              min-h-[520px]
              flex-col
              items-center
              justify-center
              px-10
              py-12
              text-center
            "
          >
            <h1
              className="
                font-sans
                text-3xl
                font-semibold
                tracking-[0.18em]
                text-[#d8cfbd]
              "
            >
              THE FORGOTTEN RELIC
            </h1>

            <p
              className="
                mt-6
                max-w-lg
                font-sans
                text-sm
                leading-7
                text-[#aaa394]
              "
            >
              After Ragnarök, Mjölnir was lost.
              Ancient traces now point toward a
              forgotten cavern.
            </p>

            <div className="mt-10 w-full max-w-sm">
              <h2
                className="
                  font-sans
                  text-xs
                  font-semibold
                  tracking-[0.2em]
                  text-[#8f846f]
                "
              >
                CONTROLS
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#6f604c]/20 pb-2">
                  <span>Move</span>
                  <span className="text-[#d8cfbd]">
                    WASD
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#6f604c]/20 pb-2">
                  <span>Examine / Collect</span>
                  <span className="text-[#d8cfbd]">
                    E
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onStart}
              className="
                mt-12
                border
                border-[#8f846f]
                bg-black/40
                px-8
                py-3
                font-sans
                text-xs
                font-semibold
                tracking-[0.2em]
                text-[#d8cfbd]
                transition
                hover:bg-[#8f846f]/15
                cursor-pointer
              "
            >
              START GAME
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}