import { memo } from "react";
import { Link, createSearchParams } from "react-router-dom";

const widgets = [
    { id: 1, filter: { sellerTag: 'new arrival' } },
    { id: 2, filter: { sellerTag: 'best seller' } },
    { id: 3, filter: { sellerTag: 'Official Merch' } },
    { id: 4, filter: { sellerTag: 'Customization' } },
    { id: 5, filter: { sellerTag: 'Combos' } },
    { id: 6, filter: { sellerTag: 'Vote for Design' } },
    { id: 7, filter: { sellerTag: 'Last Sizes left' } },
    { id: 8, filter: { sellerTag: 'Plus Size' } },
];

const WidgetSlider = () => {
    return (
        <div className="flex gap-4 overflow-x-auto w-full lg:container mt-5 ml-2 md:mb-8 mr-8">
            {
                widgets.map(({ id, filter }) => (
                    <Link to={`/c/${filter.sellerTag}?${createSearchParams(filter)}`} key={id}>
                        <img className='w-full rounded-xl object-cover object-top' src={`/assets/images/widgets/${id}.jpg`} alt="" />
                        <p className="text-xs w-[128px] capitalize font-bold text-center mt-4">{filter.sellerTag}</p>
                    </Link>
                ))
            }
        </div>
    )
}

export default memo(WidgetSlider);