import React, { useState, useRef } from "react"; /* ✅ useRef 추가 */
import Header from "../../components/common/Header";
import HeroSection from "../../components/home/HeroSection";
import PopularDestinations from "../../components/home/PopularDestinations";
import TravelMore from "../../components/home/TravelMore";
import Newsletter from "../../components/common/Newsletter";
import "../../styles/pages/home/HomePage.scss";

const HomePage = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const timeoutRef = useRef(null); // 딜레이 타이머 저장용

  // ✅ 마우스가 들어오면: 닫히려는 타이머 취소하고 보여주기
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsCardVisible(true);
  };

  // ✅ 마우스가 나가면: 0.2초 뒤에 닫기 (바로 닫지 않음!)
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCardVisible(false);
    }, 200); // 0.2초 딜레이
  };

  return (
    <div className="home-page top-container">
      {/* Header에 마우스 이벤트 함수 전달 */}
      <Header 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      />

      <HeroSection 
        isCardVisible={isCardVisible}
        /* HeroSection(카드)에도 마우스 이벤트 함수 전달 */
        onCardEnter={handleMouseEnter}
        onCardLeave={handleMouseLeave}
      />
      
      <PopularDestinations />
      <TravelMore />
      {/* Newsletter는 Footer 내부에 있으므로 여기선 제외 */}
    </div>
  );
};

export default HomePage;