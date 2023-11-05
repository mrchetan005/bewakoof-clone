
import Portal from "../Portal"


const GifLoader = () => {
    const onClose = () => { };
    return (
        <Portal onClose={onClose}>
            <div className="flex w-full h-full backdrop-brightness-[0.99] pointer-events-none items-center justify-center">
                <div className="w-20 h-16 md:w-32 md:h-28 rounded-xl md:scale-150 flex shadow-md items-center justify-center bg-white">
                    <img className="pt-2 h-full object-cover contrast-125 saturate-150 " src="/assets/loader/bwkf-loading.gif" alt="" />
                </div>
            </div>
        </Portal>
    )
}

export default GifLoader
