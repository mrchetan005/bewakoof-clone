/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { updateInfo } from "../../store/asyncThunks/authAsyncThunk";
import { Link, useNavigate } from "react-router-dom";
import { addActiveAddress } from "../../store/slices/authSlice";


const AddressCard = ({ _id, street, city, state, zipCode, activeAddress, setActiveAddress }) => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        const address = user?.address?.filter((addr) => addr._id !== id);
        dispatch(updateInfo({ address }));
    }

    const handleActiveAddress = () => {
        setActiveAddress(_id);
    }

    const handleConfirm = () => {
        dispatch(addActiveAddress(_id));
        navigate(-1);
    }

    return (
        <div onClick={handleActiveAddress} className={`addAddressWrapper flex-1 min-w-[250px] w-full`}>
            <div className={`panel  text-xs flex w-full border ${activeAddress === _id ? 'border-[#51cccc]' : 'border-[#ddd]  hover:border-[#51cccc]'} transition-all rounded-md  cursor-pointer`}>
                <div className="radio pl-5 pt-6">
                    <input className='accent-[#42a2a2]' checked={activeAddress === _id} onChange={() => { }} type="radio" name="address" />
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <div className="panelBody p-5 w-full">
                        <h3 className="addressName text-[#333] text-sm font-semibold">{user?.name}</h3>
                        <div className="textGrayed my-4 text-xs text-black  font-medium">
                            <div className="addressClamp mb-1">{street}</div>
                            <div>{city}, {state} {zipCode}</div>
                        </div>
                        {user?.phone && <p className="mt-2 text-black font-medium">Mobile: <span className="font-bold">{user?.phone}</span> </p>}
                    </div>
                    {
                        activeAddress === _id &&
                        <div className="pannelBottom self-start p-5 pt-0 w-full">
                            <div className="text-[#42a2a2] font-bold text-xs flex items-center sm:ml-auto w-max">
                                <Link to={`/account/address/${_id}`}>
                                    <span className="pr-4 border-r-2">EDIT</span>
                                </Link>
                                <span onClick={() => handleRemove(_id)} className="px-4">REMOVE</span>
                            </div>
                            <div className="mt-4">
                                <button onClick={handleConfirm} className="py-4 w-full bg-[#42a2a2] text-white max-w-[300px] text-base font-semibold rounded-md">CONFIRM</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddressCard;