/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


const OrdersCard = ({ orderId, displayImage, name, createdAt }) => {
    const date = new Date(createdAt);
    const dateArray = date.toString().split(' ').slice(1, 4);
    const day = dateArray[1];
    const month = dateArray[0];
    const year = dateArray[2];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`./${orderId}`);
    }

    return (
        <div className="">
            <div className="orderId font-medium">Order# <span className="font-bold ml-1">{orderId.slice(-6)}</span></div>
            <div className="orderCard border-2 flex md:gap-6 p-2 md:p-0 bg-white rounded overflow-hidden">
                <figure className="md:h-[260px] md:w-[260px] w-[121px] h-[151px] rounded md:rounded-none">
                    <img className="object-cover h-full rounded md:rounded-none" src={displayImage} alt={name} />
                </figure>
                <div className="text-xs flex-1 md:text-sm px-2 md:p-4 flex flex-col gap-4 md:gap-6">
                    <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-sm font-medium py-1">Size: S</p>
                    </div>
                    <div className="flex items-center opacity-75">
                        <img className="object-cover h-4" src="/assets/icons/red-truck.webp" alt="" />
                        <span className="text-xs ml-2">{day} {month}, {year}</span>
                    </div>
                    <div className="text-xs font-medium w-max text-[#42a2a2] p-1 bg-[#e7ffeb]">CONFIRMED</div>
                    <div className="ml-auto w-max">
                        <button onClick={handleClick} className="border font-bold hover:opacity-80 rounded border-[#42a2a2] text-[#42a2a2] py-2 px-3 md:py-4 md:px-10 text-sm">ORDER INFO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersCard;