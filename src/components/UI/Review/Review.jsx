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
const reviews = [
  {
    name: "Victor Olawoye",
    occupation: "Photographer",
    review:
      "Travaye is a fantastic app for photographers like me. It provides location-specific tips and tricks and even suggests the best photography spots. I no longer need to rely on multiple sources for planning my shoots. Travaye has consolidated everything I need into one convenient app",
  },
  {
    name: "Sandra Johnson",
    occupation: "Fitness Enthusiast",
    review:
      "Travaye has contributed a lot to my fitness journey. With its extensive database of fitness-friendly locations, healthy dining options, and nearby workout facilities, I can easily access unforgettable fitness experiences",
  },
  {
    name: "Joy Bankole",
    occupation: "Influencer",
    review:
      "I really love this app! It's like it was made for me! The app allows me to budget content trips, share my reviews for points, and grow my audience all from one platform. It's a powerful tool that helps me maintain a consistent online presence, even when I'm on a tight budget.",
  },
  {
    name: "Emeka Nzere",
    occupation: "Student",
    review:
      "You don't want to go out on dates without this app in your pocket!",
  },
  {
    name: "Gbemisola Peters",
    occupation: "Tech Sis",
    review:
      "I didn't even know there were so many coffee shops where i could work till i found this app",
  },
  {
    name: "Dele Ali",
    occupation: "Student",
    review:
      "Shoutout to Travaye! This app helps me find top notch locations within my budget",
  },
  {
    name: "Barnabas Peters",
    occupation: "Photographer",
    review:
      "I am a GenZ Techie trying to live a luxury life without worrying about Sapa and Travaye helps me do just that by helping me find top notch locations I can flex at within my budget. Shoutout to Travaye!",
  },
];
const Data = [
  { location: "Lagos, Nigeria", img: Lagos, rating: "" },
  { location: "Ibadan, Nigeria", img: Ibadan, rating: "" },
  { location: "Abuja, Nigeria", img: Abuja, rating: "" },
];
const ReviewCarousel = ({ classes }) => {
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
      {reviews.map((data, i) => {
        return (
          <SwiperSlide key={i} className="w-full flex flex-col m-0 mx-1 ">
            <Article className=" !break-words">{data?.review}</Article>
            <div className={classes.user}>
              <div className="d-flex justify-content-between flex-wrap">
                <div className="d-flex justify-content-center align-items-center mt-3 me-4 ">
                  <img src={Avatar} alt="avatar" />
                  <div>
                    <p>{data?.name}</p>
                    <p
                      style={{
                        fontWeight: " 700",
                        fontSize: "22px",
                        lineHeight: " 40px",
                        textAlign: "justify",
                        color: " #9d9d9d",
                      }}
                    >
                      {data?.occupation}
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
