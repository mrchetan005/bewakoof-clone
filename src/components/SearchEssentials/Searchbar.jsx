import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchItems } from "../../store/asyncThunks/searchAsyncThunk";
import { setSearchValue } from "../../store/slices/searchSlice";


const Searchbar = () => {
    const { searchValue } = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e?.preventDefault && e.preventDefault();
        navigate(`/search/Search Results for "${searchValue}"?name=${searchValue}`);
        dispatch(setSearchValue(''));
    }

    const handleInputSearch = (e) => {
        const { value } = e.target;
        dispatch(setSearchValue(value));
    }

    const handleClearSearchValue = () => {
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

    return (
        <div className="searchWrapper md:hidden fixed top-0 left-0 z-50 right-0 flex items-center h-14 bg-white">
            <Link className="px-2 flex items-center" to={'../'}>
                <BsChevronLeft className="w-7 h-7 object-cover" />
            </Link>
            <form onSubmit={handleSearch} className="inputWrapper relative flex-1 mr-4 flex items-center h-11 bg-[#f2f2f2] rounded-md">
                <span className="pl-2 opacity-80"><FiSearch className="w-6 h-6 object-cover" /></span>
                <input className="bg-[#f2f2f2] border-none font-medium outline-none flex-1 pl-2 pr-10" placeholder="Type here to search" value={searchValue} onChange={handleInputSearch} type="text" />
                {
                    searchValue &&
                    <span onClick={handleClearSearchValue} className="absolute right-2 opacity-90"><AiOutlineClose className="w-7 h-7 object-cover" /></span>
                }
            </form>
        </div>
    )
}

export default Searchbar;