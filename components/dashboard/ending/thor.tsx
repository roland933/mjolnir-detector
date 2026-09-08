import { EndingState } from "@/components/dialogs/ending-modal"

type Props = {
    endingState: EndingState
}

export function Thor({endingState}:Props) {

    const image = {
        "angry": "/angry-thor.png", 
        "choice": "/thor.png",
        "return": "/pleased-thor.png"
    }[endingState]

    return (
        <div className="relative min-h-[400px] overflow-hidden">
              <img
                src={image}
                alt="Thor"
                className="absolute inset-0 h-full w-full object-cover object-[50%_15%]"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
    )
}