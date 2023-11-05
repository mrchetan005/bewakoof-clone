/* eslint-disable react/prop-types */

import { BsChevronRight } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { aboutUs, contactUs, myProfile } from "./navlinks";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../store/slices/authSlice";


const Sidebar = ({ onClose }) => {
    const { authenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        onClose(e);
        dispatch(logOutUser());
    }

    const handleLogin = (e) => {
        onClose(e);
        navigate('/login')
    }

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }
    return (
        <div onClick={handleClose} className="w-full h-full bg-[#0000007f]">
            <div className="w-72 bg-white h-full text-black overflow-y-auto">
                <div className="menuHeading border-b px-5 sticky top-0 bg-white">
                    <h1 className="font-bold py-4">Hello {user.name}</h1>
                </div>
                <div className="">
                    <div onClick={onClose} className="currentCountry hover:bg-[#f3f3f383] mt-3 flex items-center justify-between px-5 cursor-pointer">
                        <div className="flex items-center justify-center h-12 gap-2">
                            <img className="rounded-full w-8 h-8 object-cover" src="/assets/icons/india-flag.png" alt="" />
                            <div className="font-bold text-xs">India</div>
                        </div>
                        <span className=""><BsChevronRight /></span>
                    </div>
                    <div className="menuListWrapper">
                        <p className="menuHeading pt-3 px-5 text-[#0000004d] text-xs font-bold">SHOP IN</p>
                        <ul className="menuList pt-1 text-xs font-bold">
                            <Link to={'Men'} onClick={onClose}>
                                <li className="menulistOption hover:bg-[#f3f3f383] px-5 flex justify-between items-center h-12">
                                    <span className="font-bold">Men</span>
                                    <img className="w-8 h-8 object-cover" src="/assets/icons/men.webp" alt="" />
                                </li>
                            </Link>
                            <Link to={'Women'} onClick={onClose}>
                                <li className="menulistOption hover:bg-[#f3f3f393] px-5 flex justify-between items-center h-12">
                                    <span className="font-bold">Women</span>
                                    <img className="w-8 h-8 object-cover" src="/assets/icons/women.webp" alt="" />
                                </li>
                            </Link>
                        </ul>
                    </div>
                    {authenticated && <div className="menuListWrapper bg-[#f3f3f3]">
                        <p className="menuHeading pt-3 text-[#0000004d] px-5 text-xs font-bold">MY PROFILE</p>
                        <ul className="menuList pt-1 text-xs font-bold">
                            {
                                myProfile?.map(({ path, title, id }) => (

                                    <Link key={id} onClick={onClose} to={path}>
                                        <li className="menulistOption hover:bg-[#00000013] px-5 flex justify-between items-center h-12">
                                            <span className="font-bold">{title}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>}
                    <div className="menuListWrapper bg-[#f3f3f3]">
                        <p className="menuHeading pt-3 text-[#0000004d] px-5 text-xs font-bold">CONTACT US</p>
                        <ul className="menuList pt-1 text-xs font-bold">
                            {
                                contactUs?.map(({ path, title, id }) => (

                                    <Link key={id} onClick={onClose} to={path}>
                                        <li className="menulistOption hover:bg-[#00000013] px-5 flex justify-between items-center h-12">
                                            <span className="font-bold">{title}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="menuListWrapper bg-[#f3f3f3]">
                        <p className="menuHeading pt-3 text-[#0000004d] px-5 text-xs font-bold">ABOUT US</p>
                        <ul className="menuList pt-1 text-xs font-bold">
                            {
                                aboutUs?.map(({ path, title, id }) => (

                                    <Link key={id} onClick={onClose} to={path}>
                                        <li className="menulistOption hover:bg-[#00000013] px-5 flex justify-between items-center h-12">
                                            <span className="font-bold">{title}</span>
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                    {authenticated
                        ? <div onClick={handleLogout} className="menulistOption hover:bg-[#f3f3f383] px-5 flex justify-between items-center text-xs h-12 cursor-pointer">
                            <span className="font-bold">Logout</span>
                        </div>
                        :
                        <div onClick={handleLogin} className="menulistOption hover:bg-[#f3f3f383] px-5 flex justify-between items-center text-xs h-12 cursor-pointer">
                            <span className="font-bold">Login</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;