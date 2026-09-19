type Props = {
    isDiscovered:boolean;
}
export function Scroll({isDiscovered}:Props) {
    return (

        <>
            {!isDiscovered && (
                            <img
            src="/items/scroll.png"
            alt=""
            className={`
                h-8
                w-8
                object-contain
                transition-all
                duration-500
                

            
            `}
            />


            )}

        </>
    
    )
}