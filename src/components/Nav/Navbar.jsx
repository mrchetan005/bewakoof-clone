import { Link, NavLink, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineMobile, AiOutlineSearch } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import MenuWrapper from "./MenuWrapper";
import { useEffect, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import { MenCategories, WomenCategories, bottomHeaderLinks, mobileCoversCategories, mobileOtherBrands, myProfile, specialsCategories } from "./navlinks";
import { RiMenu2Line } from 'react-icons/ri';
import DropDownProfile from "./DropDownProfile";
import Badge from "../Utils/Badge";
import { useDispatch, useSelector } from "react-redux";
import { includePath } from "../../Utils/CommonFunctions";
import Portal from "../Portal";
import Sidebar from "./Sidebar";
import { setSearchValue } from "../../store/slices/searchSlice";
import { searchItems } from "../../store/asyncThunks/searchAsyncThunk";
import SuggestionList from "../SearchEssentials/SuggestionList";

const paths = ['login', 'signup', 'cart', 'write-review', 'profile', 'search'];


const Navbar = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [activeMenuDropdown, setActiveMenuDropdown] = useState('');
    const [activeProfileDropdown, setActiveProfileDropdown] = useState('');
    const { pathname } = useLocation();
    const { results: cartCount } = useSelector(state => state.cart);
    const { searchValue } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchValueChange = (e) => {
        const { value } = e.target;
        dispatch(setSearchValue(value));
    };

    const handleSubmitSearch = (e) => {
        e?.preventDefault && e.preventDefault();
        navigate(`/search/Search Results for "${searchValue}"?name=${searchValue}`);
        dispatch(setSearchValue(''));
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchValue.length > 2) {
                dispatch(searchItems(searchValue));
            }
        }, 500);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [searchValue]);

    const openSidebar = (e) => {
        if (e.stopProgation) e.stopProgation();
        document.body.style.overflowY = "hidden";
        setIsOpenSidebar(true);
    }

    const closeSidebar = (e) => {
        e.stopPropagation();
        document.body.style.overflowY = '';
        setIsOpenSidebar(false);
    }

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50">
                <div className="topBarWrapper bg-[#eee] lg:block hidden">
                    <div className="topbar container text-[10px] font-medium py-[6px] flex items-center justify-between w-full  text-[#000000cc] ">
                        <div className="flex">
                            <Link className="headerLinks mx-2">Offers</Link>
                            <Link className=" mx-2">Fanbook</Link>
                            <Link className="flex items-center gap-1 mx-2">
                                <AiOutlineMobile /> Download App</Link>
                            <Link className="mx-2">Tribe Membership</Link>
                        </div>
                        <div className="flex">
                            <Link className="mx-2">Contact Us</Link>
                            <Link className="mx-2">Track Order</Link>
                        </div>
                    </div>
                </div>

                <div className="mainHeaderWrapper bg-[#fdd855] lg:bg-white h-14 px-4 lg:px-0 lg:border-b lg:border-[rgba(0,0,0,0.2)] shadow-sm lg:shadow-none relative">
                    <div className="mainHeader lg:container flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <RiMenu2Line onClick={openSidebar} className="w-7 h-7 block lg:hidden cursor-pointer hover:text-[#ef4444] transition-all duration-300" />
                            {
                                isOpenSidebar &&
                                <Portal onClose={closeSidebar}>
                                    <Sidebar onClose={closeSidebar} />
                                </Portal>
                            }
                            <Link to={'/'} className="logo flex items-center h-14 ">
                                <img className="w-36 object-cover hidden lg:block mx-2 mb-1" src="/assets/icons/desktop-logo.svg" alt="logo" />
                                <img className="w-10 object-cover lg:hidden" src="/assets/icons/mobile-logo.svg" alt="logo" />
                            </Link>
                        </div>
                        <div className="dropdownWrapper hidden lg:flex w-5/12 items-center float-left">
                            <MenuWrapper title={'Men'} active={activeMenuDropdown} setActive={setActiveMenuDropdown}>
                                <DropDownMenu title={'men'} categories={MenCategories} specials={specialsCategories} />
                            </MenuWrapper>
                            <MenuWrapper title={'Women'} active={activeMenuDropdown} setActive={setActiveMenuDropdown} >
                                <DropDownMenu title={'women'} categories={WomenCategories} specials={specialsCategories} />
                            </MenuWrapper>
                            <MenuWrapper title={'Mobile Covers'} active={activeMenuDropdown} setActive={setActiveMenuDropdown} >
                                <DropDownMenu title={'mobile-covers'} categories={mobileCoversCategories} specials={mobileOtherBrands} />
                            </MenuWrapper>
                        </div>
                        <div className="lg:w-5/12 flex items-center justify-end">
                            <Link to={'/search'}>
                                <AiOutlineSearch className="lg:hidden w-7 h-7 mx-2 cursor-pointer" />
                            </Link>
                            <div className="searchBox relative hidden lg:block flex-1 float-right">
                                <form onSubmit={handleSubmitSearch} className="relative focus-within:border-[#0000005a] border border-transparent bg-[#eaeaea] transition-all duration-300  rounded-[5px] focus-within:bg-white h-10 py-1 pl-10 w-full text-sx">
                                    <input value={searchValue} onChange={handleSearchValueChange} autoComplete="off" placeholder="Search by product, category or collection" type="text" className="text-xs font-medium bg-transparent placeholder:text-[8px] w-full h-full border-none outline-none" />
                                    <AiOutlineSearch className="h-6 w-6 text-[#0000006e] absolute left-2 top-2 z-50" />
                                </form>
                                {
                                    searchValue.length > 2 &&
                                    <div className="absolute left-0 right-0 top-full bg-white border border-t-0 mt-2">
                                        <SuggestionList />
                                    </div>
                                }
                            </div>
                            <div className="divider border border-[rgba(0,0,0,0.3)] hidden lg:block my-1 ml-4 h-6" />

                            <DropDownProfile list={myProfile} active={activeProfileDropdown} setActive={setActiveProfileDropdown} />
                            <Link to={'/wishlist'}>
                                <AiOutlineHeart className="lg:h-6 lg:w-6 w-7 h-7 ml-3 cursor-pointer" />
                            </Link>
                            <Link to={'/cart'} className="relative ml-4 flex items-center">
                                <Badge color="#fdd855" count={cartCount}>
                                    <BsBag className="h-5 w-5 cursor-pointer" />
                                </Badge>
                            </Link>
                            <img src="/assets/icons/india-flag.png" alt="" className="w-8 h-8 ml-5 hidden lg:block object-cover rounded-circle" />
                        </div>
                    </div>
                </div>
            </header>
            {
                pathname === '/' &&
                <div className="bottomHeaderWrapper fixed bg-white top-[83px] z-20 hidden lg:block overflow-hidden">
                    <div className="bottomHeader">
                        <ul className="flex w-screen h-14 items-center justify-evenly ">
                            {
                                bottomHeaderLinks?.map(({ id, name, filter }) => (
                                    <li key={id}>
                                        <Link to={`/c/${name}?${createSearchParams(filter)}`} className="font-medium  text-base w-max whitespace-nowrap  uppercase text-[#0e0e0e] py-5 px-6">{name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }

            {
                !includePath(pathname, paths) &&
                <div className="footerMenuWrapper fixed bottom-0 left-0 right-0 drop-shadow-2xl py-2 bg-white flex justify-evenly z-50 lg:hidden" >
                    <NavLink to={'/'} className="bottomNavTab flex flex-col justify-center">
                        <img className="h-6 w-6 m-auto nav-icon" src="/assets/icons/mobile-home-logo.svg" alt="Home" />
                        <img className=" h-6 w-6 m-auto nav-icon-active hidden" src="/assets/icons/mobile-home-logo-active.svg" alt="Home" />
                        <span className="text-xs w-10 text-center">Home</span>
                    </NavLink>

                    <NavLink to={'/Men'} className="bottomNavTab flex flex-col justify-center">
                        <img className="h-6 w-6 m-auto nav-icon" src="/assets/icons/categories-logo.svg" alt="Categories" />
                        <img className=" h-6 w-6 m-auto nav-icon-active hidden" src="/assets/icons/categories-logo-active.svg" alt="Categories" />
                        <span className="text-xs w-[66px] text-center">Categories</span>
                    </NavLink>

                    <NavLink to={'explore'} className="bottomNavTab flex flex-col justify-center">
                        <img className=" h-6 w-6 m-auto nav-icon" src="/assets/icons/explore-logo.svg" alt="Explore" />
                        <img className=" h-6 w-6 m-auto nav-icon-active hidden" src="/assets/icons/explore-logo-active.svg" alt="Explore" />
                        <span className="text-xs w-12 text-center">Explore</span>
                    </NavLink>

                    <NavLink to={'/account'} className="bottomNavTab flex flex-col justify-center ">
                        <img className=" h-6 w-6 m-auto nav-icon" src="/assets/icons/profile-logo.svg" alt="Profile" />
                        <img className=" h-6 w-6 m-auto nav-icon-active hidden" src="/assets/icons/profile-logo-active.svg" alt="Profile" />
                        <span className="text-xs w-12 text-center">Profile</span>
                    </NavLink>
                </div>
            }
        </>
    )
}

export default Navbar;


