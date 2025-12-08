/* src/pages/hotel/HotelDetailPage.jsx */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faWifi,
  faSwimmingPool,
  faUtensils,
  faSpa,
  faParking,
  faTv,
  faShareAlt,
  faHeart,
  faStar as faStarSolid,
  faCheck,
  faTimes,
  faSnowflake,
  faConciergeBell,
  faDumbbell,
  faCocktail,
  faBed,
  faMugHot,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "../../styles/pages/hotel/HotelDetailPage.scss";

/* 지도 아이콘 설정 */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

/* 예약 폼 컴포넌트 */
const BookingForm = ({ hotel, navigate }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [guests, setGuests] = useState(2);

  return (
    <>
      <div className="date-picker-group">
        <div className="date-field">
          <label>Check In</label>
          <DatePicker
            selected={checkInDate}
            onChange={setCheckInDate}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className="date-field">
          <label>Check Out</label>
          <DatePicker
            selected={checkOutDate}
            onChange={setCheckOutDate}
            dateFormat="yyyy/MM/dd"
            minDate={checkInDate}
          />
        </div>
      </div>
      <div className="guest-field">
        <label>Guests</label>
        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
          <option value="1">1 Person</option>
          <option value="2">2 Persons</option>
          <option value="3">3 Persons</option>
          <option value="4">4 Persons</option>
        </select>
      </div>
      <div className="price-summary">
        <div className="row">
          <span>${hotel.price} x 5 nights</span>
          <span>${hotel.price * 5}</span>
        </div>
        <div className="row">
          <span>Service fee</span>
          <span>$150</span>
        </div>
        <div className="row total">
          <span>Total</span>
          <span>${hotel.price * 5 + 150}</span>
        </div>
      </div>
      <button
        className="btn-confirm-book"
        onClick={() => navigate(`/booking/${hotel.id}`)}
      >
        예약하기
      </button>
    </>
  );
};

const HotelDetailPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  /* ✅ [추가] 찜하기 상태 관리 */
  const [isFavorite, setIsFavorite] = useState(false);

  const commonAmenities = [
    { icon: faSwimmingPool, name: "Outdoor pool" },
    { icon: faSwimmingPool, name: "Indoor pool" },
    { icon: faSpa, name: "Spa and wellness center" },
    { icon: faUtensils, name: "Restaurant" },
    { icon: faConciergeBell, name: "Room service" },
    { icon: faDumbbell, name: "Fitness center" },
    { icon: faCocktail, name: "Bar/Lounge" },
    { icon: faWifi, name: "Free Wi-Fi" },
    { icon: faMugHot, name: "Tea/coffee machine" },
  ];

  const allHotels = [
    {
      id: 1,
      name: "CVK Park Bosphorus Hotel Istanbul",
      address: "Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437",
      coords: { lat: 41.035, lng: 28.988 },
      rating: 5,
      reviews: 371,
      price: 240,
      description:
        "이스탄불의 심장부에 위치한 이 럭셔리 호텔은 보스포러스 해협의 숨막히는 전경을 자랑합니다.",
      images: [
        "/images/hotel1.jpg",
        "/images/hotel2.jpg",
        "/images/hotel3.jpg",
        "/images/hero-bg-1.jpg",
        "/images/hero-bg-2.jpg",
      ],
      amenities: commonAmenities,
    },
    {
      id: 2,
      name: "Eresin Hotels Sultanahmet",
      address: "Küçükayasofya No. 40 Sultanahmet, Istanbul 34022",
      coords: { lat: 41.005, lng: 28.975 },
      rating: 4.2,
      reviews: 54,
      price: 104,
      description:
        "역사적인 술탄아흐멧 지구에 위치한 부티크 호텔로, 고풍스러운 인테리어와 현대적인 편의시설이 조화를 이룹니다.",
      images: [
        "/images/hotel2.jpg",
        "/images/hotel1.jpg",
        "/images/hotel3.jpg",
        "/images/hero-bg-1.jpg",
        "/images/hero-bg-2.jpg",
      ],
      amenities: commonAmenities,
    },
    {
      id: 3,
      name: "Rixos Pera Istanbul",
      address: "Kamer Hatun Mah. Mesrutiyet Cad. No:44, Istanbul",
      coords: { lat: 41.032, lng: 28.976 },
      rating: 4.8,
      reviews: 120,
      price: 180,
      description:
        "활기찬 페라 지구에 위치하여 이스탄불의 나이트라이프와 문화를 즐기기에 최적의 장소입니다.",
      images: [
        "/images/hotel3.jpg",
        "/images/hotel2.jpg",
        "/images/hotel1.jpg",
        "/images/hero-bg-1.jpg",
        "/images/hero-bg-2.jpg",
      ],
      amenities: commonAmenities,
    },
    {
      id: 4,
      name: "Swissotel The Bosphorus",
      address: "Visnezaade Mah, Acisu Sok No 19, Macka, Istanbul",
      coords: { lat: 41.042, lng: 29.0 },
      rating: 4.9,
      reviews: 450,
      price: 320,
      description:
        "보스포러스 해협이 내려다보이는 5성급 호텔로, 럭셔리한 스파와 루프탑 수영장을 갖추고 있습니다.",
      images: [
        "/images/hotel1.jpg",
        "/images/hotel3.jpg",
        "/images/hotel2.jpg",
        "/images/hero-bg-1.jpg",
        "/images/hero-bg-2.jpg",
      ],
      amenities: commonAmenities,
    },
  ];

  const hotel = allHotels.find((item) => item.id === Number(hotelId));

  /* 더미 리뷰 데이터 */
  const dummyReviews = [
    {
      id: 1,
      user: "Omar S.",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      date: "Dec 2023",
      content:
        "Fantastic experience! The views were breathtaking and the service was impeccable. Will definitely return.",
      images: ["/images/hotel1.jpg", "/images/room1.jpg"],
    },
    {
      id: 2,
      user: "Sarah K.",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      date: "Nov 2023",
      content:
        "Great location and very comfortable rooms. The breakfast buffet had a wide variety of options.",
      images: [],
    },
    {
      id: 3,
      user: "Michael B.",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 5,
      date: "Oct 2023",
      content:
        "Absolutely loved our stay. The staff went above and beyond to make us feel welcome.",
      images: [],
    },
    {
      id: 4,
      user: "Jessica Lee",
      avatar: "https://i.pravatar.cc/150?img=10",
      rating: 3,
      date: "Sep 2023",
      content:
        "Decent hotel, but a bit overpriced for the room size. The pool area was nice though.",
      images: ["/images/room2.jpg"],
    },
  ];

  if (!hotel) return <div>호텔 정보를 찾을 수 없습니다.</div>;
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStarSolid}
        className={i < Math.floor(rating) ? "star filled" : "star"}
      />
    ));

  return (
    <div className="hotel-detail-page">
      <div className="container">
        <div className="detail-header">
          <div className="header-left">
            <div className="title-row">
              <h1>{hotel.name}</h1>
              <div className="stars">{renderStars(hotel.rating)}</div>
            </div>
            <p className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {hotel.address}
            </p>
          </div>
          <div className="header-right">
            <div className="price-box">
              <span className="price">${hotel.price}</span>
              <span className="unit">/night</span>
            </div>
            <div className="action-buttons">
              {/* ✅ [수정] 하트 버튼에 클릭 이벤트 & active 클래스 적용 */}
              <button
                className={`btn-icon ${isFavorite ? "active" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>

              <button className="btn-icon">
                <FontAwesomeIcon icon={faShareAlt} />
              </button>
              <button
                className="btn-book"
                onClick={() => setShowBookingModal(true)}
              >
                Book now
              </button>
            </div>
          </div>
        </div>

        <div className="image-gallery">
          <div className="main-image">
            <img src={hotel.images[0]} alt="Main" />
          </div>
          <div className="sub-images">
            {hotel.images.slice(1, 5).map((img, index) => (
              <div key={index} className="sub-image-item">
                <img src={img} alt="Sub" />
                {index === 3 && <div className="more-overlay">+15 Photos</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="content-wrapper">
          <div className="full-content">
            <section className="section overview">
              <h3>Overview</h3>
              <p className="description">{hotel.description}</p>
              <div className="overview-highlights">
                <div className="highlight-box rating-box">
                  <span className="score">{hotel.rating}</span>
                  <span className="text">Very good</span>
                  <span className="count">{hotel.reviews} reviews</span>
                </div>
                <div className="highlight-box">
                  <FontAwesomeIcon icon={faStar} />
                  <span>Near park</span>
                </div>
                <div className="highlight-box">
                  <FontAwesomeIcon icon={faUtensils} />
                  <span>Near nightlife</span>
                </div>
                <div className="highlight-box">
                  <FontAwesomeIcon icon={faSpa} />
                  <span>Near theater</span>
                </div>
                <div className="highlight-box">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Clean Hotel</span>
                </div>
              </div>
            </section>
            <section className="section available-rooms">
              <h3>Available Rooms</h3>
              <div className="room-list">
                {[
                  {
                    name: "Superior room - 1 double bed or 2 twin beds",
                    price: 240000,
                    img: "/images/room1.jpg",
                  },
                  {
                    name: "Superior room - City view - 1 double bed or 2 twin beds",
                    price: 240000,
                    img: "/images/room2.jpg",
                  },
                  {
                    name: "Deluxe room - Sea View",
                    price: 320000,
                    img: "/images/room3.jpg",
                  },
                  {
                    name: "Family Suite",
                    price: 450000,
                    img: "/images/room4.jpg",
                  },
                ].map((room, idx) => (
                  <div key={idx} className="room-item">
                    <div className="room-img-box">
                      <img src={room.img} alt="Room" />
                    </div>
                    <div className="room-info">
                      <span className="room-name">{room.name}</span>
                      <div className="room-price-action">
                        <span className="room-price">
                          ₩{room.price.toLocaleString()}/night
                        </span>
                        <button
                          className="btn-book-room"
                          onClick={() => setShowBookingModal(true)}
                        >
                          Book now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="section map-location">
              <div className="map-header">
                <h3>지도보기</h3>
                <button
                  className="btn-view-map"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        hotel.name
                      )}`,
                      "_blank"
                    )
                  }
                >
                  View on google maps
                </button>
              </div>
              <div
                className="map-image-box"
                style={{ height: "40rem", zIndex: 0 }}
              >
                <MapContainer
                  center={[hotel.coords.lat, hotel.coords.lng]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    attribution="© OpenStreetMap"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[hotel.coords.lat, hotel.coords.lng]}>
                    <Popup>{hotel.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </section>
            <section className="section amenities">
              <h3>Amenities</h3>
              <div className="amenities-grid">
                {hotel.amenities.map((item, index) => (
                  <div key={index} className="amenity-item">
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="section reviews">
              <div className="reviews-header">
                <h3>Reviews</h3>
                <button className="btn-write-review">Write a review</button>
              </div>
              <div className="review-summary-large">
                <span className="score">{hotel.rating}</span>
                <div className="summary-text">
                  <span className="text">Very Good</span>
                  <span className="count">
                    {hotel.reviews} verified reviews
                  </span>
                </div>
              </div>
              <div className="review-list">
                {dummyReviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="card-header">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="avatar"
                      />
                      <div className="user-info">
                        <div className="rating-row">
                          <span className="score">{review.rating}.0</span>
                          <span className="stars">
                            {renderStars(review.rating)}
                          </span>
                        </div>
                        <span className="username">{review.user}</span>
                      </div>
                      <span className="date">{review.date}</span>
                    </div>
                    <div className="card-body">
                      <p className="content">{review.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* 페이지네이션 */}
              <div className="pagination-controls">
                <button className="btn-page prev">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span className="page-info">1 of 40</span>
                <button className="btn-page next">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <button
              className="btn-close"
              onClick={() => setShowBookingModal(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Book your stay</h3>
            <div className="price-header">
              <span className="price">${hotel.price}</span>
              <span className="unit">/night</span>
            </div>
            <BookingForm hotel={hotel} navigate={navigate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelDetailPage;
