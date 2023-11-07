import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchValue } from "../../store/slices/searchSlice";


const SuggestionList = () => {
    const { searchItems, searchValue } = useSelector(state => state.search);

    const dispatch = useDispatch();
    const handleResults = () => {
        dispatch(setSearchValue(''));
    }

    return (
        <div className="md:border-0 border lg:container">
            <ul className="flex flex-col">
                {
                    searchItems?.map(({ name, _id }) => (
                        <Link onClick={handleResults} to={`/p/${_id}`} key={_id}>
                            <li tabIndex={0} className="text-xs font-medium p-3 truncate hover:bg-gray-100 w-full">{name}</li>
                        </Link>
                    ))
                }
            </ul>
            <Link onClick={handleResults} to={`/search/Search Results for "${searchValue}"?name=${searchValue}`}>
                <p className="text-xs text-[#42a2a2] font-medium p-3 border-t md:border-0 hover:bg-gray-200">See All Results</p>
            </Link>
        </div>
    )
}

export default SuggestionList;