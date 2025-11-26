import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";

/* ✅ Swiper 관련 import 추가 */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "../../styles/pages/auth/LoginPage.scss";

/* ✅ 슬라이드에 사용할 이미지 배열 정의 */
const loginImages = [
  "/images/login-bg-1.jpg",
  "/images/login-bg-2.jpg",
  "/images/login-bg-3.jpg"
];

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* 1. 왼쪽 폼 영역 (기존과 동일) */}
        <div className="form-section">
          <h1 className="title">Login</h1>
          <p className="subtitle">로그인해주세요</p>

          <form className="login-form" onSubmit={handleLogin}>
            {/* ... (입력창들 기존 코드 유지) ... */}
            <div className="input-group">
              <input type="email" id="email" placeholder="john.doe@gmail.com" />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                placeholder="...................." 
              />
              <label htmlFor="password">Password</label>
              <span 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>비밀번호 기억하기</span>
              </label>
              <Link to="/reset-password" class="forgot-link">Forgot Password</Link>
            </div>
            <button type="submit" className="btn-login">Login</button>
            <div className="signup-link">
              <Link to="/signup">회원가입</Link>
            </div>
            <div className="divider">
              <span>Or login with</span>
            </div>
            <div className="social-login">
              <button type="button" className="social-btn facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button type="button" className="social-btn google">
                <FontAwesomeIcon icon={faGoogle} />
              </button>
              <button type="button" className="social-btn apple">
                <FontAwesomeIcon icon={faApple} />
              </button>
            </div>
          </form>
        </div>

        {/* ✅ 2. 오른쪽 이미지 영역 (Swiper 적용) */}
        <div className="image-section">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true} // 무한 반복
            speed={1000} // 부드러운 전환 속도
            autoplay={{ delay: 3000, disableOnInteraction: false }} // 3초마다 자동 넘김
            pagination={{ clickable: true }} // 하단 점 클릭 가능
            modules={[Autoplay, Pagination]}
            className="login-swiper"
          >
            {loginImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Login Resort ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* ❌ 기존의 가짜 slider-dots div는 삭제했습니다. (Swiper 내장 기능 사용) */}
        </div>

      </div>
    </div>
  );
};

export default LoginPage;