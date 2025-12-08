import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyReviewsPage.scss";

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      hotelName: "CVK Park Bosphorus Hotel Istanbul",
      hotelImage: "/images/hotel1.jpg",
      rating: 5,
      title: "최고의 위치와 서비스!",
      content: "이스탄불 여행 중 묵었던 호텔입니다. 보스포루스 해협이 보이는 최고의 위치에 있고, 스태프들의 서비스가 정말 좋았습니다. 객실도 깨끗하고 조식도 훌륭했어요. 다음에 이스탄불에 오면 또 이용할 예정입니다!",
      date: "2024-12-20",
      stayDates: "2024-12-15 ~ 2024-12-18",
      helpful: 24,
      images: ["/images/hotel1.jpg", "/images/hotel2.jpg"],
    },
    {
      id: 2,
      hotelName: "Eresin Hotels Sultanahmet",
      hotelImage: "/images/hotel2.jpg",
      rating: 4,
      title: "좋은 위치의 부티크 호텔",
      content: "구시가지 중심에 위치해서 관광하기 정말 편했습니다. 호텔 직원분들이 친절하고 조식도 맛있었어요. 다만 방음이 조금 아쉬웠고, 엘리베이터가 좁아서 불편했습니다. 그래도 전반적으로 만족스러운 숙박이었습니다.",
      date: "2024-11-15",
      stayDates: "2024-11-10 ~ 2024-11-13",
      helpful: 12,
      images: [],
    },
    {
      id: 3,
      hotelName: "Rixos Pera Istanbul",
      hotelImage: "/images/hotel3.jpg",
      rating: 5,
      title: "럭셔리한 경험",
      content: "특별한 날을 기념하기 위해 선택한 호텔이었는데 정말 만족스러웠습니다. 스파 시설이 훌륭하고 루프탑 바에서 본 야경이 환상적이었어요. 가격은 있지만 그만한 가치가 있습니다!",
      date: "2024-09-12",
      stayDates: "2024-09-08 ~ 2024-09-10",
      helpful: 15,
      images: ["/images/hotel3.jpg"],
    },
  ]);

  const handleDeleteReview = (id) => {
    if (window.confirm("이 리뷰를 삭제하시겠습니까?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  const renderStars = (rating) => (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i < rating ? "filled" : "empty"}
        />
      ))}
    </div>
  );

  return (
    <div className="my-reviews-page">
      <div className="reviews-header">
        <h1>나의 리뷰</h1>
        <p>총 {reviews.length}개의 리뷰를 작성하셨습니다</p>
      </div>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="card-top">
                <div className="hotel-info-section">
                  <img 
                    src={review.hotelImage} 
                    alt={review.hotelName} 
                    className="hotel-thumbnail"
                  />
                  <div className="hotel-details">
                    <h3>{review.hotelName}</h3>
                    <p className="stay-dates">숙박기간: {review.stayDates}</p>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                      <span className="rating-text">{review.rating}.0</span>
                    </div>
                  </div>
                </div>
                <div className="review-actions">
                  <button className="btn-action edit">
                    <FontAwesomeIcon icon={faEdit} />
                    수정
                  </button>
                  <button
                    className="btn-action delete"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    삭제
                  </button>
                </div>
              </div>

              <div className="review-content">
                <h4 className="review-title">{review.title}</h4>
                <p className="review-text">{review.content}</p>
                
                {review.images.length > 0 && (
                  <div className="review-images">
                    {review.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`리뷰 이미지 ${idx + 1}`} />
                    ))}
                  </div>
                )}
              </div>

              <div className="review-footer">
                <span className="review-date">작성일: {review.date}</span>
                <span className="helpful-count">
                  👍 도움이 됐어요 {review.helpful}명
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FontAwesomeIcon icon={faStar} />
            <h3>작성한 리뷰가 없습니다</h3>
            <p>숙박을 완료한 후 리뷰를 작성해주세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;