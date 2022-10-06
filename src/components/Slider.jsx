import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import kazik from "../assets/kazik.png";
import { Autoplay, Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = () => {
  return (
    <div className="w-full h-[vh] md:h-[98vh] ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[50%]"
      >
        <SwiperSlide>
          <div>
            <img src={kazik} className="w-full h-full" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
