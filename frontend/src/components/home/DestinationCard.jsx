import React from "react";

const DestinationCard = ({ destination }) => {
  const { name, country, image, price, description } = destination;

  return (
    <div className="destination-card">
      {/* 1. 배경 이미지 */}
      <img src={image} alt={name} className="bg-image" />
      
      {/* 2. 어두운 그라데이션 (글씨 잘 보이게) */}
      <div className="overlay-gradient"></div>

      {/* 3. 텍스트 및 버튼 내용 */}
      <div className="card-content">
        <div className="text-info">
          <div className="top-row">
            <h3 className="city-name">{name}</h3>
            <span className="price">₩{price.toLocaleString()}</span>
          </div>
          <p className="description">{description}</p>
        </div>
        
        <button className="btn-book">Book a Hotel</button>
      </div>
    </div>
  );
};

export default DestinationCard;