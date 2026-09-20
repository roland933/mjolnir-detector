import { WorldItem } from "@/app/data/world.item";

type Props = {
    isDiscovered:boolean;
    item:WorldItem;
}
export function Relics({isDiscovered,item}:Props) {

    const img  = isDiscovered ? item.image?.active : item.image?.default
   
    return (
                <img
          src={img}
          alt=""
          className={`
            h-20
            w-20
            object-contain
            transition-all
            duration-500
             
                

            ${
              isDiscovered
                ? `
                 drop-shadow-[0_0_8px_rgba(195,154,90,0.7)]
                `
                : `
                  brightness-[0.6]
                 
                  drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)]
                `
            }
          `}
        />
    )
}