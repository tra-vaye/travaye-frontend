import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import Lagos from "../../../assets/lagos.png";
import Ibadan from "../../../assets/ibadan.png";
import Abuja from "../../../assets/abuja.png";
import WaterMark from "../../../assets/watermark.png";
import ReviewStars from "../../../assets/review-stars.png";
import classes from "./Carousel.module.css";

const Data = [
  { location: "Lagos, Nigeria", img: Lagos, rating: "" },
  { location: "Ibadan, Nigeria", img: Ibadan, rating: "" },
  { location: "Abuja, Nigeria", img: Abuja, rating: "" },
];
const Carousel = () => {
  return (
    <div>
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        grabCursor={true}
        navigation={true}
        loop={true}
        pagination={{ clickable: true }}
        speed={1000}
        breakpoints={{
          1000: {
            slidesPerGroup: 3,
            slidesPerView: 3,
          },
          750: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerGroup: 1,
            slidesPerView: 1,
          },
        }}
        keyboard={{
          enabled: true,
        }}
      >
        {Data.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <div>
                <img src={data.img} alt="poster" className="img-fluid" />
                <div className={classes.details}>
                  <img
                    src={WaterMark}
                    alt="watermark"
                    className={classes.watermark}
                  />
                  <div>
                    <p>{data.location}</p>
                    <img src={ReviewStars} alt="" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
