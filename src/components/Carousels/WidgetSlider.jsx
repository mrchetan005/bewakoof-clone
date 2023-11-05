import { Link } from "react-router-dom";

const widgets = ['new arrival', 'best seller', 'Official Merch', 'Customization', 'Combos', 'Vote for Design', 'Last Sizes left', 'Plus Size'];

const WidgetSlider = () => {
    return (
        <div className="flex gap-4 overflow-x-auto w-full lg:container mt-5 ml-2 md:mb-8 mr-8">
            {
                widgets.map((widget, i) => (
                    <Link className="" key={i} state={{ sellerTag: widget }}>
                        <img className='w-full rounded-xl object-cover object-top' src={`/assets/images/widgets/${i + 1}.jpg`} alt="" />
                        <p className="text-xs w-[128px] capitalize font-bold text-center mt-4">{widget}</p>
                    </Link>
                ))
            }
        </div>
    )
}

export default WidgetSlider;