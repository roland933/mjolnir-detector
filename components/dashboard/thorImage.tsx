import { useDetectorContext } from "@/app/context/detector-context";
import { getThorMood } from "@/app/helpers/thorMood";
import { EndingState } from "@/app/types/ending.type";

type Props = {
className?:string,
endingState?: EndingState
}

export function ThorImage({ className, endingState }: Props) {
  const { result, scanStatus } = useDetectorContext();
  const mood = getThorMood(result, scanStatus, endingState);

  return (
    <>
<img
  src={mood.image}
  alt="Thor"
  className={`
    absolute inset-0
    h-full w-full
    object-cover
    object-[50%_15%]
    ${className}
  `}
/>

<div className="absolute inset-0 bg-neutral-950/30 mix-blend-color" />

<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neutral-950/90" />
<div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
    </>
  );
}