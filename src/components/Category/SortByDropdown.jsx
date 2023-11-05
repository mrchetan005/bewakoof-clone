/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, sortProducts } from "../../store/slices/filterSlice";
import { filters, sortByFilters, sortByPrice } from "../../constants";



const SortByDropdown = () => {
    const [active, setActive] = useState(sortByFilters.options[0]);

    const { clearedFilters } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (clearedFilters) {
            setActive(sortByFilters.options[0]);
        }
    }, [clearedFilters]);

    const handleClick = (e) => {
        const value = e.target.textContent;
        if (value.includes('Price')) {
            const sortOrder = value === sortByPrice[0]?.name ? sortByPrice[0]?.value : sortByPrice[1]?.value;
            dispatch(sortProducts(sortOrder));
        } else {
            const name = sortByFilters.name
            dispatch(setFilters({ name, value }));
        }
        setActive(value);
    }

    return (
        <button className="sortByButton relative p-3 flex items-center justify-between group">
            <h4 className="text-xs uppercase text-[#2d2d2d80] mr-2 font-bold">Sort By</h4>
            <span className="text-xs capitalize mx-2 font-medium text-[#2d2d2d]">{active}</span>
            <BsChevronDown className='' />
            <div className="dropDownOptions absolute bg-white top-full right-0 min-w-full w-max group-hover:block hidden border shadow-md z-20">
                <ul className='text-left py-4 px-3 text-xs font-medium'>
                    {
                        filters.at(-1).options?.slice(0, 2)?.map((value, i) => (
                            <li onClick={handleClick} key={i} className={`${active === value ? 'text-[#42a2a2]' : ''} transition-all delay-75 capitalize hover:bg-gray-100 py-[5px] px-[10px] `}>{value}</li>
                        ))
                    }
                    {
                        sortByPrice?.map(({ name }) => (
                            <li onClick={handleClick} key={name} className={`${active === name ? 'text-[#42a2a2]' : ''} transition-all delay-75 capitalize hover:bg-gray-100 py-[5px] px-[10px] `}>{name}</li>
                        ))
                    }
                </ul>
            </div>
        </button>
    )
}

export default memo(SortByDropdown);