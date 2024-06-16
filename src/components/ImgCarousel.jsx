// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img1 from '../assets/carousel-img/HeroSection1.png'
import img2 from '../assets/carousel-img/HeroSection2.png'
import img3 from '../assets/carousel-img/HeroSection3.png'
import img4 from '../assets/carousel-img/HeroSection4.png'

const ImgCarousel = () => {
    return ( 
        <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={img1} className='md:rounded-[10px]' alt="" /></SwiperSlide>
        <SwiperSlide><img src={img2} className='md:rounded-[10px]' alt="" /></SwiperSlide>
        <SwiperSlide><img src={img3} className='md:rounded-[10px]' alt="" /></SwiperSlide>
        <SwiperSlide><img src={img4} className='md:rounded-[10px]' alt="" /></SwiperSlide>
      </Swiper>
    </>
     );
}
 
export default ImgCarousel;