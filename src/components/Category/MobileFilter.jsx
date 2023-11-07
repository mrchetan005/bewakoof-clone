/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import Portal from "../Portal";
import { AiOutlineClose } from "react-icons/ai";
import { IoCheckmarkSharp } from "react-icons/io5";
import { filters, sortByFilters, sortByPrice } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFilters, setFilters, sortProducts } from "../../store/slices/filterSlice";


const MobileFilter = () => {
    const [selectedSortBy, setSelectedSortBy] = useState(sortByFilters.options[0]);
    const [toggleFilter, setToggleFilter] = useState(false);
    const [toggleSort, setToggleSort] = useState(false);

    const { filter } = useSelector(state => state.filter);

    const filterArray = Object.keys(filter);
    let index = filterArray.findIndex(key => key === 'subCategory');
    if (index !== -1) filterArray.splice(index, 1, 'category');

    index = filterArray.findIndex(key => key === 'sellerTag');
    if (index !== -1) filterArray.splice(index, 1);

    const filterString = filterArray?.length === 0 ? 'None' : filterArray?.slice(0, 2)?.join(', ') + (filterArray?.length > 2 ? ', +' + filterArray?.slice(2)?.length : '');

    const openSortBy = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setToggleSort(true);
        document.body.style.overflowY = 'hidden';
    }

    const closeSortBy = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setToggleSort(false);
        document.body.style.overflowY = '';
    }

    const openFilterBy = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setToggleFilter(true);
        document.body.style.overflowY = 'hidden';
    }

    const closeFilterBy = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setToggleFilter(false);
        document.body.style.overflowY = '';
    }

    return (
        <div className='fixed md:hidden z-50 bottom-0 left-0 right-0 bg-white h-14 flex items-center shadow'>
            <div onClick={openSortBy} className="sortBox cursor-pointer flex items-center justify-center gap-2 flex-1 border-r h-full">
                <div className={`dot w-[10px] h-[10px] ml-2  rounded-full ${selectedSortBy.length > 0 ? 'bg-[#42a2a2]' : 'bg-black opacity-10'}`} />
                <img src="/assets/icons/sort.svg" alt="" />
                <div className="flex flex-col capitalize">
                    <h3 className="text-xs text-[#525252] font-bold">Sort</h3>
                    <p className="text-[10px] text-[#737373]">{selectedSortBy}</p>
                </div>
                {
                    toggleSort &&
                    <Portal onClose={closeSortBy}>
                        <SortBy onClose={closeSortBy} selectedSortBy={selectedSortBy} setSelectedSortBy={setSelectedSortBy} />
                    </Portal>
                }
            </div>

            <div onClick={openFilterBy} className="filterBox cursor-pointer flex items-center justify-center gap-2 flex-1 border-l h-full">
                <div className={`dot w-[10px] h-[10px] ml-2  rounded-full ${filterArray?.length !== 0 ? 'bg-[#42a2a2]' : 'bg-black opacity-10'}`} />
                <img src="/assets/icons/filter.svg" alt="" />
                <div className="flex flex-col capitalize">
                    <h3 className="text-xs text-[#525252] font-bold">Filter</h3>
                    <p className="text-[10px] text-[#737373]">{filterString}</p>
                </div>
                {
                    toggleFilter &&
                    <Portal onClose={closeFilterBy}>
                        <FilterBy onClose={closeFilterBy} />
                    </Portal>
                }
            </div>
        </div>
    )
}

export default memo(MobileFilter);

const SortBy = (({ onClose, selectedSortBy, setSelectedSortBy }) => {

    const handleClose = (e) => {
        e?.stopPropagation && e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }

    const { clearedFilters } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (clearedFilters) {
            setSelectedSortBy(sortByFilters.options[0]);
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
        setSelectedSortBy(value);
        onClose(e);
    }

    return (
        <div onClick={handleClose} className="relative w-full h-full bg-[#0000008a]">
            <div className="bg-white absolute w-full bottom-0">
                <div className="p-4 flex items-center justify-between border-b shadow-sm">
                    <h4 className="font-bold">Sort By</h4>
                    <AiOutlineClose onClick={onClose} className="w-5 h-5 object-cover" />
                </div>
                <ul className="flex flex-col text-xs">
                    {
                        filters.at(-1).options?.slice(0, 2)?.map((value, i) => (
                            <li onClick={handleClick} key={i} className={`${selectedSortBy === value ? 'font-bold' : ''}  capitalize hover:bg-gray-100 p-4 flex`}>{value}{selectedSortBy === value && <div className="dot w-[10px] h-[10px] ml-1 bg-[#42a2a2] rounded-full"></div>}</li>
                        ))
                    }
                    {
                        sortByPrice?.map(({ name }) => (
                            <li onClick={handleClick} key={name} className={`${selectedSortBy === name ? 'font-bold' : ''}   capitalize hover:bg-gray-100 p-4 flex`}>{name}{selectedSortBy === name && <div className="dot w-[10px] h-[10px] ml-2 bg-[#42a2a2] rounded-full"></div>}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
})

const FilterBy = ({ onClose }) => {
    const [expanded, setExpanded] = useState(0);

    const handleClose = (e) => {
        e?.stopPropagation && e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }

    const dispatch = useDispatch();

    const handleApply = (e) => {
        onClose(e);
    }

    const handleClearAll = () => {
        dispatch(clearAllFilters());
    }


    return (
        <div onClick={handleClose} className="relative w-full h-full bg-[#0000008a]">
            <div className="bg-white absolute w-full bottom-0 h-4/5 overflow-y-auto pb-10">
                <div className="p-4 flex items-center justify-between border-b shadow-sm sticky top-0 bg-white z-10">
                    <h4 className="font-bold">Filter</h4>
                    <button onClick={handleClearAll} className="text-sm text-[#42a2a2] font-medium">Clear All</button>
                </div>
                <div className="flex relative ">
                    <ul className="flex flex-col text-xs bg-[#0000000d] flex-1 h-max border border-r-0 sticky top-14 w-32">
                        {
                            filters?.slice(0, -1)?.map(({ name, heading }, i) => (
                                <li onClick={() => setExpanded(i)} key={name} className={`p-4 cursor-pointer ${expanded === i ? 'bg-white font-bold' : ''}`}>{heading}</li>
                            ))
                        }
                    </ul>
                    <ul className="h-[700px] overflow-y-auto flex-[2]">
                        {
                            filters[expanded]?.options?.map((value) => (
                                <CategoryAccordionMobile key={value} name={filters[expanded].name} value={value} />
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="flex font-medium items-center justify-center text-center bg-white absolute bottom-0 w-full shadow border-t">
                <div onClick={onClose} className="flex-1 px-4 py-3 cursor-pointer opacity-70">CLOSE</div>
                <div onClick={handleApply} className="flex-1 px-4 py-3 cursor-pointer bg-[#42a2a2] text-white ">APPLY</div>
            </div>
        </div>
    )
}

const CategoryAccordionMobile = ({ name, value }) => {
    const { filter } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const handleFilterClick = (value) => {
        dispatch(setFilters({ name, value }));
    }


    return (
        <li onClick={() => handleFilterClick(value)} className={`cursor-pointer capitalize p-4 text-sm flex items-center gap-3`}>
            <div className={`inline-block border  ${filter[name]?.includes(value) ? 'bg-[#42a2a2] border-[#42a2a2]' : 'border-[#0000008a]'} `}><IoCheckmarkSharp className={`text-white`} /></div>
            {value}
        </li>
    )
}