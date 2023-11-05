// import function to register Swiper custom elements
import { useEffect, useRef } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const bannerItems = [
  { id: 1, filter: { brand: 'Bewakoof Air® 1.0', } },
  { id: 2, filter: { subCategory: ['hoodie', 'sweater'], } },
  { id: 3, filter: { brand: ['OFFICIAL NARUTO MERCHANDISE'], } },
  { id: 4, filter: { brand: ['OFFICIAL COCA COLA MERCHANDISE'], } }
]

// swiper parameters
// const swiperParams = {
//   slidesPerView: 1,
//   loop: true,
//   spaceBetween: 10,
//   speed: 1000,
//   navigation: false,
//   pagination: {
//     clickable: true,
//   },
//   autoplay: {
//     delay: 4000,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     768: {
//       slidesPerView: 3,
//     },
//   },
// };

const swiperParams = {
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 10,
  loop: true,
  // speed: 1000,
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
    console.log({ elem: SwiperRef.current });
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
              <Link to='/c' state={{ filter }}>
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