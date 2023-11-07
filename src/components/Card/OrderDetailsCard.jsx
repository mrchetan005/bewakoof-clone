/* eslint-disable react/prop-types */

const OrderDetailsCard = ({ displayImage, name, price }) => {

    return (
        <div className="mt-1 mb-4">
            <div className="orderCard border flex p-3 bg-white rounded overflow-hidden">
                <figure className="h-[151px] w-[121px] rounded">
                    <img className="object-cover h-full w-full rounded md:rounded-none" src={displayImage} alt={name} />
                </figure>
                <div className="text-sm flex-1 ml-4 md:ml-6 flex flex-col gap-6">
                    <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-xs font-semibold py-1 text-[#8f98a9]">Size: S</p>
                        <p className="text-xs font-medium">Rs. {price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailsCard;