import { Link } from "react-router-dom";
import { BannerCarousel, ProductSlider, WidgetSlider } from "../components/Carousels";
import ExclusiveGoofCorner from "../components/HomepageEssentials/ExclusiveGoofCorner";


const Home = () => {
    return (
        <div className="px-3 md:px-0">
            <BannerCarousel />
            <WidgetSlider />

            <div className="">
                <h2 className="font-bold text-xs md:text-xl md:text-center pt-4 pb-2">DESIGNS OF THE WEEK</h2>
                <div className="flex md:w-screen rounded-xl overflow-hidden md:rounded-none">
                    <Link to={`campaign/designs-of-the-week-men`} className="w-full">
                        <img className="object-cover w-full hidden md:block" src="/assets/images/others/DOTW-Split-banner-Desktop-Men.webp" alt="dotw" />
                        <img className="object-cover w-full md:hidden" src="/assets/images/others/DOTW-Split-banner-Mobile-Men.webp" alt="dotw" />
                    </Link>
                    <Link to={`campaign/designs-of-the-week-women`} className="w-full">
                        <img className="object-cover w-full hidden md:block" src="/assets/images/others/DOTW-Split-banner-Desktop-Women.webp" alt="dotw" />
                        <img className="object-cover w-full md:hidden" src="/assets/images/others/DOTW-Split-banner-Mobile-Women.webp" alt="dotw" />
                    </Link>
                </div>
            </div>

            <div className="">
                <h2 className="font-bold text-xs md:text-xl md:text-center pt-4 pb-2">TRENDING CATEGORIES</h2>
                <div className="grid grid-cols-2 gap-4 md:gap-0 md:grid-cols-6">
                    {
                        new Array(6).fill('').map((_, i) => (
                            <figure key={i}>
                                <img className="object-cover rounded-xl md:rounded-none" src={`/assets/images/categories/m${i + 1}.jpg`} alt="category" />
                            </figure>
                        ))
                    }
                    {
                        new Array(6).fill('').map((_, i) => (
                            <figure key={i}>
                                <img className="object-cover rounded-xl md:rounded-none" src={`/assets/images/categories/w${i + 1}.jpg`} alt="category" />
                            </figure>
                        ))
                    }
                </div>
            </div>

            <div className="">
                <h2 className="font-bold text-xs md:text-xl md:text-center pt-4 pb-2">TOO HOT TO BE MISSED</h2>
                <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2">
                    {
                        new Array(4).fill('').map((_, i) => (
                            <Link key={i}>
                                <img className="w-full object-cover rounded-xl md:rounded-none" src={`/assets/images/others/THTBM${i + 1}.jpg`} alt="category" />
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className="">
                <h2 className="font-bold text-xs md:text-xl md:text-center pt-4">CATEGORIES TO BAG</h2>
                <div className="grid gap-2 grid-cols-2 md:gap-0 md:grid-cols-6">
                    {
                        new Array(6).fill('').map((_, i) => (
                            <Link key={i}>
                                <img className="w-full object-cover rounded-xl" src={`/assets/images/categories/CTB${i + 1}.jpg`} alt="category" />
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className="">
                <h2 className="font-bold text-xs md:text-xl md:text-center pt-4">TOP ACCESSORIES</h2>
                <div className="grid gap-2 grid-cols-2 md:gap-0 md:grid-cols-4 lg:container m-auto">
                    {
                        new Array(4).fill('').map((_, i) => (
                            <Link key={i}>
                                <img className="w-full object-cover rounded-xl md:rounded-none" src={`/assets/images/categories/a${i + 1}.jpg`} alt="category" />
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className="pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                <ProductSlider filter={{ sellerTag: 'best seller' }} heading={'BESTSELLERS'} />
                <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                    <Link to={'/Men'}>Explore All</Link>
                </div>
            </div>

            <div className="">
                <h2 className="font-bold text-xs md:text-xl text-center py-4">OUR BEST PICKS</h2>
                <div className="grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2">
                    {
                        new Array(4).fill('').map((_, i) => (
                            <Link key={i}>
                                <img className="w-full object-cover rounded-xl md:rounded-none" src={`/assets/images/others/OBP${i + 1}.jpg`} alt="category" />
                            </Link>
                        ))
                    }
                </div>
            </div>

            <div className="">
                <h2 className="font-bold text-xs md:text-xl md:text-center pt-4">EXCLUSIVE GOOF CORNER</h2>
                <ExclusiveGoofCorner />
            </div>
        </div>
    )
}

export default Home;