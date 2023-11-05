import { Link } from "react-router-dom";
import { popularSearches } from "../../constants";


const PopularSearches = () => {
    return (
        <div className="popularSearches">
            <p className="catTitle text-sm md:text-base font-bold text-center py-5">Popular Searches</p>
            <div className="popularSearchesWrapper flex flex-wrap justify-evenly gap-2 px-4 md:px-10 mb-10">
                {
                    popularSearches?.map((value) => (
                        <Link to={'/Men'} key={value} >
                            <div className="rounded-full capitalize border border-[#cecece] m-1 text-sm font-medium px-5 py-2 opacity-90">{value}</div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default PopularSearches;