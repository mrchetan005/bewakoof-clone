/* eslint-disable react/prop-types */

import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { clearAllFilters } from "../../store/slices/filterSlice";
import { LIMIT_PER_PAGE } from "../../constants";


const ProductsGrid = () => {
    const { products, loading } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const clearFilters = () => {
        dispatch(clearAllFilters());
    }

    return (
        <>
            {
                products?.length > 0
                    ? <div className="ProductsGrid clear-both py-3 md:px-2 grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
                        {
                            products?.map((product) => (
                                <Card key={product?._id} {...product} />
                            ))

                        }
                    </div>
                    : loading
                        ?
                        <div className="ProductsGrid clear-both py-3 md:px-2 grid grid-cols-2 md:grid-cols-3 gap-3  lg:gap-10">
                            {
                                new Array(LIMIT_PER_PAGE).fill('').map((_, i) => (
                                    <div key={i} className="skeleton aspect-[5/7] max-h-[450px] bg-gray-300 animate-pulse"></div>
                                ))
                            }
                        </div>
                        : <div className="emptyProducts my-32 w-full flex items-center justify-center text-center flex-col">
                            <p className="mb-5 text-2xl text-[#2d2d2d80]">Sorry, We couldn’t Find any matches!</p>
                            <button onClick={clearFilters} className="border hover:opacity-80 border-[#51cccc] p-3 text-[#51cccc]">
                                <span className="py-4 px-5">Clear Filters</span>
                            </button>
                        </div>
            }
        </>
    )
}

export default memo(ProductsGrid);