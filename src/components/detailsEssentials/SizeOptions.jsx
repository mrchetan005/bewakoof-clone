/* eslint-disable react/prop-types */

import { memo } from "react";
import { sizes } from "../../constants";

const SizeOptions = ({ size: availableSize, selectedSize, setSelectedSize }) => {

    const handleSelected = (e, i, includedSize) => {
        e?.stopPropagation && e.stopPropagation();
        if (!includedSize) return;
        setSelectedSize(i);
    }
    return (
        <>
            <div className="scrollSize flex whitespace-nowrap overflow-x-auto">
                {
                    sizes?.map(({ size }, i) => {
                        const includedSize = availableSize?.includes(size);
                        return (
                            <div key={i} onClick={(e) => handleSelected(e, i, includedSize)} className={`testSizeBlock text-sm cursor-pointer rounded-md w-12 h-12 mr-3 mb-3 px-5 border flex items-center justify-center ${availableSize.includes(size) ? 'hover:border-[#42a2a2]' : 'opacity-30 !cursor-no-drop'} ${selectedSize === i ? 'text-white bg-black border-[#42a2a2] shadow' : 'text-black border-black'}`}>
                                {size}
                            </div>
                        )
                    })
                }
            </div>
            {
                selectedSize !== null &&
                <div className="garmentDetails text-xs flex flex-wrap font-medium">
                    <p className="w-full md:w-max">Garment: </p>
                    <div className="specification flex border-[#0000005a] md:border-r px-2">
                        <p className="specificationName text-[#878787] mr-1">Chest (in Inch):</p>
                        <p className="text-black">{sizes[selectedSize]?.chest}</p>
                    </div>
                    <div className="specification flex border-[#0000005a] md:border-r px-2">
                        <p className="specificationName text-[#878787] mr-1">Front Length (in Inch):</p>
                        <p className="text-black">{sizes[selectedSize]?.frontLength}</p>
                    </div>
                    <div className="specification flex border-[#0000005a] md:border-r px-2">
                        <p className="specificationName text-[#878787] mr-1">Sleeve Length (in Inch):</p>
                        <p className="text-black">{sizes[selectedSize]?.sleeveLength}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default memo(SizeOptions);