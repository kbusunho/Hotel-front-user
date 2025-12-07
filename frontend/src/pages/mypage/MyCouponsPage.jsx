import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyCouponsPage.scss";

const MyCouponsPage = () => {
  const [copiedId, setCopiedId] = useState(null);

  const coupons = [
    {
      id: 1,
      name: "신규 회원 할인",
      discount: 20,
      discountType: "percent",
      validFrom: "2024-12-01",
      validTo: "2025-12-31",
      minPrice: 100000,
      status: "available",
      code: "NEW20",
    },
    {
      id: 2,
      name: "겨울 특가",
      discount: 50000,
      discountType: "fixed",
      validFrom: "2024-12-01",
      validTo: "2025-02-28",
      minPrice: 300000,
      status: "available",
      code: "WINTER50",
    },
    {
      id: 3,
      name: "봄 여행 할인",
      discount: 15,
      discountType: "percent",
      validFrom: "2025-03-01",
      validTo: "2025-05-31",
      minPrice: 200000,
      status: "upcoming",
      code: "SPRING15",
    },
    {
      id: 4,
      name: "여름 휴가 쿠폰",
      discount: 30000,
      discountType: "fixed",
      validFrom: "2024-06-01",
      validTo: "2024-08-31",
      minPrice: 250000,
      status: "expired",
      code: "SUMMER30",
    },
  ];

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <span className="badge available">사용 가능</span>;
      case "upcoming":
        return <span className="badge upcoming">예정</span>;
      case "expired":
        return <span className="badge expired">만료됨</span>;
      default:
        return <span className="badge">{status}</span>;
    }
  };

  const getDiscountText = (discount, type) => {
    return type === "percent" ? `${discount}%` : `₩${discount.toLocaleString()}`;
  };

  return (
    <div className="my-coupons-page">
      <div className="coupons-header">
        <h1>나의 쿠폰</h1>
        <p>보유한 쿠폰을 확인하고 사용하세요</p>
      </div>

      <div className="coupons-list">
        {coupons.map((coupon) => (
          <div key={coupon.id} className={`coupon-card ${coupon.status}`}>
            <div className="coupon-left">
              <div className="coupon-icon">
                <FontAwesomeIcon icon={faTicket} />
              </div>
              <div className="coupon-info">
                <h3>{coupon.name}</h3>
                <p className="discount">
                  {getDiscountText(coupon.discount, coupon.discountType)} 할인
                </p>
                <p className="min-price">
                  최소 구매: ₩{coupon.minPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="coupon-right">
              <div className="coupon-validity">
                <span className="valid-date">
                  {coupon.validFrom} ~ {coupon.validTo}
                </span>
                {getStatusBadge(coupon.status)}
              </div>

              <button
                className={`btn-copy ${copiedId === coupon.code ? "copied" : ""}`}
                onClick={() => handleCopyCoupon(coupon.code)}
                disabled={coupon.status !== "available"}
              >
                {copiedId === coupon.code ? (
                  <>
                    <FontAwesomeIcon icon={faCheck} />
                    복사됨
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCopy} />
                    {coupon.code}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {coupons.length === 0 && (
        <div className="empty-state">
          <FontAwesomeIcon icon={faTicket} />
          <h3>쿠폰이 없습니다</h3>
          <p>사용할 수 있는 쿠폰을 받으려면 예약을 진행하세요</p>
        </div>
      )}
    </div>
  );
};

export default MyCouponsPage;