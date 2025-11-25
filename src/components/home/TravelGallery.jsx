import React from 'react';

const TravelGallery = () => {
  // 1. 사용할 이미지 데이터 배열 준비
  // 실제 이미지 경로에 맞게 수정해주세요. (예: public/images/ 폴더 안에 있는 경우)
  const galleryImages = [
    { id: 1, src: "/images/gallery-1.jpg", alt: "여행 사진 1" },
    { id: 2, src: "/images/gallery-2.jpg", alt: "여행 사진 2" },
    { id: 3, src: "/images/gallery-3.jpg", alt: "여행 사진 3" },
    { id: 4, src: "/images/gallery-4.jpg", alt: "여행 사진 4" },
  ];

  return (
    <div className="travel-gallery">
      {/* 2. 배열을 순회하며 이미지 박스 생성 */}
      {galleryImages.map((image) => (
        <div key={image.id} className="gallery-item">
          <img src={image.src} alt={image.alt} />
        </div>
      ))}
    </div>
  );
};

export default TravelGallery;