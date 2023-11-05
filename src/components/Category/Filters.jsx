/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllFilters } from '../../store/slices/filterSlice';
import CategoryAccordion from './CategoryAccordion';
import { filters } from '../../constants';
import { useLocation } from 'react-router-dom';

const Filters = () => {
    const { clearedFilters } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const clearFilters = () => {
        dispatch(clearAllFilters());
    }

    useEffect(() => {
        clearFilters();
    }, [pathname])

    return (
        <div className="px-4 pb-3 overflow-y-auto h-[calc(100vh-90px)]">
            <div className="filterHeading py-3 flex items-center justify-between">
                <h4 className="text-xs uppercase text-[#2d2d2d80] mr-2 font-bold">Filters</h4>
                <button className="clearAllBtn" style={{ display: clearedFilters ? 'none' : 'block' }} onClick={clearFilters}>
                    <span className="text-xs text-[#42a2a2] font-semibold">Clear All</span>
                </button>
            </div>
            <div className="filterWrap">
                <div className="accordionWrapper flex flex-col">
                    {
                        filters?.slice(0, -1)?.map(({ name, heading, options }) => (
                            <CategoryAccordion key={name} heading={heading} name={name} options={options} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Filters);