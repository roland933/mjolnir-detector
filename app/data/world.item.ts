export type WorldItemType =
  | "rune"
  | "scroll"
  | "chest"
  | "mjolnir"
  | "relics"

export type WorldItem = {
  id: string;
  type: WorldItemType;
  x: number;
  y: number;
  name?:string;
  image?:{default:string,active:string}
};

export type LootType =
  | "Megingjord"
  | "Jarngreipr"
  | "ThorsMantle";

export type ItemLootType = {
  id:string,
  loot:LootType,
}

export const ITEM_LOOT:ItemLootType[] = [
  {
    id: "chest-1",
    loot:"Megingjord"
  },

  {
    id: "chest-2",
    loot:"ThorsMantle"
  },

   {
    id: "chest-3",
    loot:"Jarngreipr"
  }

]



export const WORLD_ITEMS: WorldItem[] = [
  // Runes
  {
    id: "rune-1",
    type: "rune",
    x: 255,
    y: 395,
    image:{
      default: "/items/runes/fenrir/fenrir.png",
      active: "/items/runes/fenrir/active.png"
    },
    name: "Fenrir Rune",
  },
  {
    id: "rune-2",
    type: "rune",
    x: 705,
    y: 175,
    name: "Odin Rune",
     image:{
      default: "/items/runes/odin/odin.png",
      active: "/items/runes/odin/active.png"
    },
  },
  {
    id: "rune-3",
    type: "rune",
    x: 1045,
    y: 135,
     name: "Thor Rune",
      image:{
      default: "/items/runes/thor/thor.png",
      active: "/items/runes/thor/active.png"
    },
  },
  {
    id: "rune-4",
    type: "rune",
    x: 755,
    y: 465,
    name: "Hel Rune",
      image:{
      default: "/items/runes/hel/hel.png",
      active: "/items/runes/hel/active.png"
    },
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
   
     x: 833,
    y: 755,
  },

  {
    id: "scroll-4",
    type: "scroll",
   
     x: 562,
    y: 340,
  },

  {
    id: "relics-1",
    type: "relics",
    name:"Járngreipr",
     image:{
      default: "/items/relics/jarngreipr/default.png",
      active: "/items/relics/jarngreipr/active.png"
    },
    x: 875,
    y: 80,
  },
  {
    id: "relics-2",
    type: "relics",
    name:"Megingjörð",
     image:{
      default: "/items/relics/megingjoro/default.png",
      active: "/items/relics/megingjoro/active.png"
    },
    x: 1305,
    y: 655,
  },

  {
    id: "relics-3",
    type: "relics",
    name:"Thor's mantle",
     image:{
      default: "/items/relics/cloak/default.png",
      active: "/items/relics/cloak/active.png"
    },
     x: 334,
    y: 95,
   
  },

  
  {
    id: "mjolnir",
    type: "mjolnir",
    x: 1320,
    y: 300,
  },
];