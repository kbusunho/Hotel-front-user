import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/pages/auth/SignupPage.scss";

const signupImages = ["/images/login-bg-1.jpg", "/images/login-bg-2.jpg", "/images/login-bg-3.jpg"];

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert("Please enter your name.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Backend expects name, email, password, phone
    const newUser = {
      name: `${formData.firstName}${formData.lastName}`.trim(), // join without internal space
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    const ok = await signup(newUser);
    if (ok) navigate("/");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="image-section">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={1000}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="signup-swiper"
          >
            {signupImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt="Signup View" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="form-section">
          <h1 className="title">Sign up</h1>
          <p className="subtitle">회원가입</p>

          <form className="signup-form" onSubmit={handleSignup}>
            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  id="firstName"
                  placeholder="Hong"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Gil-dong"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  placeholder="john.doe@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  id="phone"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone Number</label>
              </div>
            </div>
            <div className="input-group full-width">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="...................."
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="input-group full-width">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="...................."
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password</label>
              <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="form-options">
              <label className="agree-term">
                <input type="checkbox" required /> <span>약관 동의</span>
              </label>
            </div>
            <button type="submit" className="btn-signup">계정 생성</button>
            <div className="login-link">
              <span>이미 계정이 있으신가요? </span>
              <Link to="/login">로그인</Link>
            </div>
            <div className="divider"><span>Or Sign up with</span></div>
            <div className="social-signup">
              <button type="button" className="social-btn facebook"><FontAwesomeIcon icon={faFacebook} /></button>
              <button type="button" className="social-btn google"><FontAwesomeIcon icon={faGoogle} /></button>
              <button type="button" className="social-btn apple"><FontAwesomeIcon icon={faApple} /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
