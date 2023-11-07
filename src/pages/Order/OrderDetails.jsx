import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link, useLoaderData } from "react-router-dom";
import OrderDetailsCard from "../../components/Card/OrderDetailsCard";
import { useSelector } from "react-redux";


const OrderDetails = () => {
    const { items, orderDate, shipmentDetails, totalPrice, _id } = useLoaderData();

    const { user } = useSelector(state => state.auth);

    const date = new Date(orderDate);

    return (
        <div className="px-4 md:mx-0 bg-[#f9f9f9]">
            <div className="lg:container pt-10">
                <Link to={'../'}>
                    <div className="text-[#51cccc] flex items-center gap-2 text-sm mb-10">
                        <BsChevronLeft className="w-4 h-4 object-cover" />
                        <span>Back To My Account</span>
                    </div>
                </Link>
            </div>
            <div className="flex lg:container flex-col md:flex-row pb-20">
                <div className="leftSide md:flex-[3]">
                    <div>
                        <div className="orderId text-xs md:text-sm font-medium flex gap-2 flex-wrap justify-between items-center mb-4">
                            <p className="flex items-center gap-1">Order#<span className="font-semibold ml-1">{_id}</span></p>
                            <p className="flex items-center gap-2">ORDER PLACED <span className="font-semibold">{date.toDateString().split(' ').slice(1).join(' ')} {date.toLocaleTimeString()}</span></p>
                        </div>
                        {
                            items?.map(({ product, _id, quantity }) => (
                                <OrderDetailsCard key={_id} {...product} quantity={quantity} />
                            ))
                        }

                        <div className="my-4 py-5 px-3 bg-white border rounded">
                            <h5 className="text-xs font-semibold text-[#00000061]">NEED HELP WITH YOUR ORDER?</h5>
                            <a href={'https://www.bewakoof.com/contact-us/order-delivery-payment'} target="_blank" rel="noreferrer noopener">
                                <div className="flex justify-between items-center pt-4">
                                    <p className="font-semibold text-[#207bb4] text-xs">HELP AND SUPPORT</p>
                                    <BsChevronRight className="h-4 w-4 mr-3" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="rightSide md:flex-[2] mt-5 md:p-4">
                    <div className="p-4 md:p-4 bg-white border rounded mb-4">
                        <h5 className="font-semibold text-[#00000061] mt-1 mb-4 text-sm">SHIPPING DETAILS</h5>
                        <p className="text-[#fe8f00] border border-[#fe8f00] text-[10px] bg-[#fff9f2] mb-2 px-1 w-max">{shipmentDetails.type}</p>
                        <h6 className="text-xs font-bold">{user?.name} | {user?.phone}</h6>
                        <p className="text-xs mt-2 font-medium">{shipmentDetails?.address?.street}, {shipmentDetails?.address?.city} {shipmentDetails?.address?.zipCode}, {shipmentDetails?.address?.state}, India</p>
                    </div>
                    <div className="bg-white border rounded">
                        <h5 className="font-semibold text-[#00000061] mt-1 mb-4 p-4 text-sm">PAYMENT SUMMARY</h5>
                        <ul className="text-xs border-b px-4 pb-4 font-medium">
                            <li className="flex justify-between pb-4 items-center">
                                <div>Cart Total</div>
                                <div>₹ {totalPrice}</div>
                            </li>
                            <li className="flex justify-between pb-4 items-center">
                                <div>Delivery Fee</div>
                                <div>FREE</div>
                            </li>
                            <li className="flex justify-between pb-4 items-center">
                                <div>COD</div>
                                <div>₹ 20</div>
                            </li>
                            <li className="flex justify-between pb-4 items-center">
                                <div>Order Total</div>
                                <div>₹ {totalPrice + 20}</div>
                            </li>
                        </ul>
                        <div className="p-4 flex items-center justify-between font-bold">
                            <div>Amount To Be Paid</div>
                            <div>₹ {totalPrice + 20}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails;