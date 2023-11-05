
import { useEffect, useState } from "react";
import { PaymentListTabs } from "../components/Payment/PaymentListTabs";
import PaymentDetailsTabs from "../components/Payment/PaymentsDetailsTabs";
import Accordion from "../components/Utils/Accordion";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OrderCard from "../components/Card/OrderCard";
import AddressCard from "../components/Card/AddressCard";
import TrustBagge from "../components/Utils/TrustBagge";




const Payment = () => {
    const { user } = useSelector(state => state.auth);
    const { totalPrice } = useSelector(state => state.cart);
    const { cartItems } = useSelector(state => state.cart);

    const [activeTab, setActiveTab] = useState(4);
    const DetailsActiveTab = PaymentDetailsTabs?.[activeTab]?.Component;

    const navigate = useNavigate();

    useEffect(() => {
        if (user?.address?.length === 0) {
            navigate('/cart');
        }
    }, [user])

    const addressCard = <div className="flex flex-col gap-2">
        <div className="addressType w-full">
            {
                user?.address?.length > 0 &&
                <AddressCard {...user.address[0]} />
            }
        </div>
        <Link to={'/account/address'}>
            <button className="px-4 py-2 hover:opacity-90 border text-white bg-[#42a2a2] font-semibold rounded-md w-full">CHANGE ADDRESS</button>
        </Link>
    </div>

    const cartProducts = <div className="flex flex-col gap-4 pb-4">
        {
            cartItems?.map(({ _id, product, quantity }) => (
                <OrderCard key={_id} quantity={quantity} {...product} />
            ))
        }
    </div>

    return (
        <div className="pt-9 pb-12 bg-[#f7f7f7] lg:bg-white">
            <div className="lg:container flex lg:flex-row flex-col-reverse lg:px-4 ">
                <div className="pmt-left md:sticky md:top-28 h-max lg:flex-[2] p-4 lg:pr-4 lg:border-r border-[#d6d6d6] bg-white">
                    <p className="my-3 font-bold">Choose your payment method</p>
                    <div className="paymentListTabs border flex border-[#d6d6d6] w-full">
                        <PaymentListTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        <div className="paymentTabDetails flex-[2] px-4">
                            {DetailsActiveTab}
                        </div>
                    </div>
                </div>

                {/* ! right side ! */}
                <div className="pmt-right md:flex-1 px-4 lg:px-0 lg:pl-4 mb-4 lg:border-l bg-[#f7f7f7] lg:bg-white border-[#d6d6d6]">
                    <div className="border bg-white border-[#d6d6d6] px-4 rounded-md mb-4 hover:shadow-md transition-all">
                        <Accordion title={'Address'} description={addressCard} />
                    </div>
                    <div className="border bg-white border-[#d6d6d6] px-4 rounded-md mb-4 hover:shadow-md transition-all">
                        <Accordion title={'You are paying for these items'} description={cartProducts} />
                    </div>
                    <div className="summaryBorderBox md:sticky md:top-24  md:mb-8">
                        <div className="sectionHeading py-3 px-5 text-xs font-bold">
                            <h4 className="">PRICE SUMMARY</h4>
                        </div>
                        <div className="paymentBox bg-white font-medium">
                            <div className="pmtsWrap p-4">
                                <div className="flex justify-between pb-3 text-xs">
                                    <p>Total MRP (Incl. of taxes)</p>
                                    <p>₹{totalPrice}</p>
                                </div>
                                <div className="flex justify-between pb-3 text-xs">
                                    <p>Shipping Charges</p>
                                    <p className="text-[#42a2a2]">FREE</p>
                                </div>
                                <div className="justify-between pb-3 text-xs hidden">
                                    <p>Discount on MRP</p>
                                    <p>- ₹{totalPrice}</p>
                                </div>
                                <div className="flex border-t-2 justify-between py-3 text-sm font-semibold">
                                    <p>Final amount</p>
                                    <p>₹{totalPrice}</p>
                                </div>
                            </div>

                        </div>
                        <TrustBagge />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;

