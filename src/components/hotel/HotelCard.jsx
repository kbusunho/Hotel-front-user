import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faStar,
  faHeart,
  faMugHot, // 커피잔 아이콘 변경 (더 직관적)
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/hotel/HotelCard.scss";

const HotelCard = ({ hotel }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // 별점 렌더링 함수
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
      {/* 1. 왼쪽 이미지 영역 */}
      <div className="card-left">
        {hotel.image ? (
          <img src={hotel.image} alt={hotel.name} />
        ) : (
          <div className="no-image">No Image</div>
        )}
        <span className="image-count">9 images</span>
      </div>

      {/* 2. 오른쪽 컨텐츠 영역 */}
      <div className="card-right">
        {/* 상단: 정보 + 가격 */}
        <div className="card-header-row">
          {/* 호텔 정보 */}
          <div className="info-group">
            <h3 className="hotel-name">{hotel.name}</h3>
            
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

          {/* 가격 정보 (우측 정렬) */}
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

        {/* 하단: 구분선 + 버튼 */}
        <div className="card-bottom-row">
          <div className="divider"></div>
          <div className="buttons-wrapper">
            <button
              className={`btn-heart ${isFavorite ? "active" : ""}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button className="btn-view">View Place</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;