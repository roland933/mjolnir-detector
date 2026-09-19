import { create } from "zustand";

type GameState = {
  discoveredRunes: string[];
  discoveredScrolls: string[];
  discoveredArtifacts: string[];
  discoveredChests: string[];
  collectedRelics: string[];

  addRune: (id: string) => void;
  addScroll: (id: string) => void;
  addArtifact: (id: string) => void;
  addChest: (id: string) => void;
  addRelic: (id: string) => void;
};

export const useGameStore = create<GameState>((set) => ({
  discoveredRunes: [],
  discoveredScrolls: [],
  discoveredArtifacts: [],
  discoveredChests: [],
  collectedRelics: [],

  addRune: (id) =>
    set((state) => ({
      discoveredRunes: [...state.discoveredRunes, id],
    })),

  addScroll: (id) =>
    set((state) => ({
      discoveredScrolls: [...state.discoveredScrolls, id],
    })),

  addArtifact: (id) =>
    set((state) => ({
      discoveredArtifacts: [...state.discoveredArtifacts, id],
    })),

  addChest: (id) =>
    set((state) => ({
      discoveredChests: [...state.discoveredChests, id],
    })),

  addRelic: (id) =>
    set((state) => ({
      collectedRelics: [...state.collectedRelics, id],
    })),
}));