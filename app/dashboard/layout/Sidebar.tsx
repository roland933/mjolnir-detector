export function SideBar() {
  return (
    <aside className="h-full w-[300px] shrink-0">
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          border-r
          border-[#8b6b3f]/25
          bg-[#0b0d0f]/90
          text-[#d6d0c4]
          shadow-[8px_0_30px_rgba(0,0,0,0.35)]
        "
      >
        {/* Subtle Norse texture */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-[url('/card-texture.png')]
            bg-cover
            bg-center
            opacity-[0.025]
            grayscale
          "
        />

        <div className="relative z-10 flex h-full flex-col px-5 py-6">

          {/* Header */}
          <div className="border-b border-[#8b6b3f]/20 pb-5">
            <div className="text-center">
              <h1
                className="
                  text-[24px]
                  font-semibold
                  tracking-[0.16em]
                  text-[#d8d1c4]
                "
              >
                MJÖLNIR
              </h1>

              <p
                className="
                  mt-1
                  text-[9px]
                  uppercase
                  tracking-[0.4em]
                  text-[#8b6b3f]
                "
              >
                The Lost Hammer
              </p>
            </div>
          </div>

          {/* Objective */}
          <section className="mt-6">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#8b6b3f]/25" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#a58a62]
                "
              >
                Objective
              </span>

              <span className="h-px flex-1 bg-[#8b6b3f]/25" />
            </div>

            <p className="mt-4 text-center text-[13px] leading-5 text-[#aaa398]">
              Find the three ancient runes
              <br />
              to unlock Mjölnir.
            </p>

            {/* Rune progress */}
            <div className="mt-5 flex justify-center gap-4">
              {[0, 1, 2].map((rune) => {
                const discovered = rune < 0;

                return (
                  <div
                    key={rune}
                    className={`
                      flex
                      h-12
                      w-12
                      rotate-45
                      items-center
                      justify-center
                      border
                      ${
                        discovered
                          ? "border-[#c39a5a] bg-[#c39a5a]/10 shadow-[0_0_12px_rgba(195,154,90,0.18)]"
                          : "border-[#6f604c]/35 bg-black/20"
                      }
                    `}
                  >
                    <span
                      className={`
                        -rotate-45
                        text-lg
                        ${
                          discovered
                            ? "text-[#c39a5a]"
                            : "text-[#5c554c]"
                        }
                      `}
                    >
                      ᚱ
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <span className="text-[11px] tracking-[0.3em] text-[#81796d]">
                0 / 3
              </span>
            </div>
          </section>

          {/* Discoveries */}
          <section className="mt-7">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#8b6b3f]/25" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#a58a62]
                "
              >
                Discoveries
              </span>

              <span className="h-px flex-1 bg-[#8b6b3f]/25" />
            </div>

            <div className="mt-3 divide-y divide-[#8b6b3f]/10">
              <DiscoveryRow
                icon="ᚱ"
                label="Runes"
                value="0 / 3"
              />

              <DiscoveryRow
                icon="▤"
                label="Scrolls"
                value="0 / 5"
              />

              <DiscoveryRow
                icon="◇"
                label="Artifacts"
                value="0 / 4"
              />
            </div>
          </section>

          {/* Journal */}
          <section className="mt-7">
            <div className="flex items-center gap-3">
              <span className="h-px flex-1 bg-[#8b6b3f]/25" />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#a58a62]
                "
              >
                Journal
              </span>

              <span className="h-px flex-1 bg-[#8b6b3f]/25" />
            </div>

            <div
              className="
                mt-4
                border
                border-[#8b6b3f]/15
                bg-black/15
                px-4
                py-4
              "
            >
              <p
                className="
                  text-[12px]
                  italic
                  leading-5
                  text-[#898278]
                "
              >
                “Ancient things still sleep
                beneath the stone. The path
                reveals itself to those
                who explore.”
              </p>
            </div>
          </section>

          {/* Bottom */}
          <div className="mt-auto pt-6">
            <div className="h-px bg-[#8b6b3f]/20" />

            <p
              className="
                mt-4
                text-center
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#625b51]
              "
            >
              Explore · Discover · Unlock
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function DiscoveryRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center py-3">
      <span className="w-8 text-center text-lg text-[#9a805b]">
        {icon}
      </span>

      <span className="flex-1 text-[12px] text-[#9a9388]">
        {label}
      </span>

      <span className="text-[10px] tracking-[0.15em] text-[#6f695f]">
        {value}
      </span>
    </div>
  );
}