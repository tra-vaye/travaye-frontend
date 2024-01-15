import React from "react";
import flyer from "../../assets/waitlist.jpg";
import Footer from "../../components/Layout/Footer/Footer";

const WaitList = () => {
  return (
    <div className="h-screen w-screen">
      <img className="w-full h-[30%] md:h-full" src={flyer} />
      <div className="m-auto py-[5%] px-[5%] md:px-[10%]">
        <h4 className="text-center text-[#009F57] text-[25px] font-[600] mb-[1rem]">
          OUR MESSAGE:
        </h4>
        <p className="text-[15px] md:text-[20px] font-[400]">
          We're fine-tuning our next product version with even more
          budget-friendly options. Behind the scenes, we're crafting
          partnerships to bring you richer lifestyle experiences. Explore with
          confidence, knowing your affordable adventures are our top priority.
          As we perfect our next version, your feedback is golden. Take a moment
          to share your thoughts in our test and tell survey. Together, we shape
          the future of affordable exploration. Connect with us on all social
          media platforms to be part of our unfolding story
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default WaitList;
