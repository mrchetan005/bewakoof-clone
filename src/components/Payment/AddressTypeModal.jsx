/* eslint-disable react/prop-types */
import { useState } from 'react'
import { addressTypes } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { convertCartToOrder } from '../../store/asyncThunks/orderAsyncThunk';

const AddressTypeModal = ({ onClose }) => {
    const [activeType, setActiveType] = useState(addressTypes[0]);
    const { activeAddress } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }

    const handleType = (type) => {
        setActiveType(type);
    }

    const handleConfirmOrder = (e) => {
        onClose(e);
        dispatch(convertCartToOrder({ addressType: activeType, address: activeAddress }));
    }

    return (
        <div onClick={handleClose} className="w-full h-full bg-[#0000007a] flex">
            <div className="bg-white max-w-2xl min-w-[250px] m-auto p-4 rounded-md">
                <div className='opacity-80 font-medium text-center'>Select address type </div>
                <div className='flex flex-col items-center justify-center text-center gap-3 my-4 text-xs font-medium'>
                    {
                        addressTypes?.map((type) => (
                            <div onClick={() => handleType(type)} key={type} className={`rounded-full w-40 cursor-pointer p-2 ${activeType === type ? 'bg-orange-500 text-white' : 'bg-slate-200'}`}>{type}</div>
                        ))
                    }
                </div>
                <button onClick={handleConfirmOrder} className={`cursor-pointer h-12 text-sm font-semibold w-full border-none outline-none flex bg-[#42a2a2] hover:bg-opacity-90 justify-center items-center rounded-md text-white`}>CONFIRM ORDER</button>
            </div>
        </div>
    )
}

export default AddressTypeModal;