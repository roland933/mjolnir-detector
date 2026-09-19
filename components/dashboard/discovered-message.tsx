type Props = {
  discoveryMessage:string | null,
}

export function DiscoveredMessage({discoveryMessage}:Props) {
    return (
        <>
                {discoveryMessage && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-10
              left-1/2
              z-50
              -translate-x-1/2
              border
              border-[#8b6b3f]/30
              bg-black/75
              px-6
              py-3
              text-center
              shadow-[0_4px_20px_rgba(0,0,0,0.5)]
            "
          >
            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#8b6b3f]
              "
            >
              Discovery
            </div>

            <div
              className="
                mt-1
                text-sm
                tracking-[0.08em]
                text-[#d6d0c4]
              "
            >
              {discoveryMessage}
            </div>
          </div>
        
        )}
        
        
        </>


    )
}