export function ThorStatus() {

    return (
             <div
          className="
            absolute
            right-3
            top-3
            z-20
            flex
            items-center
            gap-1
            text-xs
            text-emerald-400
          "
          style={{ fontFamily: "var(--font-norse)" }}
        >
          <img
            src="/icons/online.png"
            alt=""
            className="h-5 w-5 animate-pulse"
          />

          ONLINE
        </div>
    )
}