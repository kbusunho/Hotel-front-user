import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarAlt,
  faUserFriends,
  faSearch,
  faPlus,
  faMinus,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/pages/search/SearchPage.scss";

// ✅ 컴포넌트 임포트 확인
import HotelCard from "../../components/hotel/HotelCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  /* 초기값 설정 */
  const initialDest = searchParams.get("destination") || "";
  const initialCheckIn = searchParams.get("checkIn")
    ? new Date(searchParams.get("checkIn"))
    : new Date();
  const initialCheckOut = searchParams.get("checkOut")
    ? new Date(searchParams.get("checkOut"))
    : new Date();
  const initialRooms = Number(searchParams.get("rooms")) || 1;
  const initialGuests = Number(searchParams.get("guests")) || 2;

  const [destination, setDestination] = useState(initialDest);
  const [checkInDate, setCheckInDate] = useState(initialCheckIn);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
  const [rooms, setRooms] = useState(initialRooms);
  const [guests, setGuests] = useState(initialGuests);
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  /* 카운터 핸들러 */
  const handleCounter = (type, operation) => {
    if (type === "rooms") {
      if (operation === "inc") setRooms((prev) => prev + 1);
      if (operation === "dec" && rooms > 1) setRooms((prev) => prev - 1);
    } else {
      if (operation === "inc") setGuests((prev) => prev + 1);
      if (operation === "dec" && guests > 1) setGuests((prev) => prev - 1);
    }
  };

  /* 더미 데이터 */
  const searchResults = [
    {
      id: 1,
      name: "CVK Park Bosphorus Hotel Istanbul",
      location: "Istanbul",
      rating: 5,
      reviews: 371,
      price: 240,
      image: "/images/hotel1.jpg",
    },
    {
      id: 2,
      name: "Eresin Hotels Sultanahmet",
      location: "Istanbul",
      rating: 4.2,
      reviews: 54,
      price: 104,
      image: "/images/hotel2.jpg",
    },
    {
      id: 3,
      name: "Rixos Pera Istanbul",
      location: "Istanbul",
      rating: 4.8,
      reviews: 120,
      price: 180,
      image: "/images/hotel3.jpg",
    },
  ];

  const btnStyle = {
    width: "3.2rem",
    height: "3.2rem",
    borderRadius: "0.8rem",
    border: "none",
    backgroundColor: "#8DD3BB",
    color: "#112211",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div className="search-page">
      {/* 1. 상단 검색바 영역 (기존 코드 유지) */}
      <div className="search-bar-wrapper">
        <div className="search-container">
          {/* Destination */}
          <div className="input-group">
            <label>Enter Destination</label>
            <div className="input-field">
              <FontAwesomeIcon icon={faBed} />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter Destination"
              />
            </div>
          </div>

          {/* Check In */}
          <div className="input-group">
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

          {/* Check Out */}
          <div className="input-group">
            <label>Check Out</label>
            <div className="input-field">
              <DatePicker
                selected={checkOutDate}
                onChange={setCheckOutDate}
                dateFormat="yyyy-MM-dd"
                className="custom-datepicker"
                minDate={checkInDate}
              />
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
          </div>

          {/* Rooms & Guests */}
          <div className="input-group" style={{ position: "relative" }}>
            <label>Rooms & Guests</label>
            <div
              className="input-field pointer"
              onClick={() => setShowGuestPopup(!showGuestPopup)}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faUserFriends} />
              <span
                className="guest-text"
                style={{
                  marginLeft: "1rem",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {rooms} Room, {guests} Guests
              </span>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  marginLeft: "auto",
                  fontSize: "1.2rem",
                  transform: `rotate(${showGuestPopup ? "90deg" : "0deg"})`,
                  transition: "transform 0.2s",
                }}
              />
            </div>

            {/* 인원수 팝업 */}
            {showGuestPopup && (
              <div
                className="guest-popup"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  background: "#fff",
                  borderRadius: "1.6rem",
                  padding: "2rem",
                  marginTop: "1rem",
                  boxShadow: "0 1rem 3rem rgba(0,0,0,0.15)",
                  zIndex: 20,
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {/* Rooms Counter */}
                <div
                  className="counter-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="label"
                    style={{ fontSize: "1.4rem", fontWeight: 700 }}
                  >
                    Rooms
                  </span>
                  <div
                    className="counter-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    <button
                      onClick={() => handleCounter("rooms", "dec")}
                      disabled={rooms <= 1}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                      {rooms}
                    </span>
                    <button
                      onClick={() => handleCounter("rooms", "inc")}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "#eee",
                    margin: "1.5rem 0",
                  }}
                ></div>

                {/* Guests Counter */}
                <div
                  className="counter-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="label"
                    style={{ fontSize: "1.4rem", fontWeight: 700 }}
                  >
                    Guests
                  </span>
                  <div
                    className="counter-controls"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.5rem",
                    }}
                  >
                    <button
                      onClick={() => handleCounter("guests", "dec")}
                      disabled={guests <= 1}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span style={{ fontSize: "1.6rem", fontWeight: 700 }}>
                      {guests}
                    </span>
                    <button
                      onClick={() => handleCounter("guests", "inc")}
                      style={btnStyle}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="btn-search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* ✅ 2. 메인 컨텐츠 영역 (레이아웃 변경됨) */}
      <div className="container">
        {/* 사이드바와 리스트를 감싸는 Flex 컨테이너 */}
        <div className="search-content-layout">
          
          {/* 왼쪽: 필터 사이드바 */}
          <div className="layout-sidebar">
            <FilterSidebar />
          </div>

          {/* 오른쪽: 호텔 리스트 */}
          <div className="layout-results">
            <div className="results-header">
               <h3>Showing 4 of <span style={{color: '#FF8682'}}>257 places</span></h3>
            </div>
            
            <div className="results-list">
              {searchResults.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SearchPage;