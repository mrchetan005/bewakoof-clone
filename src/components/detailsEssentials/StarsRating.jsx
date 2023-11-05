/* eslint-disable react/prop-types */

import { memo, useState } from "react";

const StarsRating = ({ rating, setRating, numOfStars = 5 }) => {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="starRating flex my-1">
            {
                [...Array(numOfStars)].map((_, i) => (
                    <button key={i} className="star active:animate-ping bounce pr-2"
                        onClick={() => { setRating(i + 1) }}
                        onMouseEnter={() => { setHovered(i + 1) }}
                        onMouseLeave={() => { setHovered(rating) }}
                    >
                        <img className={`${i < (hovered || rating) ? 'drop-shadow-sm' : 'grayscale'} w-8 h-8 md:w-10 md:h-10 saturate-150 object-contain`} src={`/assets/images/productDetails/stars/${(rating !== i + 1 || hovered && hovered !== rating) ? 0 : rating}.webp`} alt="" />
                    </button>
                ))
            }
        </div>
    )
}

export default memo(StarsRating);