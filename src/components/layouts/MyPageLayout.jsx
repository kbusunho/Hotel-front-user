// src/components/layouts/MyPageLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 40px auto;
  gap: 40px;
  padding: 0 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Sidebar = styled.aside`
  width: 280px; /* 사이드바 너비 조정 */
  min-width: 220px;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 4px 10px var(--shadow-light);
  padding: 30px 20px;

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 25px;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 15px;
  }
  
  nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a { 
    display: block; 
    padding: 12px 15px; 
    color: var(--text-secondary); 
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;

    &:hover { 
      background-color: #F0F4F8; /* 호버 배경색 */
      color: var(--primary-color); 
      transform: translateX(3px); /* 입체감 */
    }

    &.active { /* 현재 선택된 메뉴 */
      background-color: var(--primary-color);
      color: var(--white);
      font-weight: 700;
      box-shadow: 0 2px 5px var(--shadow-light);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    nav { flex-direction: row; flex-wrap: wrap; justify-content: center; }
    a { padding: 8px 12px; margin: 5px; }
  }
`;

const ContentArea = styled.section`
  flex: 1;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 4px 10px var(--shadow-light);
  padding: 30px;
`;

const MyPageLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <h3>마이페이지</h3>
        <nav>
          <NavLink to="/mypage" end>대시보드</NavLink>
          <NavLink to="/mypage/profile">프로필 관리</NavLink>
          <NavLink to="/mypage/bookings">예약 내역</NavLink>
          <NavLink to="/mypage/wishlist">찜 목록</NavLink>
          <NavLink to="/mypage/reviews">내 리뷰</NavLink>
          <NavLink to="/mypage/coupons">쿠폰함</NavLink>
          <NavLink to="/mypage/points">포인트</NavLink>
          <NavLink to="/mypage/inquiries">1:1 문의</NavLink>
        </nav>
      </Sidebar>
      <ContentArea>
        <Outlet />
      </ContentArea>
    </Layout>
  );
};
export default MyPageLayout;