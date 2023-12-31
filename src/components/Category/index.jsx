
import { useEffect, useState } from 'react';
import SortByDropdown from './SortByDropdown';
import Filters from './Filters';
import ProductsGrid from './ProductsGrid';
import { useLocation, useSearchParams } from 'react-router-dom';
import { LIMIT_PER_PAGE } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import MobileFilter from './MobileFilter';
import { clearAllFilters, clearProducts, setFilterFromParams } from '../../store/slices/filterSlice';
import { getFilteredProducts } from '../../store/asyncThunks/filterAsyncThunk';

const CategoryWrapper = () => {
    const [page, setPage] = useState(1);
    const [previousFilterUrl, setPreviousFilterUrl] = useState('');
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const pathnameArray = pathname.split('/');
    const heading = pathnameArray[1] === 'c' || pathnameArray[1] === 'search' ? decodeURI(pathnameArray[2]) : decodeURI(pathnameArray[1]);

    const { isIntersecting } = useSelector(state => state.intersection);
    let { products, filter, sort } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (products?.length > (LIMIT_PER_PAGE * page) - 1) {
            setPage(prev => prev + 1);
        }
    }, [isIntersecting]);

    const fetchData = (page) => {
        // checking if search page or not
        // search api accepts only one value as string
        // so here updating last selected value only for search
        const filterObj = { ...filter };
        if (pathnameArray[1] === 'search') {
            for (const key in filterObj) {
                if (Array.isArray(filterObj[key])) {
                    filterObj[key] = filterObj[key].at(-1);
                }
            }
        }

        let url = `/ecommerce/clothes/products?${pathnameArray[1] === 'search' ? 'search' : 'filter'}=${JSON.stringify(filterObj)}&page=${page}&limit=${LIMIT_PER_PAGE}`;

        if (sort !== 0) {
            url += `&sort={"price":${sort}}`;
        }
        const flag = url === previousFilterUrl;
        if (!flag) {
            setPreviousFilterUrl(url);
            dispatch(getFilteredProducts({ url, page }));
        }
    }

    useEffect(() => {
        if (page !== 1) {
            fetchData(page);
        }
    }, [page]);

    useEffect(() => {
        dispatch(clearProducts());
        setPage(1);
        fetchData(1);
    }, [filter, sort]);

    useEffect(() => {
        // collecting filters from query params
        // converting them to array for multiple filters
        const filterFromParams = {};
        searchParams.forEach((value, key) => {
            filterFromParams[key] = value.split('_');
        });
        if (pathnameArray[1].toLowerCase().includes('men')) {
            filterFromParams.gender = pathname.split('/')[1];
        }
        if (Object.keys(filterFromParams).length > 0) {
            dispatch(setFilterFromParams(filterFromParams));
        } else {
            dispatch(clearAllFilters());
        }
    }, [pathname]);

    return (
        <>
            <div className="lg:container">
                <div className="headingInner sticky top-14 md:relative md:top-0 bg-white z-10 pt-5 w-full md:mt-11 px-4 md:px-0">
                    <div className='m-auto md:m-0 w-max'>
                        <h1 className="searchResult capitalize float-left text-2xl font-bold truncate text-[#2d2d2d]">{heading}</h1>
                        <span className="totalProductCount text-2xl pl-2 text-[#949494]">({products?.length})</span>
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
                        <ProductsGrid />
                    </div>
                </div>
            </div>
            <div className='md:hidden'>
                <MobileFilter />
            </div>
        </>
    )
}

export default CategoryWrapper;
