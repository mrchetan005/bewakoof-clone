import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import MyProfileForm from "../components/Forms/MyProfileForm";


const Profile = () => {
    return (
        <div className="lg:container md:px-10">
            <Link to={'../'}>
                <div className="text-[#51cccc] mx-4 md:mx-10 flex items-center gap-2 text-sm my-10">
                    <BsChevronLeft className="w-4 h-4 object-cover" />
                    <span>Back To My Account</span>
                </div>
            </Link>
            <div className="myAccHeader mx-4 md:mx-10">
                <div className="headingInner relative w-full">
                    <div className='w-max'>
                        <h1 className="searchResult capitalize float-left text-2xl md:text-3xl font-bold truncate text-[#2d2d2d]">My Profile</h1>
                        <span className="totalProductCount text-2xl pl-2 text-[#949494]"></span>
                        <div className=" left-0 w-7/12 h-[2px] bg-[#fbd139] mt-[6px] mb-12 ml-[2px]"></div>
                    </div>
                </div>
            </div>

            <div className="profileFormWrapper">
                <MyProfileForm />
            </div>
        </div>
    )
}

export default Profile;