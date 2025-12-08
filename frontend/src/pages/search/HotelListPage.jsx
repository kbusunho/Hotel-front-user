import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarAlt,
  faUserFriends,
  faSearch,
  faPlus,
  faMinus,
  faChevronRight,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/pages/search/HotelListPage.scss";
import FilterSidebar from "./FilterSidebar";

const HotelListPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
  const [wishlist, setWishlist] = useState({});

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

  /* 찜하기 토글 */
  const toggleWishlist = (hotelId) => {
    setWishlist((prev) => ({
      ...prev,
      [hotelId]: !prev[hotelId],
    }));
  };

  /* 더미 데이터 (호텔 리스트) */
  const hotels = [
    {
      id: 1,
      name: "제주도힐",
      location: "Jeju Island, Korea",
      rating: 4.8,
      reviews: 156,
      price: 240,
      originalPrice: 290,
      image: "/images/hotel1.jpg",
      amenities: "5 Star Hotel",
      options: "Near park • Near nightlife • Near theater • Clean Hotel",
    },
    {
      id: 2,
      name: "라해스 델라우 숙소",
      location: "Bali, Indonesia",
      rating: 4.9,
      reviews: 98,
      price: 180,
      originalPrice: 220,
      image: "/images/hotel2.jpg",
      amenities: "Luxury Resort",
      options: "Pool • Beach • Spa • Restaurant",
    },
    {
      id: 3,
      name: "카카오 먹 숙소",
      location: "Bangkok, Thailand",
      rating: 4.7,
      reviews: 145,
      price: 130,
      originalPrice: 165,
      image: "/images/hotel3.jpg",
      amenities: "4 Star Hotel",
      options: "Near market • Good food • Nice view",
    },
    {
      id: 4,
      name: "베이오 숙소",
      location: "Phuket, Thailand",
      rating: 4.6,
      reviews: 203,
      price: 195,
      originalPrice: 250,
      image: "/images/hotel1.jpg",
      amenities: "Boutique Hotel",
      options: "Beach • Pool • Cafe • WiFi",
    },
  ];

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
        <div className="search-layout-grid">
          {/* 왼쪽 사이드바 (필터) */}
          <aside className="search-sidebar">
            <FilterSidebar />
          </aside>

          {/* 오른쪽 메인 콘텐츠 (호텔 리스트) */}
          <main className="search-content">
            {/* 정렬 및 결과 개수 */}
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
                Showing {hotels.length} places
              </h2>
              <select
                style={{
                  padding: "0.8rem 1.2rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              >
                <option>Sort by Recommended</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
                <option>Rating High to Low</option>
              </select>
            </div>

            {/* 호텔 카드 리스트 */}
            <div className="hotel-list">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="hotel-card-list-item">
                  <div className="hotel-image-container">
                    <img src={hotel.image} alt={hotel.name} />
                    <button
                      className={`btn-wishlist ${
                        wishlist[hotel.id] ? "active" : ""
                      }`}
                      onClick={() => toggleWishlist(hotel.id)}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </button>
                  </div>

                  <div className="hotel-info">
                    <div className="hotel-header">
                      <div>
                        <h3>{hotel.name}</h3>
                        <p className="location">{hotel.location}</p>
                      </div>
                      <div className="price-section">
                        <div className="rating">
                          <span className="rating-badge">{hotel.rating}</span>
                          <span className="rating-text">Very good</span>
                        </div>
                        <p className="reviews">{hotel.reviews} reviews</p>
                      </div>
                    </div>

                    <p className="amenities">{hotel.amenities}</p>

                    <div className="options-grid">
                      <span className="option-tag">Near park</span>
                      <span className="option-tag">Near nightlife</span>
                      <span className="option-tag">Near theater</span>
                      <span className="option-tag">Clean Hotel</span>
                    </div>

                    <div className="hotel-footer">
                      <div className="price-info">
                        <p className="original-price">₩{hotel.originalPrice.toLocaleString()}</p>
                        <p className="current-price">
                          ₩{hotel.price.toLocaleString()}/night
                        </p>
                      </div>
                      <button
                        className="btn-view-details"
                        onClick={() => navigate(`/hotels/${hotel.id}`)}
                      >
                        View Hotel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more results 버튼 */}
            <button className="btn-show-more">Show more results</button>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HotelListPage;