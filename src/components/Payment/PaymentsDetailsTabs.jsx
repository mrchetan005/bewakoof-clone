import { useSelector } from "react-redux";
import DotsLoader from "../Loaders/DotsLoader";
import { useNavigate } from "react-router-dom";


const CODDetails = () => {
    const { loading, totalPrice } = useSelector(state => state.cart);
    const navigate = useNavigate();
    const handlePayment = () => {
        navigate('/order-success');
    }
    return (
        <div className="my-3 text-xs sm:text-base">
            <p className="text-[#4e5664] font-medium mb-4">Cash handling charges of ₹ 20 are applicable</p>
            <button onClick={handlePayment} className={`cursor-pointer h-12 text-sm font-semibold w-full border-none outline-none flex bg-[#42a2a2] hover:bg-opacity-90 justify-center items-center rounded-md text-white`}>{loading ? <DotsLoader /> : `Pay ₹${totalPrice + 20}`}</button>
        </div>
    )
}

const PaymentDetailsTabs = [
    { id: 0, Component: <div className="my-3 text-sm sm:text-base">Not Applicable</div> },
    { id: 1, Component: <div className="my-3 text-sm sm:text-base">Not Applicable</div> },
    { id: 2, Component: <div className="my-3 text-sm sm:text-base">Not Applicable</div> },
    { id: 3, Component: <div className="my-3 text-sm sm:text-base">Not Applicable</div> },
    { id: 4, Component: <CODDetails /> },
];

export default PaymentDetailsTabs;