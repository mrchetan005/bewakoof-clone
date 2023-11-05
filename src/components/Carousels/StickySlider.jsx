/* eslint-disable react/prop-types */
import { useMemo, useRef } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";



const StickySlider = ({ images }) => {
    const verticalSwiperRef = useRef();
    const horizontalSwiperRef = useRef();

    const horizontalSliderProps = useMemo(() => innerWidth > 768 ? ({}) : ({
        'pagination-clickable': 'true'
    }), [])

    const handlePrevClick = () => {
        // console.log({ elem: verticalSwiperRef.current });
        horizontalSwiperRef.current.swiper?.slidePrev();
    }
    const handleNextClick = () => {
        horizontalSwiperRef.current.swiper.slideNext();
    }

    return (
        <div className='flex gap-5 h-[70vh] md:h-[470px] xl:h-[575px] overflow-hidden pb-2'>
            <div className="md:w-1/5 hidden md:flex flex-col gap-2">
                <div onClick={handlePrevClick} className=" cursor-pointer flex items-center justify-center truncate"><SlArrowUp /></div>
                <swiper-container
                    ref={verticalSwiperRef}
                    class='myThumbSlider my-thumbs'
                    space-between='5'
                    slides-per-view={images.length < 3 ? images.length : 3}
                    loop='true'
                    direction='vertical'
                >
                    {
                        images?.map((image, i) => (
                            <swiper-slide class='verticalSlide' key={i} >
                                <div className=''>
                                    <img className='aspect-[4/5] object-contain md:object-cover object-center' src={image || `/assets/images/banner/1.jpg`} alt="" />
                                </div>
                            </swiper-slide>
                        ))
                    }

                </swiper-container>
                <div onClick={handleNextClick} className=" cursor-pointer flex items-center justify-center"><SlArrowDown /></div>
            </div>
            <div className="w-full md:w-4/5">
                <swiper-container
                    ref={horizontalSwiperRef}
                    controller-control=".verticalSwiper"
                    thumbs-swiper=".my-thumbs"
                    loop='true'
                    direction="horizontal"
                    slides-per-view="1"
                    {...horizontalSliderProps}
                >
                    {
                        images?.map((image, i) => (
                            <swiper-slide class='horizontalSlide' key={i} >
                                <div className=''>
                                    <img className='md:w-full !object-contain md:object-cover object-center' src={image || `/assets/images/banner/1.jpg`} alt="" />
                                </div>
                            </swiper-slide>
                        ))
                    }
                </swiper-container>
            </div>
        </div>
    )
}

export default StickySlider;