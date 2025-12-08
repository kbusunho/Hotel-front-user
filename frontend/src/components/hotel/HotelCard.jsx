import React, { useState } from "react";
/* ✅ [추가] 페이지 이동을 위한 useNavigate */
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faHeart,
  faMugHot, 
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/hotel/HotelCard.scss";

const HotelCard = ({ hotel }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate(); /* ✅ 네비게이트 훅 사용 */

  /* ✅ 상세 페이지 이동 함수 */
  const goToDetail = () => {
    navigate(`/hotels/${hotel.id}`); 
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`star ${i < Math.floor(rating) ? "filled" : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="hotel-card-horizontal">
      {/* 1. 왼쪽 이미지 영역 (클릭 시 이동) */}
      <div className="card-left" onClick={goToDetail} style={{ cursor: 'pointer' }}>
        {hotel.image ? (
          <img src={hotel.image} alt={hotel.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <span className="image-count">9 images</span>
      </div>

      {/* 2. 오른쪽 컨텐츠 영역 */}
      <div className="card-right">
        <div className="card-header-row">
          <div className="info-group">
            {/* ✅ 호텔 이름 클릭 시 이동 */}
            <h3 className="hotel-name" onClick={goToDetail} style={{ cursor: 'pointer' }}>
              {hotel.name}
            </h3>
            
            <p className="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{hotel.location}</span>
            </p>

            <div className="rating-section">
              <div className="stars">{renderStars(hotel.rating)}</div>
              <span className="star-text">5 Star Hotel</span>
              <div className="amenity">
                <FontAwesomeIcon icon={faMugHot} />
                <span>20+ Amenities</span>
              </div>
            </div>

            <div className="review-score-box">
              <div className="score-badge">{hotel.rating}</div>
              <div className="review-text">
                <strong>Very Good</strong>
                <span className="count">{hotel.reviews} reviews</span>
              </div>
            </div>
          </div>

          <div className="price-group">
            <span className="label">starting from</span>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">{hotel.price}</span>
              <span className="unit">/night</span>
            </div>
            <span className="tax">excl. tax</span>
          </div>
        </div>

        <div className="card-bottom-row">
          <div className="divider"></div>
          <div className="buttons-wrapper">
            <button
              className={`btn-heart ${isFavorite ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭 방지 (이미지 클릭과 분리)
                setIsFavorite(!isFavorite);
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            
            {/* ✅ View Place 버튼 클릭 시 이동 */}
            <button className="btn-view" onClick={goToDetail}>
              View Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;