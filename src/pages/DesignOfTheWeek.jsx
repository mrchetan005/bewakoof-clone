import { useLoaderData, useLocation } from "react-router-dom";
import Card from "../components/Card/Card";
import ExclusiveGoofCorner from "../components/HomepageEssentials/ExclusiveGoofCorner";


const DesignOfTheWeek = () => {
    const { pathname } = useLocation();
    const products = useLoaderData();

    return (
        <div className="">
            <div className="bannerImage">
                <img className="w-full hidden md:block object-cover" src={`/assets/images/banner/Desktop-DOTW-Banner-${pathname.includes('women') ? 'Women' : 'Men'}.webp`} alt="" />
                <img className="w-full md:hidden object-cover" src={`/assets/images/banner/Mobile-DOTW-Banner-${pathname.includes('women') ? 'Women' : 'Men'}.webp`} alt="" />
            </div>
            <div className="">
                <h2 className="font-medium text-center mt-5 text-lg md:text-xl">Shop Designs of the Week</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 mt-2 gap-[1px] md:gap-8 px-0 md:px-4">
                    {
                        products?.map((product) => (
                            <Card key={product._id} {...product} />
                        ))
                    }
                </div>
                <div className="px-4 md:px-0 my-6">
                    <ExclusiveGoofCorner />
                </div>
            </div>
        </div>
    )
}

export default DesignOfTheWeek;