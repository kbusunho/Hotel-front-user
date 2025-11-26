import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, faCalendarAlt, faUserFriends, faChevronRight, faCog, faCreditCard, faUser, faSignOutAlt,
  faPlus, faMinus /* ✅ 아이콘 추가 */
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "../common/LogoutModal"; 
import "../../styles/components/home/HeroSection.scss";

const bgImages = ["/images/hero-bg-1.jpg", "/images/hero-bg-2.jpg", "/images/hero-bg-3.jpg"];

const HeroSection = ({ isCardVisible, onCardEnter, onCardLeave }) => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  /* 날짜 상태 */
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const thirdDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 3);
  const [checkInDate, setCheckInDate] = useState(firstDayOfMonth);
  const [checkOutDate, setCheckOutDate] = useState(thirdDayOfMonth);

  /* ✅ [추가] 방 & 인원 상태 관리 */
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showGuestPopup, setShowGuestPopup] = useState(false); // 팝업 열림 여부

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
  };

  /* ✅ 카운트 증가/감소 핸들러 */
  const handleCounter = (type, operation) => {
    if (type === 'rooms') {
      if (operation === 'inc') setRooms(prev => prev + 1);
      if (operation === 'dec' && rooms > 1) setRooms(prev => prev - 1);
    } else {
      if (operation === 'inc') setGuests(prev => prev + 1);
      if (operation === 'dec' && guests > 1) setGuests(prev => prev - 1);
    }
  };

  return (
    <div className="hero-section">
      {/* ... (상단 Swiper 및 고정 콘텐츠는 기존 유지) ... */}
      <Swiper
        spaceBetween={0} slidesPerView={1} loop={true} speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {bgImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="hero-bg" style={{ backgroundImage: `url(${img})` }}></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed-content-overlay">
        <div className="inner-content">
          <div className="text-area">
            <h1>플러스 호텔 및 다양한<br />숙소를 확인하세요!</h1>
            <p>검색을 통해 요금을 비교하고 무료 취소를 포<br />함한 특가도 확인하세요!</p>
          </div>

          {isCardVisible && (
            <div 
              className="user-dashboard-card"
              onMouseEnter={onCardEnter}
              onMouseLeave={onCardLeave}
            >
              <div className="card-header">
                <div className="avatar-large"></div>
                <div className="user-info">
                  <span className="name">Tomhoon</span>
                  <span className="status">Online</span>
                </div>
              </div>
              <ul className="card-menu">
                <li><FontAwesomeIcon icon={faUser} /> 계정 <FontAwesomeIcon icon={faChevronRight} className="arrow"/></li>
                <li><FontAwesomeIcon icon={faCreditCard} /> 결제내역 <FontAwesomeIcon icon={faChevronRight} className="arrow"/></li>
                <li><FontAwesomeIcon icon={faCog} /> 설정 <FontAwesomeIcon icon={faChevronRight} className="arrow"/></li>
                <li className="logout" onClick={() => setShowModal(true)}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '1rem'}}/> 로그아웃
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 하단 검색창 */}
      <div className="search-bar-container">
        <h3>Where are you staying?</h3>
        <div className="search-inputs">
          {/* Destination (기존) */}
          <div className="input-group">
            <label>Enter Destination</label>
            <div className="input-field">
              <FontAwesomeIcon icon={faBed} />
              <input type="text" placeholder="신라스테이 플러스, 서울" />
            </div>
          </div>

          {/* Check In (기존) */}
          <div className="input-group">
            <label>Check In</label>
            <div className="input-field">
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* Check Out (기존) */}
          <div className="input-group">
            <label>Check Out</label>
            <div className="input-field">
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
                minDate={checkInDate}
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* ✅ [수정됨] Rooms & Guests 커스텀 팝업 */}
          <div className="input-group" style={{ position: 'relative' }}>
            <label>Rooms & Guests</label>
            <div 
              className="input-field pointer" 
              onClick={() => setShowGuestPopup(!showGuestPopup)}
            >
              <FontAwesomeIcon icon={faUserFriends} />
              {/* 현재 선택된 값 표시 */}
              <span className="guest-text">
                {rooms} Room, {guests} Guests
              </span>
              <FontAwesomeIcon 
                icon={faChevronRight} 
                style={{ 
                  marginLeft: 'auto', 
                  fontSize: '1.2rem', 
                  transform: `rotate(${showGuestPopup ? '90deg' : '0deg'})`,
                  transition: 'transform 0.2s'
                }} 
              />
            </div>

            {/* 팝업 메뉴 */}
            {showGuestPopup && (
              <div className="guest-popup">
                {/* 방 개수 조절 */}
                <div className="counter-row">
                  <span className="label">Rooms</span>
                  <div className="counter-controls">
                    <button onClick={() => handleCounter('rooms', 'dec')} disabled={rooms <= 1}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="count">{rooms}</span>
                    <button onClick={() => handleCounter('rooms', 'inc')}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                
                <div className="divider"></div>

                {/* 인원 수 조절 */}
                <div className="counter-row">
                  <span className="label">Guests</span>
                  <div className="counter-controls">
                    <button onClick={() => handleCounter('guests', 'dec')} disabled={guests <= 1}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="count">{guests}</span>
                    <button onClick={() => handleCounter('guests', 'inc')}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </div>
  );
};

export default HeroSection;