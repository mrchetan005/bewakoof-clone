
import { useEffect, useState } from 'react';
import useApi from '../../Hooks/useApi';
import SortByDropdown from './SortByDropdown';
import Filters from './Filters';
import ProductsGrid from './ProductsGrid';
import { useLocation } from 'react-router-dom';
import { LIMIT_PER_PAGE } from '../../constants';
import { useSelector } from 'react-redux';
import { checkEqual } from '../../Utils/CommonFunctions';
import MobileFilter from './MobileFilter';

const CategoryWrapper = () => {
    const [previousFilter, setPreviousFilter] = useState({});
    const [moreData, setMoreData] = useState([]);
    const [page, setPage] = useState(1);
    const { pathname } = useLocation();
    const { data, loading, get } = useApi([]);

    const { isIntersecting } = useSelector(state => state.intersection);
    let { filter, sort } = useSelector(state => state.filter);

    useEffect(() => {
        if (moreData?.length > (LIMIT_PER_PAGE * page) - 1) {
            setPage(prev => prev + 1);
        }
    }, [isIntersecting])

    const fetchData = (page) => {
        const flag = checkEqual(previousFilter, filter);
        if (!flag) {
            filter = { ...filter, gender: pathname.split('/')[1] };
            let url = `/ecommerce/clothes/products?filter=${JSON.stringify(filter)}&page=${page}&limit=${LIMIT_PER_PAGE}`;
            if (sort !== 0) {
                url += `&sort={"price":${sort}}`;
            }
            get(url);
            setPreviousFilter(filter);
        }
    }

    console.log('filter', filter);

    useEffect(() => {
        if (page !== 1) {
            fetchData(page);
        }
    }, [page]);

    useEffect(() => {
        setPage(1);
        setMoreData([]);
        fetchData(1);
        window.scrollTo({
            top: 0,
        })
    }, [filter, sort, pathname]);

    useEffect(() => {
        if (data?.data) {
            if (page === 1) {
                setMoreData([...data.data]);
            } else {
                setMoreData(prev => [...prev, ...data.data]);
            }
        }
    }, [data]);

    return (
        <>
            <div className="lg:container">
                <div className="headingInner sticky top-14 md:relative md:top-0 bg-white z-10 pt-5 w-full md:mt-11 px-4 md:px-0">
                    <div className='m-auto md:m-0 w-max'>
                        <h1 className="searchResult capitalize float-left text-2xl font-bold truncate text-[#2d2d2d]">{pathname.split('/')[1].split('-').join(' ')}</h1>
                        <span className="totalProductCount text-2xl pl-2 text-[#949494]">({moreData?.length})</span>
                        <div className=" left-0 w-7/12 h-[2px] bg-[#fbd139] mt-[6px] ml-[2px]"></div>
                    </div>
                </div>

                <div className="categoryInnerWrapper relative my-5 md:mt-10 flex">
                    <div className="filterContainer basis-1/4 hidden md:block sticky top-24 h-fit">
                        <Filters />
                    </div>
                    <div className="categoryGridWrapper md:basis-3/4 px-1 md:px-4 clear-both">
                        <div className="sortByWrapper hidden md:block mr-4 w-max float-right">
                            <SortByDropdown />
                        </div>
                        <ProductsGrid products={moreData} loadingProducts={loading} />
                    </div>
                </div>
            </div>
            <MobileFilter />
        </>
    )
}

export default CategoryWrapper;
