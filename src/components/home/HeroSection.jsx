import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, faSearch, faCalendarAlt, faUserFriends, faMinus, faPlus, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/home/HeroSection.scss";

const HeroSection = ({ isCardVisible, onCardEnter, onCardLeave }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const handleSearch = () => {
    navigate({
      pathname: "/search",
      search: createSearchParams({ 
        destination,
        checkIn: checkInDate.toISOString().split('T')[0],
        checkOut: checkOutDate.toISOString().split('T')[0],
        guests,
        rooms
      }).toString(),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  const handleCounter = (type, operation) => {
    if (type === "rooms") {
      if (operation === "inc") setRooms(prev => prev + 1);
      if (operation === "dec" && rooms > 1) setRooms(prev => prev - 1);
    } else {
      if (operation === "inc") setGuests(prev => prev + 1);
      if (operation === "dec" && guests > 1) setGuests(prev => prev - 1);
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-bg" style={{ backgroundImage: "url(/images/hero-bg-1.jpg)" }}></div>
      
      <div className="hero-content">
        <div className="text-section">
          <h1>플러스 호텔 및 다양한<br />숙소를 확인하세요!</h1>
          <p>검색을 통해 요금을 비교하고 무료 취소를 포함한 특가도 확인하세요!</p>
        </div>

        <div className="search-section">
          <h3>Where are you staying?</h3>
          
          <div className="search-form">
            {/* 목적지 */}
            <div className="form-group destination">
              <label>Enter Destination</label>
              <div className="input-field">
                <FontAwesomeIcon icon={faBed} />
                <input 
                  type="text" 
                  placeholder="Search places, hotels..." 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* 체크인 */}
            <div className="form-group">
              <label>Check In</label>
              <div className="input-field">
                <DatePicker
                  selected={checkInDate}
                  onChange={setCheckInDate}
                  dateFormat="yyyy-MM-dd"
                  className="custom-datepicker"
                />
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
            </div>

            {/* 체크아웃 */}
            <div className="form-group">
              <label>Check Out</label>
              <div className="input-field">
                <DatePicker
                  selected={checkOutDate}
                  onChange={setCheckOutDate}
                  dateFormat="yyyy-MM-dd"
                  minDate={checkInDate}
                  className="custom-datepicker"
                />
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
            </div>

            {/* 객실/게스트 */}
            <div className="form-group guests">
              <label>Rooms & Guests</label>
              <div 
                className="input-field pointer"
                onClick={() => setShowGuestPopup(!showGuestPopup)}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faUserFriends} />
                <span>{rooms} Room, {guests} Guests</span>
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  style={{
                    marginLeft: 'auto',
                    transform: `rotate(${showGuestPopup ? '90deg' : '0deg'})`,
                    transition: 'transform 0.2s'
                  }}
                />
              </div>

              {showGuestPopup && (
                <div className="guest-popup">
                  <div className="counter-row">
                    <span>Rooms</span>
                    <div className="counter-controls">
                      <button onClick={() => handleCounter("rooms", "dec")} disabled={rooms <= 1}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{rooms}</span>
                      <button onClick={() => handleCounter("rooms", "inc")}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className="counter-row">
                    <span>Guests</span>
                    <div className="counter-controls">
                      <button onClick={() => handleCounter("guests", "dec")} disabled={guests <= 1}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{guests}</span>
                      <button onClick={() => handleCounter("guests", "inc")}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 검색 버튼 */}
            <button className="btn-search-main" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;