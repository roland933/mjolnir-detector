export function RuneProgress({discoveredRunes}) {
    return (
        <>
      <div className="mt-5 flex justify-center gap-4">
              {[0, 1, 2,3].map((rune) => {
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
                      ${discovered
                        ? "border-[#c39a5a] bg-[#c39a5a]/10 shadow-[0_0_12px_rgba(195,154,90,0.18)]"
                        : "border-[#6f604c]/35 bg-black/20"
                      }
                    `}
                  >
                    <span
                      className={`
                        -rotate-45
                        text-lg
                        ${discovered
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
            </>
    )
}