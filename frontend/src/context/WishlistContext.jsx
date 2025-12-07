import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // localStorage에서 찜하기 목록 로드
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('찜하기 목록 로드 오류:', error);
      }
    }
  }, []);

  // wishlist 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 찜하기 추가
  const addToWishlist = (hotel) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === hotel.id);
      if (exists) {
        return prev;
      }
      return [...prev, hotel];
    });
  };

  // 찜하기 제거
  const removeFromWishlist = (hotelId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== hotelId));
  };

  // 찜하기 여부 확인
  const isInWishlist = (hotelId) => {
    return wishlist.some((item) => item.id === hotelId);
  };

  // 찜하기 토글
  const toggleWishlist = (hotel) => {
    if (isInWishlist(hotel.id)) {
      removeFromWishlist(hotel.id);
    } else {
      addToWishlist(hotel);
    }
  };

  // 찜하기 목록 가져오기
  const getWishlist = () => wishlist;

  // 찜하기 개수
  const getWishlistCount = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        getWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
