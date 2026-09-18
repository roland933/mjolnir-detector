export function Background() {

    return (
      <>
     <div
    className="
      fixed inset-0
      bg-[url('/background.png')]
      bg-cover
      bg-center
      
      pointer-events-none
     
    "
  />

  <div className="pointer-events-none absolute inset-0 bg-[#05080b]/65 backdrop-blur-[2px]" />
  </>
    )
}