import { WorldItemType } from "@/app/data/world.item";
import { ItemType } from "@/app/types/item.type"

type Props = {
    itemType:WorldItemType;
    isNearby:boolean;
    isDiscovered:boolean;
}
export function ItemLabel({itemType,isNearby,isDiscovered}:Props) {
    return (
        <>
                    {isNearby && !isDiscovered && (
          <div
            className="
              absolute
              bottom-full
              left-1/2
              mb-2
              -translate-x-1/2
              whitespace-nowrap
              bg-black/60
              px-2.5
              py-1
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#d6d0c4]
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]
            "
          >
            {labelText({itemType})}
                    
          </div>
        )}
        
        
        </>
    )
}

type LabelTextProps = {
    itemType:WorldItemType
}

function labelText({itemType}:LabelTextProps) {

    switch(itemType) {
        case "relics":
          return "Examine"
        case "rune":
          return "Examine"
        case "scroll":
          return "Collect"
        case "mjolnir": 
            return "Grab"        

    }

}