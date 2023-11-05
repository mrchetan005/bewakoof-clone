import { Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";


const Account = () => {
    return (
        <div className="md:mx-14">
            <div className="myAccHeader">
                <div className="headingInner hidden md:block relative mt-9 w-full md:mt-11 px-6 md:px-0">
                    <div className='w-max'>
                        <h1 className="searchResult capitalize float-left text-2xl font-bold truncate text-[#2d2d2d]">My Account</h1>
                        <span className="totalProductCount text-2xl pl-2 text-[#949494]"></span>
                        <div className=" left-0 w-7/12 h-[2px] bg-[#fbd139] mt-[6px] mb-12 ml-[2px]"></div>
                    </div>
                </div>
            </div>
            <div className="accOptionsBox px-4 md:px-0 md:w-full md:flex md:flex-wrap ">
                <Link to={'orders'}>
                    <div className="accOptionInner py-5 text-[#181818] border-b  md:border-r md:px-5 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="accHead font-medium  ">My Orders</div>
                            <BsChevronRight className="h-4 w-4" />
                        </div>
                        <span className="accNote text-xs opacity-60">View, modify and track orders</span>
                    </div>
                </Link>
                <Link to={'wallet'}>
                    <div className="accOptionInner py-5 text-[#181818] border-b  md:border-r md:px-5 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="accHead font-medium  ">My Wallet
                                <span className="text-[#42a2a2] text-xs pl-2">Rs. 0</span>
                            </div>
                            <BsChevronRight className="h-4 w-4" />
                        </div>
                        <span className="accNote text-xs opacity-60">Bewakoof Wallet History and redeemed gift cards</span>
                    </div>
                </Link>
                <Link to={'address'}>
                    <div className="accOptionInner py-5 text-[#181818] border-b  md:border-r md:px-5 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="accHead font-medium  ">My Address</div>
                            <BsChevronRight className="h-4 w-4" />
                        </div>
                        <span className="accNote text-xs opacity-60">Edit, add or remove addresses</span>
                    </div>
                </Link>
                <Link to={'profile'}>
                    <div className="accOptionInner py-5 text-[#181818] border-b  md:border-r md:px-5 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            <div className="accHead font-medium  ">My Profile</div>
                            <BsChevronRight className="h-4 w-4" />
                        </div>
                        <span className="accNote text-xs opacity-60">Edit personal info, change password</span>
                    </div>
                </Link>
            </div>
            <div className="emptyAccountBox pt-14 md:pt-36 pb-12 md:pb-60 flex justify-between md:justify-normal">
                <div className="ml-4 md:ml-0">
                    <h3 className="pt-10 mb-8 text-xs md:text-xl text-[#181818] font-bold opacity-60 w-[200px] md:w-[355px]">Buy something to get personalised recommendations.</h3>
                    <Link to={'/'}>
                        <button className="border hover:opacity-80 rounded border-[#51cccc] text-[#51cccc] py-2 px-3 text-sm">Continue Shopping</button>
                    </Link>
                </div>
                <img className="hidden md:block" src="/assets/images/others/empty-account.png" alt="" />
                <img className="md:hidden object-contain truncate" src="/assets/images/others/empty-account-mob.webp" alt="" />
            </div>
        </div>
    )
}

export default Account;