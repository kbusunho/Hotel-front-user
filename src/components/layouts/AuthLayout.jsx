// src/components/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1542662125-3b99453965b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center center/cover no-repeat;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4); /* 어두운 오버레이 */
    z-index: 1;
  }
`;

const AuthBox = styled.div`
  background: var(--white);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 15px 30px var(--shadow-medium); /* 더 깊은 그림자 */
  text-align: center;
  width: 100%;
  max-width: 420px;
  z-index: 2; /* 배경 위에 오도록 */

  .auth-logo {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: 30px;
    letter-spacing: -0.8px;
  }
`;

const AuthLayout = () => {
  return (
    <AuthContainer>
      <AuthBox>
        <Link to="/" className="auth-logo">TRIP.BOOK</Link>
        <Outlet /> {/* LoginPage, SignupPage 등이 여기에 렌더링 */}
      </AuthBox>
    </AuthContainer>
  );
};
export default AuthLayout;