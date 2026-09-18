export type WorldItemType =
  | "rune"
  | "scroll"
  | "chest"
  | "mjolnir";

export type WorldItem = {
  id: string;
  type: WorldItemType;
  x: number;
  y: number;
};

export const WORLD_ITEMS: WorldItem[] = [
  // Runes
  {
    id: "rune-1",
    type: "rune",
    x: 255,
    y: 395,
  },
  {
    id: "rune-2",
    type: "rune",
    x: 705,
    y: 175,
  },
  {
    id: "rune-3",
    type: "rune",
    x: 1045,
    y: 135,
  },
  {
    id: "rune-4",
    type: "rune",
    x: 755,
    y: 465,
  },

  // Scrolls
  {
    id: "scroll-1",
    type: "scroll",
    x: 445,
    y: 580,
  },
  {
    id: "scroll-2",
    type: "scroll",
   
     x: 633,
    y: 110,
  },

  {
    id: "scroll-4",
    type: "scroll",
    x: 1325,
    y: 655,
  },

  // Chests
  {
    id: "chest-1",
    type: "chest",
    x: 890,
    y: 100,
  },
  {
    id: "chest-2",
    type: "chest",
    x: 562,
    y: 327,
  },

  {
    id: "chest-4",
    type: "chest",
     x: 334,
    y: 95,
   
  },

  // Mjölnir
  {
    id: "mjolnir",
    type: "mjolnir",
    x: 1320,
    y: 300,
  },
];