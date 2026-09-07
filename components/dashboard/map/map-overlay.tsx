
import { Radar } from "./radar";
import { Result } from "./result";
import { ScanStatus } from "@/app/types/scan.status";
import { DetectionResult } from "@/app/types/detector.result";
import { ScanAreaType } from "@/app/types/scan.area";

type Props = {
  scanStatus: ScanStatus;
  scan: (scanArea: ScanAreaType) => void;
  result: DetectionResult | null;
  scanArea: ScanAreaType;
};


export function MapOverlay({scanStatus,scan,result}:Props) {

    return(
         <div className="pointer-events-none absolute inset-0 z-[1000]">

              <Radar scanStatus={scanStatus} />
        
              
        
              <Result result={result} />

              </div>

    )

}