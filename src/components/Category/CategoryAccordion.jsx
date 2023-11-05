/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { memo, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { setFilters } from "../../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";


const CategoryAccordion = ({ name, heading, options }) => {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState([]);

    const { clearedFilters } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (clearedFilters) {
            setSelected([]);
        }
    }, [clearedFilters]);

    const handleClick = () => {
        setExpanded(!expanded);
    }

    const handleSelected = (value) => {
        setSelected(prev => {
            const index = prev.indexOf(value);
            if (index === -1) {
                return [...prev, value];
            } else {
                prev.splice(index, 1);
                return [...prev];
            }
        });

        window.scrollTo(0, 0);

        dispatch(setFilters({ name, value }));
    }

    return (
        <div className="accordionBox border-b relative">
            <div onClick={handleClick} className="accordionHeader py-4 flex justify-between items-center cursor-pointer font-medium">
                <div className="flex items-center">{heading} {selected.length > 0 && <div className="dot w-[10px] h-[10px] ml-2 bg-[#42a2a2] rounded-full"></div>}</div>
                <span className="pt-1">
                    {
                        expanded ? <BsChevronUp /> : <BsChevronDown />
                    }
                </span>
            </div>
            {
                expanded &&
                <div className="listingBox">
                    {
                        name === 'color'
                            ? <ul className='py-4 px-3 text-xs gap-4 flex flex-wrap'>
                                {
                                    options?.map((value, i) => (
                                        <li title={value} style={{ backgroundColor: value }} onClick={() => handleSelected(value)} key={i} className={`${selected.includes(value) ? 'activeColor' : ' border border-[#ebebeb]'} h-8 w-8 p-1 rounded-sm transition-all cursor-pointer`}></li>
                                    ))
                                }
                            </ul>
                            : <ul className='text-left py-4 px-3 text-xs font-medium'>
                                {
                                    options?.map((value, i) => (
                                        <li onClick={() => handleSelected(value)} key={i} className={`${selected.includes(value) ? 'text-[#3d9999] hover:text-[#42a2a2] bg-slate-100 border-b' : ' text-[#2d2d2db3] hover:text-[#2d2d2d]'} uppercase transition-all hover:bg-slate-100 py-[5px] px-[10px] cursor-pointer`}>{value}</li>
                                    ))
                                }
                            </ul>
                    }
                </div>
            }
        </div>
    )
}

export default memo(CategoryAccordion);