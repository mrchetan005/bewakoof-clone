import { Link } from "react-router-dom";
import { ProductSlider } from "../components/Carousels";
import Searchbar from "../components/SearchEssentials/Searchbar";
import NoResult from "../components/SearchEssentials/NoResult";
import PopularSearches from "../components/SearchEssentials/PopularSearches";


const Search = () => {

    return (
        <div className=''>
            <Searchbar />

            <NoResult />

            <PopularSearches />

            <div className="pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                <ProductSlider filter={{ sellerTag: 'new arrival' }} heading={`WHAT'S NEW`} />
                <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                </div>
            </div>
            <div className="pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                <ProductSlider filter={{ sellerTag: 'trending' }} heading={'TRENDING'} />
                <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                    <Link to={'/Men'}>Explore All</Link>
                </div>
            </div>
        </div>
    )
}

export default Search;