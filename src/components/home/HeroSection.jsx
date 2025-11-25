import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import HeroCard from "./HeroCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // 혹시 모를 스타일 깨짐 방지

import "../../styles/components/home/HeroSection.scss";

// ✅ [핵심 1] Autoplay 모듈 가져오기
import { Pagination, Autoplay } from "swiper/modules";

const HeroSection = () => {
  const heroSlides = [
    {
      title: "신정해보세요",
      subtitle: "퍼펙트 호텔 및 다양한\n숙소를 확인하세요!",
      description:
        "컴퓨터를 통해 유용한 예약과 고객 사을 지원 부웅\n함한 북시즈 확인하세요.",
      backgroundImage: "/images/hero-bg-1.jpg",
      className: "hero-card-1",
    },
    {
      title: "최고의 여행 경험",
      subtitle: "세계 곳곳의 숨겨진\n보석같은 장소들",
      description:
        "특별한 여행을 위한 완벽한 숙소와\n잊지 못할 추억을 만들어보세요.",
      backgroundImage: "/images/hero-bg-2.jpg",
      className: "hero-card-2",
    },
    {
      title: "럭셔리 휴양지",
      subtitle: "프리미엄 리조트에서\n완벽한 휴식을",
      description: "최고급 시설과 서비스로\n당신만의 특별한 시간을 보내세요.",
      backgroundImage: "/images/hero-bg-3.jpg",
      className: "hero-card-3",
    },
  ];

  return (
    <div className="hero-section">
      <Swiper
        // ✅ [핵심 2] 여기에 Autoplay가 꼭 있어야 작동합니다!
        modules={[Pagination, Autoplay]}
        
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
        
        // ✅ [핵심 3] 자동 넘김 설정
        autoplay={{
          delay: 3000, // 3초마다 넘어감
          disableOnInteraction: false, // 마우스로 클릭해도 멈추지 않고 계속 작동
        }}
        speed={1000} // 슬라이드 전환 속도
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroCard
              title={slide.title}
              subtitle={slide.subtitle}
              description={slide.description}
              backgroundImage={slide.backgroundImage}
              className={slide.className}
              searchForm={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;