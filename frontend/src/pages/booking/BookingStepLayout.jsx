import React, { useState } from "react";
import { ChevronRight, Building2, Plus, CreditCard } from "lucide-react";
// 스타일 파일 임포트 (경로는 프로젝트 설정에 따라 조정 필요)
import "../../../styles/pages/booking/BookingStepLayout.scss";

const BookingStepLayout = () => {
  // 결제 방식 상태 관리 (전액 결제 vs 부분 결제)
  const [paymentType, setPaymentType] = useState("full");

  return (
    <div className="booking-step-layout">
      {/* 1. Breadcrumb (경로) */}
      <div className="breadcrumb">
        <span className="location">Turkey</span>
        <ChevronRight size={16} />
        <span className="location">Istanbul</span>
        <ChevronRight size={16} />
        <span className="current">해튼호텔</span>
      </div>

      <div className="content-container">
        {/* === 왼쪽 메인 컨텐츠 === */}
        <div className="main-column">
          {/* 객실 정보 섹션 */}
          <div className="section-card room-info">
            <div className="header-row">
              <h2>Superior room - 1 더블베드 or 2 트윈 베드</h2>
              <span className="price">₩240,000/night</span>
            </div>

            <div className="hotel-address-box">
              <div className="logo-placeholder">LOGO</div>
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
                <Building2 className="icon" size={24} />
                <div className="line"></div>
              </div>
              <div className="date-group right">
                <span className="date">Friday, Dec 9</span>
                <span className="label">Check-Out</span>
              </div>
            </div>
          </div>

          {/* 결제 방식 선택 (Radio UI) */}
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

          {/* 카드 선택 섹션 */}
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

          {/* 새 카드 추가 (점선) */}
          <div className="add-new-card">
            <div className="plus-circle">
              <Plus size={20} />
            </div>
            <span>Add a new card</span>
          </div>
        </div>

        {/* === 오른쪽 사이드바 (요약 정보) === */}
        <div className="sidebar-column">
          <div className="summary-card">
            <div className="hotel-summary">
              <div className="thumbnail">
                {/* 이미지 태그로 교체 가능 */}
                <div className="img-placeholder">Image</div>
              </div>
              <div className="info">
                <p className="sub-text">CVK Park Bosphorus...</p>
                <h3>Superior room - 1 더블베드 or 2 트윈 베드</h3>
                <div className="rating">
                  <span className="badge">4.2</span>
                  <strong>Very Good</strong> 54 reviews
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
                <strong>₩240,000</strong>
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
              <span>₩269,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* === 하단 구독 배너 === */}
      <div className="newsletter-section">
        <div className="newsletter-content">
          <h2>
            구독서비스
            <br />
            신청해보세요
          </h2>
          <p className="sub-title">The Travel</p>
          <p className="description">구독하고 쿠폰, 최신 이벤트를 받아보세요</p>

          <div className="input-group">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="newsletter-illustration">
          {/* 우편함 이미지를 여기에 배치하세요 (img 태그 등) */}
          <div className="mailbox-placeholder">📬</div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepLayout;
