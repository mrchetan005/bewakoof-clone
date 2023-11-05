/* eslint-disable react/prop-types */

import { AiOutlineClose } from 'react-icons/ai';
import SizeOptions from './SizeOptions';
import { memo } from 'react';

const SizeModal = ({ size, selectedSize, setSelectedSize, onClose, setAddedToBag }) => {
    console.log(!!selectedSize);

    const handleClick = (e) => {
        onClose(e);
        setAddedToBag(true);
    }

    const handleModalClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }
    return (
        <div className='w-full h-full bg-[#0000007a] relative flex flex-col justify-end md:justify-center' onClick={handleModalClose}>
            <div className='popup bg-white rounded-2xl md:rounded-xl md:overflow-hidden w-full mt-auto md:m-auto md:max-w-lg'>
                <div className='flex flex-col items-center p-4'>
                    <div className="bar w-10 h-[2px] bg-[#4e5664] mb-3 rounded-xl"></div>
                    <div className="titleIconContainer flex items-center justify-between w-full">
                        <h1 className="popupTitle text-sm font-bold text-[#292d35]">Choose your perfect fit!</h1>
                        <span className='opacity-70' onClick={onClose}><AiOutlineClose className='w-6 h-6' /></span>
                    </div>
                </div>
                <div className=" bg-[#f2f2f4] p-2 md:p-0">
                    <div className='bg-white p-4'>
                        <SizeOptions size={size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                        <button disabled={selectedSize === null} onClick={handleClick} className={`uppercase cursor-pointer h-10 w-full font-medium border-none outline-none flex justify-center mt-2 items-center rounded-md text-white bg-[#42a2a2] hover:bg-opacity-80`}>DONE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SizeModal);