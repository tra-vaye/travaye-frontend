import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import Lagos from "../../../assets/lagos.png";
import Ibadan from "../../../assets/ibadan.png";
import Abuja from "../../../assets/abuja.png";
import WaterMark from "../../../assets/watermark.png";
import classes from "./Carousel.module.css";
import { IoStarSharp } from "react-icons/io5";

const Data = [
  { location: "Lagos, Nigeria", img: Lagos, rating: 3 },
  { location: "Ibadan, Nigeria", img: Ibadan, rating: 4 },
  { location: "Abuja, Nigeria", img: Abuja, rating: 3 }
];

const Carousel = () => {
  const totalRevs = [1, 2, 3, 4, 5];

  return (
    <>
      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={28}
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
          800: {
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
              <div className={classes.wholecover}>
                <img src={data.img} alt="poster" className="img-fluid" />
                <div className={classes.details}>
                  <img
                    src={WaterMark}
                    alt="watermark"
                    className={classes.watermark}
                  />
                  <div>
                    <p>{data.location}</p>
                    <div className={classes.ratings}>
                      {
                        totalRevs.map(val => (
                          <IoStarSharp key={val} size={32} fill={val <= data.rating ? "#E9A309" : "#D9D9D9"} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Carousel;
