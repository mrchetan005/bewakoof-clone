import { useNavigate } from "react-router-dom";


const OrderSuccess = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="emptyCart flex flex-col">
            <div className=" md:m-auto md:pt-8 text-center">
                <img className='m-auto w-80 md:w-96' src="/assets/images/others/ic-order-success-bag-anime.gif" alt="" />
                <h2 className="font-bold md:text-2xl text-[#000c] mt-6 m-auto ">Thank you for shopping!</h2>
                <p className="text-sm md:text-lg mt-2 m-auto ">Your order has been placed.</p>
                <button onClick={handleClick} className={`cursor-pointer h-10 w-52 my-10 m-auto font-medium outline-none flex justify-center items-center rounded-md border-[#000c] border-2 border-b-4 text-lg text-[#000c] bg-[#fdd835]`}>Continue Shopping</button>
            </div>
        </div>
    )
}

export default OrderSuccess;