type Props = {
    isDiscovered:boolean;
}
export function Rune({isDiscovered}:Props) {
    return (
                <img
          src="/items/rune.png"
          alt=""
          className={`
            h-16
            w-16
            object-contain
            transition-all
            duration-500

            ${
              isDiscovered
                ? `
                  drop-shadow-[0_0_8px_rgba(195,154,90,0.7)]
                  drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]
                `
                : `
                  brightness-[0.45]
                  saturate-[0.6]
                  drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]
                `
            }
          `}
        />
    )
}