/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";


const OrdersCard = ({ orderId, _id, displayImage, name, createdAt }) => {
    const date = new Date(new Date() * 1 + (1000 * 60 * 60 * 24 * (Math.ceil(Math.random() * 10))));
    const dateArray = date.toString().split(' ').slice(1, 4);
    const day = dateArray[1];
    const month = dateArray[0];
    const year = dateArray[2];

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`order-info/${orderId}`)
    }

    return (
        <div className="">
            <div className="orderId font-medium">Order# <span className="font-bold ml-1">{_id.slice(0, 6)}</span></div>
            <div className="orderCard border-2 flex gap-6 bg-white rounded overflow-hidden">
                <figure className="h-[260px] w-[260px]">
                    <img className="object-cover h-full w-full" src={displayImage} alt={name} />
                </figure>
                <div className="text-sm p-1 md:p-4 w-full flex flex-col gap-6">
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
                        <button onClick={handleClick} className="border font-bold hover:opacity-80 rounded border-[#42a2a2] text-[#42a2a2] py-4 px-10 text-sm">ORDER INFO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersCard;