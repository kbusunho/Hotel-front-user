import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHotel, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/booking/BookingStepLayout.scss";

/* ❌ Newsletter import 삭제 */
// import Newsletter from "../../components/common/Newsletter"; 

const BookingStepLayout = () => {
  const [paymentType, setPaymentType] = useState("full");

  return (
    <div className="booking-step-layout">
      {/* 1. Breadcrumb (기존 유지) */}
      <div className="breadcrumb">
        <span className="location">Turkey</span>
        <FontAwesomeIcon icon={faChevronRight} size="xs" />
        <span className="location">Istanbul</span>
        <FontAwesomeIcon icon={faChevronRight} size="xs" />
        <span className="current">해튼호텔</span>
      </div>

      <div className="content-container">
        {/* === 왼쪽 메인 컨텐츠 (기존 유지) === */}
        <div className="main-column">
          
          {/* 객실 정보 섹션 */}
          <div className="section-card room-info">
            <div className="header-row">
              <h2>Superior room - 1 더블베드 or 2 트윈 베드</h2>
              <span className="price">₩240,000/night</span>
            </div>
            <div className="hotel-address-box">
              <div className="logo-placeholder">CVK</div>
              <div className="text-info">
                <strong>해튼호텔</strong>
                <p>Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437</p>
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
            className={`section-card selection-card ${paymentType === "full" ? "active" : ""}`} 
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
            className={`section-card selection-card ${paymentType === "part" ? "active" : ""}`} 
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
              <div className="radio-circle"><div className="inner-dot"></div></div>
            </div>
          </div>
          
          <div className="add-new-card">
            <div className="plus-circle">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <span>Add a new card</span>
          </div>
        </div>

        {/* === 오른쪽 사이드바 (요약 정보) (기존 유지) === */}
        <div className="sidebar-column">
          <div className="summary-card">
            <div className="hotel-summary">
              <div className="thumbnail">
                 <img src="/images/hotel1.jpg" alt="hotel" style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <div className="info">
                <p className="sub-text">CVK Park Bosphorus...</p>
                <h3>Superior room - 1 더블베드...</h3>
                <div className="rating">
                  <span className="badge">4.2</span>
                  <strong>Very Good</strong> 54 reviews
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <p className="protection-text">Your booking is protected by <strong>golobe</strong></p>
            <div className="divider"></div>
            <div className="price-details">
              <h4>Price Details</h4>
              <div className="row"><span>Base Fare</span><strong>₩240,000</strong></div>
              <div className="row"><span>Discount</span><strong>₩0</strong></div>
              <div className="row"><span>Taxes</span><strong>₩24,000</strong></div>
              <div className="row"><span>Service Fee</span><strong>₩5,000</strong></div>
            </div>
            <div className="divider"></div>
            <div className="total-row"><span>Total</span><span>₩269,000</span></div>
          </div>
        </div>
      </div>

  
      
    </div>
  );
};

export default BookingStepLayout;