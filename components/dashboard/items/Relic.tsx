type Props = {
    isDiscovered:boolean;
}
export function Relic({isDiscovered}:Props) {
    const imageSrc =  isDiscovered ? "/items/mjolnir.png" : "/items/unkown.png"
    return (
                <img
          src={imageSrc}
          alt=""
          className={`
            h-20
            w-20
            object-contain
            transition-all
            duration-500
          `}
        />
    )
}