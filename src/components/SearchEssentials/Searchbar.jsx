import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";


const Searchbar = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="searchWrapper md:hidden fixed top-0 left-0 z-50 right-0 flex items-center h-14 bg-white">
            <Link className="px-2 flex items-center" to={'../'}>
                <BsChevronLeft className="w-7 h-7 object-cover" />
            </Link>
            <div className="inputWrapper relative flex-1 mr-4 flex items-center h-11 bg-[#f2f2f2] rounded-md">
                <span className="pl-2 opacity-80"><FiSearch className="w-6 h-6 object-cover" /></span>
                <input className="bg-[#f2f2f2] border-none font-medium outline-none flex-1 pl-2 pr-10" placeholder="Type here to search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" />
                {
                    searchValue &&
                    <span onClick={() => setSearchValue('')} className="absolute right-2 opacity-90"><AiOutlineClose className="w-7 h-7 object-cover" /></span>
                }
            </div>
        </div>
    )
}

export default Searchbar;