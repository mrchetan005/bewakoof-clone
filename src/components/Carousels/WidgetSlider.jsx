import { memo } from "react";
import { Link, createSearchParams } from "react-router-dom";

const widgets = [
    { id: 1, name: 'New Arrivals', filter: { sellerTag: 'new arrival' } },
    { id: 2, name: 'Winterwear', filter: { subCategory: 'sweater_hoodie' } },
    { id: 3, name: 'Best Sellers', filter: { sellerTag: 'best seller' } },
    { id: 4, name: 'Customizations', filter: { sellerTag: 'Customization' } },
    { id: 5, name: 'Combos', filter: { sellerTag: 'Combos' } },
    { id: 6, name: 'Vote for Design', filter: { sellerTag: 'Vote for Design' } },
    { id: 7, name: 'Last Sizes Left', filter: { size: 'L_XL' } },
    { id: 8, name: 'Plus Size', filter: { size: 'XXL' } },
];

const WidgetSlider = () => {
    return (
        <div className="flex gap-4 overflow-x-auto w-full lg:container mt-10 ml-2 md:mb-8 mr-8">
            {
                widgets.map(({ id, name, filter }) => (
                    <Link to={`/c/${filter.sellerTag}?${createSearchParams(filter)}`} key={id}>
                        <img className='w-full rounded-xl object-cover object-top' src={`/assets/images/widgets/${id}.jpg`} alt="" />
                        <p className="text-xs w-[128px] capitalize font-bold text-center mt-4">{name}</p>
                    </Link>
                ))
            }
        </div>
    )
}

export default memo(WidgetSlider);