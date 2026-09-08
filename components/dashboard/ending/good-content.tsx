"use client";

export function GoodContent() {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-8">
        <p
          style={{ fontFamily: "var(--font-norse)" }}
          className="text-sm tracking-[0.3em] text-sky-400"
        >
          WORTHY MORTAL
        </p>

        <h2
          style={{ fontFamily: "var(--font-norse)" }}
          className="mt-2 text-4xl tracking-wider text-slate-100"
        >
          THANK YOU
        </h2>
      </div>

      <div className="space-y-4">
        <p className="text-lg leading-relaxed text-slate-300">
          You returned Mjölnir to its rightful owner.
        </p>

        <p className="text-xl italic leading-relaxed text-slate-400">
          "Thank you, little mortal."
        </p>

        <p className="text-xl italic leading-relaxed text-slate-400">
          "Here... this is yours."
        </p>
      </div>

      {/* Gift */}
      <div
        className="
          group relative mt-10 overflow-hidden rounded-xl
          border border-sky-500/30
          bg-slate-950/70
          p-6
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[url('/card-texture.png')]
            bg-cover bg-center
            opacity-10
          "
        />

        <div className="relative z-10 flex items-center gap-5">
          <div
            className="
              flex h-30 w-30 shrink-0 items-center justify-center
              rounded-lg
              border border-sky-400/30
              bg-sky-500/5
              shadow-[0_0_20px_rgba(56,189,248,0.08)]
            "
          >
           <img src="/potion.png" className="h-25 w-25" />
          </div>

          <div>
            <p
              style={{ fontFamily: "var(--font-norse)" }}
              className="text-2xl tracking-wider text-sky-400"
            >
              NEW LIFE POTION
            </p>

            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-500">
              A gift from Asgard
            </p>

            <p className="mt-3 text-md leading-relaxed text-slate-400">
              Restores what was lost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}