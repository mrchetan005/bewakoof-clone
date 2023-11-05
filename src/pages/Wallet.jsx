/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import Popup from "../components/Utils/Popup";


const Wallet = () => {
    const [showLinkCopied, setShowLinkCopied] = useState('');

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.origin)
            .then(() => {
                console.log('Text copied to clipboard:', window.location.origin);
                setShowLinkCopied('Link Copied');
                setTimeout(setShowLinkCopied, 3000, '');
            })
            .catch((error) => {
                console.error('Unable to copy to clipboard', error);
            });
    };

    const handleShare = () => {
        if (window.innerWidth < 768 && navigator.share) {
            navigator.share({
                title: '',
                text: 'Content to share',
                url: 'https://example.com'
            })
                .then(() => {
                    console.log('Successfully shared');
                })
                .catch((error) => {
                    console.error('Error sharing:', error);
                });
        } else {
            console.log('Sharing not supported on this browser');
            copyLink();
        }
    }

    return (
        <>
            <div className="">
                <Link to={'../'}>
                    <div className="text-[#51cccc] mx-4 md:mx-10 flex items-center gap-2 text-sm my-5">
                        <BsChevronLeft className="w-4 h-4 object-cover" />
                        <span>Back To My Account</span>
                    </div>
                </Link>
                <div className="myAccHeader hidden md:block mx-4 md:mx-10 pt-10">
                    <div className="headingInner relative w-full">
                        <div className='w-max'>
                            <h1 className="searchResult capitalize float-left text-2xl md:text-3xl font-bold truncate text-[#2d2d2d]">My Wallet</h1>
                            <span className="totalProductCount text-2xl pl-2 text-[#949494]"></span>
                            <div className=" left-0 w-7/12 h-[2px] bg-[#fbd139] mt-[6px] mb-12 ml-[2px]"></div>
                        </div>
                    </div>
                </div>

                <div className="noOrder flex flex-col items-center px-2">
                    <div className="headLiner text-sm md:text-xl text-[#18181899] font-medium text-center">
                        <p className="mb-2">Oh no! Looks like your wallet is empty :(</p>
                        <h2 className="text-center font-bold text-black">Start earning credits now!</h2>
                    </div>
                    <div className="headImg">
                        <img className="h-[300px] aspect-auto object-cover" src="/assets/images/others/discounts-and-offers.gif" alt="No orders in your account" />
                    </div>
                    <div className="headLiner text-xs md:text-lg text-[#18181899] font-medium text-center">
                        <p className="mb-1">Invite your friends to shop on Bewakoof and</p>
                        <h2 className="text-center font-bold text-black">win credits worth Rs. 100 on every referral</h2>
                    </div>
                    <div className="headLiner py-10">
                        <button onClick={handleShare} className="border-none cursor-pointer hover:opacity-80 rounded  w-64 md:w-80 bg-[#42a2a2] text-white py-2 px-3 text-sm font-semibold">Send Invite</button>
                    </div>
                </div>
            </div>

            {
                showLinkCopied && <Popup message={showLinkCopied} />
            }
        </>
    )
}

export default Wallet;