export function PlayerMessage({message}) {
  return (  
    <>
           {message && (
  <div
    className="
      absolute
      left-1/2
      bottom-full
      mb-3
      -translate-x-1/2
      w-56
      rounded-md
      border
      border-[#756344]
      bg-[#171817]/95
      px-4
      py-3
      text-center
      text-sm
      leading-relaxed
      text-[#d8d0bd]
      shadow-[0_4px_12px_rgba(0,0,0,0.65)]
    "
  >
    <p>{message}</p>

    <div
      className="
        absolute
        left-1/2
        top-full
        -translate-x-1/2
        border-x-[7px]
        border-t-[7px]
        border-x-transparent
        border-t-[#756344]
      "
    />
  </div>
)}
    </>

  )

}