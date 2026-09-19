type Props = {
    isDiscovered:boolean;
}
export function Relic({isDiscovered}:Props) {
    const imageSrc =   "/items/mjolnir.png"
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