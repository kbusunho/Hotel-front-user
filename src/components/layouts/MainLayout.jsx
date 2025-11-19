// src/components/layouts/MainLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { useAuth } from "../../hooks/useAuth"; // 추후 로그인 상태를 가져올 때 사용

const HeaderContainer = styled.header`
  background: var(--white);
  height: 70px; /* 높이 조정 */
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px; /* 양쪽 패딩 조정 */
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 6px var(--shadow-light); /* 헤더에 은은한 그림자 */

  .logo {
    font-size: 1.8rem; /* 로고 크기 조정 */
    font-weight: 800; /* 고딕한 느낌의 폰트 굵기 */
    color: var(--primary-color);
    letter-spacing: -0.5px; /* 글자 간격 조정 */
  }

  nav {
    display: flex;
    gap: 30px; /* 메뉴 간격 조정 */
    align-items: center;
    
    a { 
      font-weight: 600; 
      color: var(--text-secondary); 
      transition: color 0.2s ease-in-out;
      position: relative;
      
      &:hover { color: var(--primary-color); }
      &.active { /* 현재 페이지 링크 스타일 */
        color: var(--primary-color);
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 2px;
          background-color: var(--primary-color);
        }
      }
    }
  }
`;

const MainContent = styled.main`
  min-height: calc(100vh - 70px - 150px); /* 헤더, 푸터 높이 고려 */
  padding: 40px 0; /* 콘텐츠 상하 패딩 */
`;

const Footer = styled.footer`
  background: var(--background-dark);
  color: var(--white);
  padding: 50px 24px;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.8;

  .footer-links {
    margin-bottom: 20px;
    a {
      color: var(--white);
      margin: 0 15px;
      &:hover { color: var(--secondary-color); }
    }
  }
`;

const MainLayout = () => {
  // const { isAuthed, logout } = useAuth(); // 로그인 훅 사용 예시
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout(); // 실제 로그아웃 처리
    navigate('/login');
  };

  return (
    <>
      <HeaderContainer className="container">
        <Link to="/" className="logo">TRIP.BOOK</Link>
        <nav>
          <Link to="/search">탐색</Link>
          <Link to="/support/faq">지원</Link>
          {/* {isAuthed ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{padding: '6px 14px', fontSize: '0.9rem'}}>로그아웃</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{padding: '6px 14px', fontSize: '0.9rem'}}>로그인</Link>
          )} */}
          <Link to="/mypage">마이페이지</Link>
          <Link to="/login" className="btn btn-primary" style={{padding: '6px 14px', fontSize: '0.9rem'}}>로그인</Link>
        </nav>
      </HeaderContainer>

      <MainContent>
        <Outlet />
      </MainContent>

      <Footer>
        <div className="container">
          <div className="footer-links">
            <Link to="/support/faq">FAQ</Link>
            <Link to="/support/notices">공지사항</Link>
            <Link to="/support/contact">문의하기</Link>
            <Link to="/privacy">개인정보처리방침</Link>
          </div>
          <p>© 2025 TRIP.BOOK. All rights reserved.</p>
          <p>개발자: Your Team Name</p>
        </div>
      </Footer>
    </>
  );
};

export default MainLayout;