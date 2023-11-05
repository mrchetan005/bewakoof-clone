/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrder } from "../../store/asyncThunks/orderAsyncThunk";
import OrdersCard from "../../components/Card/OrdersCard";


const Order = () => {
    const { loading, orderItems, isAlreadyFetchedOrder } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAlreadyFetchedOrder) {
            dispatch(getOrder());
        }
    }, []);

    console.log(orderItems);

    return (
        <div className="bg-[#f9f9f9]">
            <div className="pb-20 md:px-20 lg:container pt-10">
                <Link to={'../'}>
                    <div className="text-[#51cccc] mx-4 md:mx-10 flex items-center gap-2 text-sm mb-10">
                        <BsChevronLeft className="w-4 h-4 object-cover" />
                        <span>Back To My Account</span>
                    </div>
                </Link>
                <div className="myAccHeader mx-4 md:mx-10">
                    <div className="headingInner relative w-full">
                        <div className='w-max'>
                            <h1 className="searchResult capitalize float-left text-2xl md:text-3xl font-bold truncate text-[#2d2d2d]">My Orders</h1>
                            <span className="totalProductCount text-2xl pl-2 text-[#949494]"></span>
                            <div className=" left-0 w-7/12 h-[2px] bg-[#fbd139] mt-[6px] mb-12 ml-[2px]"></div>
                        </div>
                    </div>
                </div>
                {
                    orderItems?.length > 0
                        ? <div className="px-4 md:px-10 flex flex-col gap-4">
                            {
                                orderItems?.map(({ createdAt, order }) => {
                                    if (order === null) return <Fragment key={createdAt} />;
                                    return (
                                        <Fragment key={createdAt}>
                                            {
                                                order?.items?.map((item) => (
                                                    <OrdersCard key={item?.product?._id} {...item.product} orderId={order?._id} createdAt={createdAt} />
                                                ))
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                        : <NoOrdersContainer />
                }
            </div>
        </div>
    )
}

export default Order;


const NoOrdersContainer = () => {
    return (
        <div className="noOrder flex flex-col items-center">
            <div className="headLiner text-xl text-[#18181899] font-medium text-center px-4 py-10">
                Sadly, you haven't placed any orders till now.
            </div>
            <div className="headImg">
                <img className="w-36 aspect-auto" src="/assets/images/others/no-orders.png" alt="No orders in your account" />
            </div>
            <div className="headLiner py-10">
                <Link to={'/'}>
                    <button className="border hover:opacity-80 rounded border-[#51cccc] text-[#51cccc] font-medium py-2 px-3 text-sm">Continue Shopping</button>
                </Link>
            </div>
        </div>
    )
}