export function Sweep({heading}) {
    return (
         <div
          className="absolute left-1/2 top-1/2 h-[160px] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full bg-gradient-to-t from-sky-300/90 via-sky-400/50 to-transparent transition-transform duration-300"
          style={{
            transform: `translate(-50%, -100%) rotate(${heading}deg)`,
          }}
        />
    )
}