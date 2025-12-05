import React, { useState, useRef } from "react";
/* ✅ HeroSection 다시 import */
import HeroSection from "../../components/home/HeroSection";
import PopularDestinations from "../../components/home/PopularDestinations";
import TravelMore from "../../components/home/TravelMore";
import Newsletter from "../../components/common/Newsletter";
import "../../styles/pages/home/HomePage.scss";

const HomePage = () => {
  /* ... (기존 state 및 핸들러들 유지) ... */
  const [isCardVisible, setIsCardVisible] = useState(false);
  const timeoutRef = useRef(null);
  const handleMouseEnter = () => {
    /*...*/
  };
  const handleMouseLeave = () => {
    /*...*/
  };

  return (
    <div className="home-page top-container">
      {/* Header는 MainLayout에 있으니 생략 */}

      {/* ✅ [복구] 여기서만 HeroSection이 나옴! */}
      <HeroSection
        isCardVisible={isCardVisible}
        onCardEnter={handleMouseEnter}
        onCardLeave={handleMouseLeave}
      />

      <PopularDestinations />
      <TravelMore />
      <Newsletter />
    </div>
  );
};

export default HomePage;
