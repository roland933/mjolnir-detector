export function DarkVignette() {
    return (
              <div
        className="
          pointer-events-none
          absolute inset-0
          z-[501]
        "
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    )
}