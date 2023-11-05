/* eslint-disable react/prop-types */

import { memo } from "react";


// const colors = ['red', 'blue', 'green'];

const ColorOptions = ({ colors, selectedColor, setSelectedColor }) => {
    return (
        <div className="colorsDiv">
            <div className="colorName text-sm font-bold text-[#333] mb-3 w-max"><label>COLOUR OPTIONS: </label></div>
            <div className={`multiColorDiv flex items-center justify-start`}>
                {
                    colors?.map((color, i) => (
                        <div style={{ backgroundColor: color }} key={i} onClick={() => setSelectedColor(i)} className={`testColorBlock cursor-pointer rounded-lg md:rounded-full w-10 h-10 mr-3 mb-3 border border-[#ebebeb] ${selectedColor === i ? 'activeColor' : ''}`}>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default memo(ColorOptions);