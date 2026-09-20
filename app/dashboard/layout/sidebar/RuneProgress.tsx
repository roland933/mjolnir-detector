import { DISCOVERY_OBJECTS } from "@/app/data/objectives";

export function RuneProgress({ discoveredRunes }) {
  return (
    <>
      <div className="mt-5 flex justify-center gap-3">
         {DISCOVERY_OBJECTS.runes.map((rune) => {
  const discovered = discoveredRunes.includes(rune.id);

  return (
    <div
      key={rune.id}
      className="flex flex-col items-center"
    >
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          border
          border-[#6f604c]/35
          bg-black/20
        "
      >
        <img
          src={discovered ? rune.image.active : rune.image.default}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>

      <span
        className={`
          mt-2
          text-[9px]
          uppercase
          tracking-[0.15em]
          font-medium
          text-[#c39a5a]
          transition-all
          
          duration-700
          ${
            discovered
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0"
          }
        `}
      >
        {rune.name}
      </span>
    </div>
  );
})}
      </div>

    </>
  );
}