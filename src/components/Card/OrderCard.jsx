/* eslint-disable react/prop-types */

import { useRef } from "react";
import { getDiscountedPrice, getRandomDiscount } from "../../Utils/CommonFunctions";


const OrderCard = ({ displayImage, name, brand, price, quantity = 1 }) => {
    const discount = useRef(getRandomDiscount(20, 80));
    let discountPrice = getDiscountedPrice(price, discount.current);
    price *= quantity;
    discountPrice *= quantity;
    return (
        <div className="flex rounded-md border border-[#d6d6d6] shadow p-2">
            <div className="cardImageContainer relative h-[130px] min-w-[104px] rounded-md">
                <img className="aspect-[10/13] w-full h-full object-cover rounded-md" src={displayImage || "/assets/images/others/product.webp"} alt={name} />
                <div className="pQty absolute top-1 right-1"><span className="rounded-full flex items-center justify-center bg-black text-[10px] text-white h-4 w-4 text-center font-semibold shadow">{quantity}</span></div>
            </div>
            <div className="cardDetailsContainer flex flex-col gap-2 px-2">
                {brand && <h3 className="brand text-black text-sm font-semibold">{brand}</h3>}
                <p className="productName text-xs text-[#4e5664] font-medium">{name}</p>
                <p className="arrivalTime font-medium text-[10px]">Delivery by <span className="font-semibold">03 Nov 2023</span></p>
                <div className="priceWrap text-xs flex gap-1">
                    <span className="price font-bold">₹{price}</span>
                    <span className="mrp line-through text-[10px]">₹{discountPrice}</span>
                </div>
                <div className="infoMsg text-[10px] md:text-xs text-[#1d8802] font-semibold">You saved ₹{discountPrice - price}!</div>
            </div>
        </div>
    )
}

export default OrderCard;