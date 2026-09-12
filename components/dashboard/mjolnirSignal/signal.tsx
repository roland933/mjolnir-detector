type Props = {
    strength:number,
    intensity:number,
}

export function Signal({strength,intensity}:Props) {

    return (
         <div className="relative h-10 overflow-hidden">
  <div
    className="absolute inset-0 flex items-center"
    style={{
      opacity: 0.3 + intensity * 0.55,
    }}
  >
    {Array.from({ length: 24 }).map((_, index) => {
      const distance = Math.abs(index - 11.5);

      const baseHeight =
        6 + Math.max(0, 1 - distance / 12) * 8;

      const height =
        baseHeight +
        intensity * (18 + Math.sin(index * 1.7) * 14);

      return (
        <span
          key={index}
          className="mx-[2px] w-[3px] rounded-full transition-all duration-500"
          style={{
            height: `${Math.max(5, height)}px`,
            backgroundColor:
              strength > 70
                ? "#fbbf24"
                : strength > 30
                  ? "#38bdf8"
                  : "#9ca3af",
                    boxShadow:
            strength > 50
                ? `0 0 ${2 + intensity * 5}px currentColor`
                : "none",
          }}
        />
      );
    })}
  </div>
</div>
    )

}