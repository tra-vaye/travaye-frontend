import styled from "styled-components";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Abuja from "../../../assets/abuja.png";
import Avatar from "../../../assets/avatar.png";
import Ibadan from "../../../assets/ibadan.png";
import Lagos from "../../../assets/lagos.png";
import ReviewStars from "../../../assets/review-stars.png";
import { ScrollLeftBtn, ScrollRightBtn } from "../Buttons";

const Data = [
  { location: "Lagos, Nigeria", img: Lagos, rating: "" },
  { location: "Ibadan, Nigeria", img: Ibadan, rating: "" },
  { location: "Abuja, Nigeria", img: Abuja, rating: "" },
];
const ReviewCarousel = ({ classes }) => {
  console.log(classes);
  return (
    <Swiper
      slidesPerView={1}
      slidesPerGroup={1}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      grabCursor={true}
      // navigation={true}
      loop={true}
      // pagination={{ clickable: true }}
      speed={1000}
      navigation={{
        nextEl: ".scroll-right-btn", // Use your class name for ScrollRightBtn
        prevEl: ".scroll-left-btn", // Use your class name for ScrollLeftBtn
      }}
      breakpoints={{
        1000: {
          slidesPerGroup: 1,
          slidesPerView: 1,
        },
        750: {
          slidesPerView: 1,
          slidesPerGroup: 1,
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
          <SwiperSlide key={i} className="w-full flex flex-col m-0 mx-1 ">
            <Article className=" !break-words">
              I am a GenZ Techie trying to live a luxury life without worrying
              about Sapa and Travaye helps me do just that by helping me find
              top notch locations I can flex at within my budget. Shoutout to
              Travaye!{" "}
            </Article>
            <div className={classes.user}>
              <div className="d-flex justify-content-between flex-wrap">
                <div className="d-flex justify-content-center align-items-center mt-3 me-4 ">
                  <img src={Avatar} alt="avatar" />
                  <div>
                    <p>Barnabas Peters</p>
                    <p
                      style={{
                        fontWeight: " 700",
                        fontSize: "22px",
                        lineHeight: " 40px",
                        textAlign: "justify",
                        color: " #9d9d9d",
                      }}
                    >
                      Photographer
                    </p>
                    <div className={classes.stars}>
                      <img src={ReviewStars} alt="stars" className="mt-3 " />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center justify-self-center mx-auto mt-3">
                  <ScrollRightBtn className="review-scroll scroll-right-btn" />
                  <ScrollLeftBtn className="review-scroll scroll-left-btn" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ReviewCarousel;

const Article = styled.article`
  height: auto;
  width: 100%;
`;
