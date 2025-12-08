import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faPhone,
  faEnvelope,
  faChevronRight,
  faClock,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyBookingsPage.scss";

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // 더미 데이터 - 예약 목록
  const bookings = [
    {
      id: 1,
      hotelName: "글래드 호텔 여의도",
      location: "서울, 여의도",
      checkIn: "2025-02-10",
      checkOut: "2025-02-12",
      guests: 2,
      roomType: "디럭스 트윈",
      price: 328000,
      status: "confirmed",
      image: "/images/hotel1.jpg",
      reservationCode: "KR240001",
      nights: 2,
      cancellable: true,
      phone: "010-1234-5678",
      email: "test@hotel.com",
    },
    {
      id: 2,
      hotelName: "파라다이스시티 호텔",
      location: "인천, 영종도",
      checkIn: "2024-12-28",
      checkOut: "2024-12-30",
      guests: 3,
      roomType: "패밀리 스위트",
      price: 580000,
      status: "completed",
      image: "/images/hotel2.jpg",
      reservationCode: "KR239988",
      nights: 2,
      cancellable: false,
      phone: "010-1234-5678",
      email: "test@hotel.com",
    },
    {
      id: 3,
      hotelName: "호텔 신라 제주",
      location: "제주, 중문",
      checkIn: "2025-03-15",
      checkOut: "2025-03-18",
      guests: 2,
      roomType: "오션뷰 킹",
      price: 920000,
      status: "confirmed",
      image: "/images/hotel3.jpg",
      reservationCode: "KR240015",
      nights: 3,
      cancellable: true,
      phone: "010-1234-5678",
      email: "test@hotel.com",
    },
    {
      id: 4,
      hotelName: "롯데호텔 부산",
      location: "부산, 서면",
      checkIn: "2024-11-20",
      checkOut: "2024-11-22",
      guests: 1,
      roomType: "프리미어 싱글",
      price: 195000,
      status: "cancelled",
      image: "/images/hotel1.jpg",
      reservationCode: "KR239765",
      nights: 2,
      cancellable: false,
      phone: "010-1234-5678",
      email: "test@hotel.com",
    },
  ];

  // 탭에 따라 필터링
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <span className="badge confirmed">확정됨</span>;
      case "completed":
        return <span className="badge completed">완료</span>;
      case "cancelled":
        return <span className="badge cancelled">취소됨</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <h1>나의 예약</h1>
        <p>모든 예약 내역을 확인하고 관리하세요</p>
      </div>

      {/* 탭 메뉴 */}
      <div className="bookings-tabs">
        <button
          className={`tab-item ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          전체 ({bookings.length})
        </button>
        <button
          className={`tab-item ${activeTab === "confirmed" ? "active" : ""}`}
          onClick={() => setActiveTab("confirmed")}
        >
          예정된 예약
        </button>
        <button
          className={`tab-item ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          완료된 예약
        </button>
        <button
          className={`tab-item ${activeTab === "cancelled" ? "active" : ""}`}
          onClick={() => setActiveTab("cancelled")}
        >
          취소된 예약
        </button>
      </div>

      {/* 예약 목록 */}
      <div className="bookings-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Link
              to={`/mypage/bookings/${booking.id}`}
              key={booking.id}
              className="booking-card"
            >
              <div className="booking-image">
                <img src={booking.image} alt={booking.hotelName} />
                {getStatusBadge(booking.status)}
              </div>

              <div className="booking-content">
                <div className="booking-header">
                  <div className="hotel-info">
                    <h3>{booking.hotelName}</h3>
                    <p className="location">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {booking.location}
                    </p>
                  </div>
                  <div className="booking-code">
                    <span className="code-label">예약번호</span>
                    <span className="code-value">{booking.reservationCode}</span>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                      <div className="detail-text">
                        <span className="label">체크인</span>
                        <span className="value">{booking.checkIn}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                      <div className="detail-text">
                        <span className="label">체크아웃</span>
                        <span className="value">{booking.checkOut}</span>
                      </div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faUser} className="icon" />
                      <div className="detail-text">
                        <span className="label">투숙객</span>
                        <span className="value">{booking.guests}명</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <FontAwesomeIcon icon={faClock} className="icon" />
                      <div className="detail-text">
                        <span className="label">객실타입</span>
                        <span className="value">{booking.roomType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="booking-footer">
                  <div className="price-section">
                    <span className="nights-label">{booking.nights}박</span>
                    <div className="price-info">
                      <span className="price-label">총 금액</span>
                      <span className="price">₩{booking.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    {booking.status === "completed" && (
                      <button className="btn-action btn-review">리뷰 작성</button>
                    )}
                    {booking.status === "confirmed" && booking.cancellable && (
                      <button className="btn-action btn-cancel">예약 취소</button>
                    )}
                    <button className="btn-action btn-details">
                      상세보기
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="empty-state">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <h3>예약이 없습니다</h3>
            <p>아직 예약한 호텔이 없어요</p>
            <Link to="/search" className="btn-search">
              호텔 검색하러 가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
