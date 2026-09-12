export function DashboardHeader() {
  return (
    <div
      className="
        relative
        overflow-hidden
        px-4
        py-3

      "
    >
 

      <div className="relative z-10">
            <h1
        className="
          text-xl
          tracking-[0.12em]
          text-neutral-300
        "
        style={{ fontFamily: "var(--font-norse)" }}
      >
        <span className="text-sky-400/90">MJÖLNIR</span>{" "}
        <span className="text-neutral-300">DETECTOR</span>
      </h1>

      
      </div>
    </div>
  );
}