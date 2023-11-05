import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddressForm from "../components/Forms/AddressForm";
import { useSelector } from "react-redux";
import AddressCard from "../components/Card/AddressCard";


const Address = () => {
    const { user } = useSelector(state => state.auth);
    const [activeAddress, setActiveAddress] = useState(user?.address?.[0]?._id || 0);
    const [openAddressForm, setOpenAddressForm] = useState(false);

    const onOpenForm = () => {
        setOpenAddressForm(true);
    }

    const onCloseForm = () => {
        setOpenAddressForm(false);
    }

    return (
        <div className="lg:container">
            <Link to={'../'}>
                <div className="text-[#51cccc] mx-4 md:mx-10 flex items-center gap-2 text-sm my-10">
                    <BsChevronLeft className="w-4 h-4 object-cover" />
                    <span>Back To My Account</span>
                </div>
            </Link>
            <div className="myAccHeader mx-4 md:mx-10">
                <div className="headingInner relative w-full">
                    <div className='w-max'>
                        <h1 className="searchResult capitalize float-left text-2xl md:text-3xl font-bold truncate text-[#2d2d2d]">My Address</h1>
                        <span className="totalProductCount text-2xl pl-2 text-[#949494]"></span>
                        <div className=" left-0 w-7/12 h-[2px] bg-[#fbd139] mt-[6px] mb-12 ml-[2px]"></div>
                    </div>
                </div>
            </div>
            {
                openAddressForm
                    ? <AddressForm onClose={onCloseForm} />
                    : <div className="flex flex-col-reverse md:flex-row gap-6 mx-4 md:mx-10 md:px-0 pb-14">
                        {user?.address?.length > 0
                            && <div className="myAddressWrapper flex-[6] flex flex-col gap-6 md:px-0 pb-14">
                                {
                                    user?.address?.map((addr) => (
                                        <AddressCard activeAddress={activeAddress} setActiveAddress={setActiveAddress} key={addr._id} user={user} {...addr} />
                                    ))
                                }
                            </div>
                        }
                        <div className="addAddressWrapper flex-[4] min-w-[250px]">
                            <div onClick={onOpenForm} className="panel text-[#51cccc] text-xs flex flex-col justify-center items-center border border-[#ddd] hover:border-[#51cccc] transition-all rounded-md h-44 cursor-pointer max-w-[300px]">
                                <span><FaPlus className="w-8 h-8 object-cover" /></span>
                                <div className="pt-2 font-medium">ADD NEW ADDRESS</div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Address;