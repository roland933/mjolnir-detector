"use client";

import { ItemLootType } from "@/app/data/world.item";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


type RelicsModalProps = {
  relic: ItemLootType | null;
  onClose: () => void;
};

export function RelicsModal({
  relic,
  onClose,
}: RelicsModalProps) {
  return (
    <Dialog
      open={!!relic}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="border-[#756344] bg-[#171817] text-[#d8d0bd]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-[#d8d0bd]">
            Relic Discovered
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          <div className="text-lg">
            {relic?.loot}
          </div>

          <p className="text-center text-sm text-[#9f998a]">
            An ancient relic has been discovered.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}