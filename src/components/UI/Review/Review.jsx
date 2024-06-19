import { A11y, Autoplay, EffectCreative, EffectFade, EffectFlip } from "swiper";
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
      modules={[ A11y, Autoplay ]}
      autoplay={true}
      loop={true}
      speed={2000}
      spaceBetween={28}
      centeredSlides={true}
      breakpoints={{
        0: {
          slidesPerView: 1
        },
        800: {
          slidesPerView: 2
        }
      }}
    >
      {reviews.map((data, i) => {
        return (
          <SwiperSlide key={i} className={`flex flex-col gap-3 border-4 border-[#E9A309] bg-white rounded-lg ${classes.revBox}`}>
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
