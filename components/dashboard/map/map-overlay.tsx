import { TopBar } from "./top-bar";
import { Radar } from "./radar";
import { Result } from "./result";
import { BottomInformation } from "./bottom-information";
import { DetectionPoint } from "./detection-point";
import { ScanArea } from "./scan-area";
import { ScanStatus } from "@/app/types/scan.status";
import { DetectionResult } from "@/app/types/detector.result";
import { ScanAreaType } from "@/app/types/scan.area";

type Props = {
  scanStatus: ScanStatus;
  scan: (scanArea: ScanAreaType) => void;
  result: DetectionResult | null;
  scanArea: ScanAreaType;
  setScanArea: React.Dispatch<React.SetStateAction<ScanAreaType>>;
};


export function MapOverlay({scanStatus,scan,result,scanArea,setScanArea}:Props) {

    return(
         <div className="absolute inset-0 z-10">

          <TopBar />
        
              <ScanArea
                scanArea={scanArea}
                onRadiusChange={(radius) =>
                  setScanArea((current) => ({
                    ...current,
                    radius,
                  }))
                }
              />
        
              <Radar scanStatus={scanStatus} />
        
              <DetectionPoint result={result} />
        
              <Result result={result} />
        
              <BottomInformation scanStatus={scanStatus} onClick={scan} radius={scanArea.radius} />

              </div>

    )

}