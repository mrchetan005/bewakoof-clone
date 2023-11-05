import { register } from 'swiper/element/bundle';
import 'swiper/element/css/autoplay';
import 'swiper/element/css/thumbs';
import 'swiper/element/css/navigation';
import 'swiper/element/css/pagination';
import 'swiper/element/css/controller';
// register Swiper custom elements
register();

export { default as BannerCarousel } from './BannerCarousel';
export { default as ProductSlider } from './ProductSlider';
export { default as WidgetSlider } from './WidgetSlider';
export { default as StickySlider } from './StickySlider';
