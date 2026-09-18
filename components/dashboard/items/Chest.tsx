type Props = {
    isDiscovered:boolean;
}
export function Chest({isDiscovered}:Props) {
    const imageSrc =  isDiscovered ? "/items/chest_open.png" : "/items/chest.png"
    return (
                <img
          src={imageSrc}
          alt=""
          className={`
            h-10
            w-10
            object-contain
            transition-all
            duration-500
          `}
        />
    )
}