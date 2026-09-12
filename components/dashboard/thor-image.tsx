import type { ThorMood } from "@/app/types/thor.mood"

type Props = {
    mood: ThorMood
}
export function ThorImage({mood}:Props) {
   

    return (
        <>
              <img
                src={image}
                alt="Thor"
                className="absolute inset-0 h-full w-full object-cover object-[50%_15%]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </>
    )

}