export function NordicTexture() {
    return(
         <div
        className="
    pointer-events-none
    absolute inset-0
    z-[500]
    opacity-10
  "
        style={{
          backgroundImage: "url('/maps/texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    )
}