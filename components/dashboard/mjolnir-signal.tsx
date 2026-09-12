import { MjolnirEnergyWaveform } from "./mjolnirSignal/mjolnir-energy-waveform";


type Props = {
  strength: number;
};

export function MjolnirSignal({ strength }: Props) {

  return (
    <div className="pointer-events-none absolute left-1/2 top-5 z-10">
      <div className="w-[300px]">
  
          <MjolnirEnergyWaveform strength={strength} />
      </div>
    </div>
  );
}