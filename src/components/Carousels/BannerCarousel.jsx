// import function to register Swiper custom elements
import { useEffect, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link, createSearchParams } from 'react-router-dom';
import { bannerItems } from '../../constants';


const swiperParams = {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 10,
  loop: true,
  speed: 1000,
  autoPlay: true,
  breakpoints: {
    200: {
      slidesPerView: 1,
    },
    768: {
      navigation: true,
      slidesPerView: 3,
    }
  },
};

const Carousel = () => {
  const SwiperRef = useRef(null);

  useEffect(() => {
    Object.assign(SwiperRef.current, swiperParams);
    SwiperRef.current.initialize();
  }, []);

  const handlePrevClick = () => {
    SwiperRef.current.swiper?.slidePrev();
  }
  const handleNextClick = () => {
    SwiperRef.current.swiper.slideNext();
  }


  useEffect(() => {
    Object.assign(SwiperRef.current, swiperParams);
    SwiperRef.current.initialize();
  }, []);

  return (
    <div className='relative'>
      <div onClick={handlePrevClick} className="absolute shadow-md h-10 w-10 hidden md:flex items-center justify-center hover:shadow-sm  rounded-full z-10 left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white bg-opacity-50 hover:bg-opacity-40"><SlArrowLeft className="w-6 h-6 text-gray-500 mr-1" /></div>
      <swiper-container
        init="false"
        ref={SwiperRef}
      >
        {
          bannerItems?.map(({ id, filter }) => (
            <swiper-slide key={id} >
              <Link to={`/Men?${createSearchParams(filter)}`} state={{ filter }}>
                <img className='rounded-[12px] md:rounded-[0] aspect-[4/5] md:aspect-auto object-cover' src={`/assets/images/banner/${id}.jpg`} alt="" />
              </Link>
            </swiper-slide>
          ))
        }

      </swiper-container>
      <div onClick={handleNextClick} className="absolute shadow-md h-10 w-10 hidden md:flex items-center justify-center hover:shadow-sm  rounded-full z-10 right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white bg-opacity-50 hover:bg-opacity-40"><SlArrowRight className="w-6 h-6 text-gray-500 ml-1" /></div>
    </div>
  )
}

export default Carousel;