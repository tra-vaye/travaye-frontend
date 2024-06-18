import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { A11y, Autoplay } from "swiper";
import explore2 from '../../../assets/Explore/explore2.jpg'
import explore3 from '../../../assets/Explore/explore3.JPG'
import explore4 from '../../../assets/Explore/explore4.JPG'
import explore5 from '../../../assets/Explore/explore5.JPG'
import explore6 from '../../../assets/Explore/explore6.JPG'
import explore7 from '../../../assets/Explore/explore7.JPG'
import explore8 from '../../../assets/Explore/explore8.JPG'
import explore9 from '../../../assets/Explore/explore9.JPG'
import explore11 from '../../../assets/Explore/explore11.jpg'
import explore12 from '../../../assets/Explore/explore12.jpg'
import explore13 from '../../../assets/Explore/explore13.jpg'
import explore14 from '../../../assets/Explore/explore14.jpg'
import explore15 from '../../../assets/Explore/explore15.jpg'
import explore17 from '../../../assets/Explore/explore17.jpg'
import explore18 from '../../../assets/Explore/explore18.jpg'
import explore19 from '../../../assets/Explore/explore19.jpg'
// import classes from "./Explore.module.css";

const Data = [
    explore2, explore3, explore4, explore5, explore6, explore7, explore8, explore9, explore11, explore12, explore13, explore14, explore15, explore17, explore18, explore19
];

const ExploreCarousel = ({classes}) => {
  return (
    <>
      <Swiper
        className={classes.full}
        spaceBetween={16}
        modules={[A11y, Autoplay]}
        autoplay
        loop={true}
        speed={800}
        breakpoints={{
          1000: {
            slidesPerView: 4,
            slidesPerGroup: 2,
          },
          600: {
            slidesPerView: 3,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          }
        }}
      >
        {Data.map((data, i) => {
          return (
            <SwiperSlide key={i} className={`sm:h-auto h-[360px] ${classes.wholecover}`}>
              <img src={data} alt="poster" className="w-full h-full" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ExploreCarousel;
