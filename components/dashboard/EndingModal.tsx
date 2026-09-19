"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="border-[#756344] bg-[#171817] text-[#d8d0bd]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl tracking-[0.2em] text-[#d8d0bd]">
            MJÖLNIR
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-8 text-center">
          <p className="text-lg text-[#b8b09d]">
            The lost hammer has been found.
          </p>

          <p className="text-sm text-[#8f897b]">
            The ancient relics have been recovered.
          </p>

          <div className="pt-4">
            <p className="text-2xl font-semibold tracking-[0.3em] text-[#d8d0bd]">
              ENTER RAGNARÖK
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}