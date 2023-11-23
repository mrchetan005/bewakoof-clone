import { useSelector } from "react-redux";
import CartCard from "../components/Card/CartCard";
import { ProductSlider } from "../components/Carousels";
import { Link, useNavigate } from "react-router-dom";
import TrustBagge from "../components/Utils/TrustBagge";

const Cart = () => {
    const { cartItems, results, totalPrice } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleGoToCheckout = () => {
        if (user?.address?.length > 0) {
            navigate('/checkout/payment');
        } else {
            navigate('/account/address');
        }
    }

    return (
        <div className="cartWrapper">
            {
                cartItems?.length > 0 ?
                    <>
                        <div className="cartDeskHead lg:container px-4 pt-10">
                            <span className="qty text-[#181818] flex font-medium items-center pl-1">
                                <b className="font-bold mr-1">My Bag</b> {results} item(s)
                            </span>
                        </div>
                        <div className="bagWrapperWithItems pt-9 md:pb-10">
                            <div className="cartContainer lg:container flex flex-col md:flex-row md:px-4">
                                <div className="leftSection w-full md:w-7/12 overflow-hidden">
                                    <div className="df-inner flex items-center h-12 relative bg-[#fcffee] overflow-hidden rounded mb-5">
                                        <img className="df-img absolute w-5 h-3 left-4 " src="/assets/icons/red-truck.webp" alt="" />
                                        <p className="ml-11 text-xs font-medium">Yay! You get FREE delivery on this order</p>
                                    </div>
                                    <div className="px-4 md:px-0">
                                        {
                                            cartItems?.length > 0 &&
                                            cartItems?.slice(0)?.reverse()?.map((item) => (
                                                <CartCard key={item._id} {...item?.product} quantity={item?.quantity} size={item?.size} />
                                            ))
                                        }
                                    </div>
                                    <div className="md:hidden pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                                        <h2 className="font-semibold pb-4 md:text-center pt-8">YOU MAY ALSO LIKE</h2>
                                        <ProductSlider />
                                        <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                                            <Link>Explore All</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="summaryBox px-2 mt-10 md:mt-0 w-full md:w-5/12 md:pl-4">
                                    <div className="cartStoryTribe rounded-md px-4 mb-4 h-12 flex items-center bg-[#fdd835]">
                                        <p className="text-sm pr-4 flex gap-1 font-medium">Save extra <strong className="bold">₹450</strong> with <img src="/assets/icons/tribe.svg" alt="" /></p>
                                    </div>
                                    <div className="offerBox rounded-md px-4 py-1 mb-4 border text-sm">
                                        <p>Whistles! Get extra 15% cashback on prepaid orders above Rs.699. Coupon code - HAPPY15</p>
                                    </div>
                                    <div className="offerBox rounded-md px-4 py-1 mb-4 border text-sm">
                                        <p>Whistles! Get extra Rs.100 Discount on all prepaid orders above Rs.1499. Use Code - EXTRA100.</p>
                                    </div>
                                    <div className="redeemButtonWrapper p-2 border text-xs">
                                        <div className="redeemButton rounded-md p-2 bg-[#42a2a11a] text-[#42a2a2] flex items-center justify-between">
                                            <span>Apply Coupon / Gift Card / Referral</span>
                                            <span className="font-bold flex items-center gap-1">Redeem <img className="object-contain w-4 h-3" src="/assets/icons/coupon-redeem-arrow.webp" alt="" /></span>
                                        </div>
                                    </div>

                                    <div id="summary" className="summaryBorderBox md:sticky md:top-24 border bg-[#f5f5f5] mb-8 pb-8">
                                        <div className="sectionHeading bg-[#0000000a] py-3 px-5 text-xs font-bold">
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
                                                    <p>Bag Discount</p>
                                                    <p>- ₹{totalPrice}</p>
                                                </div>
                                                <div className="flex justify-between pb-3 text-sm font-semibold">
                                                    <p>Subtotal</p>
                                                    <p>₹{totalPrice}</p>
                                                </div>
                                            </div>
                                            <div className="pmtsBox mt-4 border-t hidden md:flex items-center justify-between">
                                                <div className="pmtsWrap p-4 text-xs font-semibold">
                                                    <span>Total</span>
                                                    <div className="font-bold">
                                                        <span>₹</span>
                                                        <p className="text-base inline">{totalPrice}</p>
                                                    </div>
                                                </div>
                                                <button onClick={handleGoToCheckout} className={`uppercase cursor-pointer mr-4 h-10 w-72 font-medium border-none outline-none flex justify-center items-center rounded-md text-white bg-[#42a2a2] hover:bg-opacity-80`}>{user?.address?.length >= 0 ? 'CONTINUE' : 'ADD ADDRESS'}</button>
                                            </div>
                                        </div>
                                        <TrustBagge />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pmtsWrap z-50 bg-white border-t shadow-md p-3 rotate-180 md:hidden w-full fixed right-0 left-0 bottom-0 flex flex-row-reverse justify-between">
                            <div className="pmts-pr rotate-180 flex-1 flex flex-col justify-center">
                                <div className="flex font-bold items-end text-[#292d35]">
                                    <p className="text-[10px] pb-1">₹</p>
                                    <p>{totalPrice}</p>
                                </div>
                                <a href="#summary" className="font-medium text-[10px] sm:text-xs text-[#207bb4]">VIEW DETAILS</a>
                            </div>
                            <button onClick={handleGoToCheckout} className={`uppercase cursor-pointer flex-[2] mr-4 rotate-180 h-10 font-bold border-none outline-none flex justify-center items-center rounded-md text-white bg-[#42a2a2] hover:bg-opacity-80`}>PROCEED</button>
                        </div>
                        <div className="hidden md:block pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                            <h2 className="font-semibold pb-4 md:text-center pt-8">YOU MAY ALSO LIKE</h2>
                            <ProductSlider />
                            <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                                <Link>Explore All</Link>
                            </div>
                        </div>
                    </>
                    : <EmptyCart />
            }
        </div>
    )
}

export default Cart;

const EmptyCart = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }
    return (
        <>
            <div className="emptyCart flex flex-col">
                <div className=" md:m-auto pt-8 text-center">
                    <img className='m-auto w-40' src="/assets/images/others/empty-cart.png" alt="" />
                    <p className="emptyListSubtitle font-medium text-lg text-[#000c] mt-2 w-56 m-auto ">Nothing in the bag</p>
                    <button onClick={handleClick} className={`cursor-pointer h-10 w-52 my-5 m-auto font-medium outline-none flex justify-center items-center rounded-md border-[#51cccc] border-2 text-lg text-[#51cccc] hover:bg-opacity-80`}>Continue Shopping</button>
                </div>
            </div>
            <div className="pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                <h2 className="font-semibold pb-4 md:text-center pt-8">RECENTLY VIEWED</h2>
                <ProductSlider />
                <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                    <Link to={'/Men'}>Explore All</Link>
                </div>
            </div>
        </>
    )
}