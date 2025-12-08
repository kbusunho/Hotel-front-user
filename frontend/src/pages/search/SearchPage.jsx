/* src/pages/search/SearchPage.jsx */
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
import HotelCard from "../../components/hotel/HotelCard";
/* ✅ 필터 사이드바 임포트 */
import FilterSidebar from "./FilterSidebar";

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

  /* 더미 데이터 (결과 리스트) */
  const searchResults = [
    {
      id: 1,
      name: "CVK Park Bosphorus Hotel Istanbul",
      location: "Istanbul",
      rating: 5,
      reviews: 371,
      price: 240,
      image: "/images/hotel1.jpg",
      amenities: "5 Star Hotel",
      options: "20+ Amenities",
    },
    {
      id: 2,
      name: "Eresin Hotels Sultanahmet",
      location: "Istanbul",
      rating: 4.2,
      reviews: 54,
      price: 104,
      image: "/images/hotel2.jpg",
      amenities: "Boutique",
      options: "15+ Amenities",
    },
    {
      id: 3,
      name: "Rixos Pera Istanbul",
      location: "Istanbul",
      rating: 4.8,
      reviews: 120,
      price: 180,
      image: "/images/hotel3.jpg",
      amenities: "Luxury",
      options: "25+ Amenities",
    },
    {
      id: 4,
      name: "Swissotel The Bosphorus",
      location: "Istanbul",
      rating: 4.9,
      reviews: 450,
      price: 320,
      image: "/images/hotel1.jpg",
      amenities: "5 Star Hotel",
      options: "30+ Amenities",
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
      {/* 1. 상단 검색바 영역 */}
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
              <div className="guest-popup">
                <div className="counter-row">
                  <span className="label">Rooms</span>
                  <div className="counter-controls">
                    <button
                      onClick={() => handleCounter("rooms", "dec")}
                      disabled={rooms <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="count">{rooms}</span>
                    <button onClick={() => handleCounter("rooms", "inc")}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="counter-row">
                  <span className="label">Guests</span>
                  <div className="counter-controls">
                    <button
                      onClick={() => handleCounter("guests", "dec")}
                      disabled={guests <= 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="count">{guests}</span>
                    <button onClick={() => handleCounter("guests", "inc")}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 검색 버튼 */}
          <button className="btn-search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* 2. 메인 컨텐츠 영역 (좌우 분할) */}
      <div className="container">
        {/* 그리드 레이아웃 */}
        <div className="search-layout-grid">
          {/* 왼쪽 사이드바 (필터) */}
          <aside className="search-sidebar">
            <FilterSidebar />
          </aside>

          {/* 오른쪽 메인 콘텐츠 (호텔 리스트) */}
          <main className="search-content">
            {/* 정렬 버튼 등 */}
            <div
              className="list-header"
              style={{
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 style={{ fontSize: "2rem" }}>
                Showing {searchResults.length} places
              </h2>
              <select
                style={{
                  padding: "0.8rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                }}
              >
                <option>Recommended</option>
                <option>Price Low to High</option>
              </select>
            </div>

            <div className="results-list">
              {searchResults.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {/* ✅ [추가] Show more results 버튼 */}
            <button className="btn-show-more">Show more results</button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;