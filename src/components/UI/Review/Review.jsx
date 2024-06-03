import styled from "styled-components";
import { A11y, Navigation, Pagination, EffectCoverflow } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "../../../assets/avatar.png";

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

const ReviewCarousel = ({ classes }) => {
  return (
    <Swiper
      className={classes.full}
      slidesPerView={1.7}
      centeredSlides={true}
      modules={[Navigation, A11y, EffectCoverflow, Pagination]}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        stretch: 140,
        depth: 220,
        modifier: 1,
      }}
      loop={true}
      speed={1000}
      navigation
      breakpoints={{
        560: {
          slidesPerView: 1.2,
          centeredSlides: true
        }
      }}
    >
      {reviews.map((data, i) => {
        return (
          <SwiperSlide key={i} className={`w-full flex flex-col border-4 border-[#E9A309] bg-white rounded-lg ${classes.revBox}`}>
            <h4 className={classes.name}>{data.name} says</h4>
            <p className={classes.review}>{data.review}</p>
            <img src={Avatar} alt="" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ReviewCarousel;

const Review = styled.p`

`;


// .name {
//   font-size: 32px;
//   font-weight: 700;
//   line-height: 40px;
//   color: #009F57;
//   margin-bottom: 32px;
// }

// .review {
//   font-size: 28px;
//   font-weight: 600;
//   line-height: 32px;
//   color: #9D9D9D;
//   margin-bottom: 10px;
// }