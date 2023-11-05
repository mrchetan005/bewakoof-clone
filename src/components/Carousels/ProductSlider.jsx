/* eslint-disable react/prop-types */
import { memo, useEffect, useRef } from "react";
import Card from "../Card/Card";
import useApi from "../../Hooks/useApi";
import { LIMIT_PER_PAGE } from "../../constants";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// swiper parameters
const swiperParams = {
    slidesPerView: 2.2,
    slidesPerGroup: 2,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
        768: {
            navigation: true,
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
        },
        1000: {
            navigation: true,
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20,
        },
    },
};

const ProductSlider = ({ filter, heading = '' }) => {
    const SwiperRef = useRef(null);
    const randomPage = filter ? 1 : Math.ceil(Math.random() * 100);
    const { data, loading, get } = useApi([]);

    useEffect(() => {
        Object.assign(SwiperRef.current, swiperParams);
        SwiperRef.current.initialize();
        const filterString = filter ? 'filter=' + JSON.stringify(filter) : '';
        get(`/ecommerce/clothes/products?${filterString}&page=${randomPage}&limit=${LIMIT_PER_PAGE}`);
    }, []);

    const handlePrevClick = () => {
        console.log({ elem: SwiperRef.current });
        SwiperRef.current.swiper?.slidePrev();
    }
    const handleNextClick = () => {
        SwiperRef.current.swiper.slideNext();
    }



    return (
        <>
            {heading && <h2 className="font-semibold pb-4 md:text-center pt-8 pl-2 md:pl-0">{heading}</h2>}
            <div className="w-full m-auto relative">
                <div onClick={handlePrevClick} className="absolute border shadow-md hover:shadow-sm border-l-0 hidden md:block z-10 left-0 top-1/2 -translate-y-1/2 cursor-pointer bg-white p-2 py-3 hover:opacity-75"><SlArrowLeft className="w-6 h-6 text-gray-500" /></div>
                <swiper-container
                    init="false"
                    ref={SwiperRef}
                >
                    {
                        data?.data?.map((item) => (
                            <swiper-slide key={item._id}>
                                <div >
                                    <Card {...item} />
                                </div>
                            </swiper-slide>
                        ))
                    }
                    {
                        loading &&
                        new Array(20).fill('').map((_, i) => (
                            <swiper-slide key={i}>
                                <div className="skeleton aspect-[5/7] max-h-[450px] bg-gray-300 animate-pulse"></div>
                            </swiper-slide>
                        ))
                    }

                </swiper-container>
                <div onClick={handleNextClick} className="absolute border shadow-md hover:shadow-sm border-r-0 z-10 hidden md:block right-0 top-1/2 -translate-y-1/2 cursor-pointer bg-white p-2 py-3 hover:opacity-75"><SlArrowRight className="w-6 h-6 text-gray-500" /></div>
            </div>
        </>
    )
}

export default memo(ProductSlider);