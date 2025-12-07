import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom"; // ✅ useParams 추가
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faHotel,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/booking/BookingStepLayout.scss";

const BookingStepLayout = () => {
  const { hotelId } = useParams(); // ✅ URL에서 hotelId (예: 1, 2, 3...) 가져오기
  const [paymentType, setPaymentType] = useState("full");

  // ✅ [핵심] 호텔 데이터 목록 (HotelDetailPage와 동일한 데이터)
  const allHotels = [
    {
      id: 1,
      name: "CVK Park Bosphorus Hotel Istanbul",
      address: "Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437",
      price: 240,
      image: "/images/hotel1.jpg",
      rating: 4.2,
      reviews: 54,
    },
    {
      id: 2,
      name: "Eresin Hotels Sultanahmet",
      address: "Küçükayasofya No. 40 Sultanahmet, Istanbul 34022",
      price: 104,
      image: "/images/hotel2.jpg",
      rating: 4.0,
      reviews: 32,
    },
    {
      id: 3,
      name: "Rixos Pera Istanbul",
      address: "Kamer Hatun Mah. Mesrutiyet Cad. No:44, Istanbul",
      price: 180,
      image: "/images/hotel3.jpg",
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 4,
      name: "Swissotel The Bosphorus",
      address: "Visnezaade Mah, Acisu Sok No 19, Macka, Istanbul",
      price: 320,
      image: "/images/hotel1.jpg",
      rating: 4.9,
      reviews: 450,
    },
  ];

  // ✅ URL의 id와 일치하는 호텔 찾기 (없으면 1번을 기본값으로)
  const targetHotel =
    allHotels.find((hotel) => hotel.id === Number(hotelId)) || allHotels[0];

  return (
    <div className="booking-step-layout">
      {/* 1. Breadcrumb */}
      <div className="breadcrumb">
        <span className="location">Turkey</span>
        <FontAwesomeIcon icon={faChevronRight} size="xs" />
        <span className="location">Istanbul</span>
        <FontAwesomeIcon icon={faChevronRight} size="xs" />
        {/* ✅ 호텔 이름 동적 표시 */}
        <span className="current">{targetHotel.name}</span>
      </div>

      <div className="content-container">
        {/* === 왼쪽 메인 컨텐츠 === */}
        <div className="main-column">
          {/* 객실 정보 섹션 */}
          <div className="section-card room-info">
            <div className="header-row">
              <h2>
                Superior room - <br /> 1 더블베드 or 2 트윈 베드
              </h2>
              {/* ✅ 가격 동적 표시 */}
              <span className="price">₩{targetHotel.price},000/night</span>
            </div>
            <div className="hotel-address-box">
              <div className="logo-placeholder">LOGO</div>
              <div className="text-info">
                {/* ✅ 호텔 이름 & 주소 동적 표시 */}
                <strong>{targetHotel.name}</strong>
                <p>{targetHotel.address}</p>
              </div>
            </div>
            <div className="check-in-out-timeline">
              <div className="date-group">
                <span className="date">Thursday, Dec 8</span>
                <span className="label">Check-In</span>
              </div>
              <div className="timeline-graphic">
                <div className="line"></div>
                <div className="icon-circle">
                  <FontAwesomeIcon icon={faHotel} />
                </div>
                <div className="line"></div>
              </div>
              <div className="date-group right">
                <span className="date">Friday, Dec 9</span>
                <span className="label">Check-Out</span>
              </div>
            </div>
          </div>

          {/* 결제 방식 선택 */}
          <div
            className={`section-card selection-card ${
              paymentType === "full" ? "active" : ""
            }`}
            onClick={() => setPaymentType("full")}
          >
            <div className="text-group">
              <h3>전액결제</h3>
              <p>전체 결제 후 예약 확정</p>
            </div>
            <div className="radio-circle">
              {paymentType === "full" && <div className="inner-dot"></div>}
            </div>
          </div>

          <div
            className={`section-card selection-card ${
              paymentType === "part" ? "active" : ""
            }`}
            onClick={() => setPaymentType("part")}
          >
            <div className="text-group">
              <h3>부분 결제, 나머지 계산</h3>
              <p>부분결제 후 자동적으로 나머지 결제가 이루어집니다</p>
            </div>
            <div className="radio-circle">
              {paymentType === "part" && <div className="inner-dot"></div>}
            </div>
          </div>

          {/* 카드 선택 */}
          <div className="section-card payment-method active">
            <div className="card-row">
              <div className="card-info">
                <span className="card-brand">VISA</span>
                <span className="card-number">**** 4321</span>
                <span className="card-expiry">02/27</span>
              </div>
              <div className="radio-circle">
                <div className="inner-dot"></div>
              </div>
            </div>
          </div>

          <div className="add-new-card">
            <div className="plus-circle">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <span>Add a new card</span>
          </div>
        </div>

        {/* === 오른쪽 사이드바 (요약 정보) === */}
        <div className="sidebar-column">
          <div className="summary-card">
            <div className="hotel-summary">
              <div className="thumbnail">
                {/* ✅ 선택된 호텔 이미지 표시 */}
                <img
                  src={targetHotel.image}
                  alt={targetHotel.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="info">
                <p className="sub-text">{targetHotel.name.split(" ")[0]}...</p>
                <h3>Superior room...</h3>
                <div className="rating">
                  {/* ✅ 평점 동적 표시 */}
                  <span className="badge">{targetHotel.rating}</span>
                  <strong>Very Good</strong> {targetHotel.reviews} reviews
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <p className="protection-text">
              Your booking is protected by <strong>golobe</strong>
            </p>
            <div className="divider"></div>
            <div className="price-details">
              <h4>Price Details</h4>
              <div className="row">
                <span>Base Fare</span>
                {/* ✅ 가격 계산 동적 표시 */}
                <strong>₩{targetHotel.price},000</strong>
              </div>
              <div className="row">
                <span>Discount</span>
                <strong>₩0</strong>
              </div>
              <div className="row">
                <span>Taxes</span>
                <strong>₩24,000</strong>
              </div>
              <div className="row">
                <span>Service Fee</span>
                <strong>₩5,000</strong>
              </div>
            </div>
            <div className="divider"></div>
            <div className="total-row">
              <span>Total</span>
              {/* ✅ 총액 계산 (기본가 + 세금 + 봉사료) */}
              <span>₩{targetHotel.price + 29},000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepLayout;
