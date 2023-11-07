import { useDispatch, useSelector } from "react-redux";
import DotsLoader from "../Loaders/DotsLoader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Portal from "../Portal";
import AddressTypeModal from "./AddressTypeModal";
import { resetStatus } from "../../store/slices/orderSlice";


const CODDetails = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { loading, totalPrice } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const { status } = useSelector(state => state.order);

    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'success') {
            navigate('/order-success');
            dispatch(resetStatus());
        }
    }, [status]);

    const closeModal = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setIsOpenModal(false);
        document.body.style.overflowY = '';
    }

    const openModal = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setIsOpenModal(true);
        document.body.style.overflowY = '';
    }

    return (
        <div className="my-3 text-xs sm:text-base">
            <p className="text-[#4e5664] font-medium mb-4">Cash handling charges of ₹ 20 are applicable</p>
            <button onClick={openModal} className={`cursor-pointer h-12 text-sm font-semibold w-full border-none outline-none flex bg-[#42a2a2] hover:bg-opacity-90 justify-center items-center rounded-md text-white`}>{loading ? <DotsLoader /> : `Pay ₹${totalPrice + 20}`}</button>
            {
                isOpenModal &&
                <Portal onClose={closeModal}>
                    <AddressTypeModal onClose={closeModal} />
                </Portal>
            }
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