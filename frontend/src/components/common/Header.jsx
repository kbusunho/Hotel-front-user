/* src/components/common/Header.jsx */
import React, { useState, useRef } from "react"; // ✅ useRef 추가
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faPlane,
  faHeart,
  faBed,
  faUser,
  faCreditCard,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./LogoutModal";
import "../../styles/components/common/Header.scss";

const Header = () => {
  const { isAuthenticated, login, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // ✅ [추가] 딜레이를 관리하기 위한 ref
  const timerRef = useRef(null);

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  /* ✅ [수정] 마우스 진입 핸들러 (딜레이 취소 + 열기) */
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setDropdownOpen(true);
  };

  /* ✅ [수정] 마우스 이탈 핸들러 (0.2초 뒤에 닫기) */
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // 200ms(0.2초) 뒤에 닫힘 -> 마우스 이동할 시간 확보
  };

  const showGolobeHeader =
    location.pathname === "/wishlist" ||
    location.pathname.startsWith("/booking") ||
    location.pathname.startsWith("/hotels");

  const isWishlistActive = location.pathname === "/wishlist";
  const isFindStaysActive =
    location.pathname.startsWith("/hotels") ||
    location.pathname.startsWith("/booking");

  /* 유저 프로필 렌더링 함수 */
  const renderUserProfile = () => (
    <div
      className="user-profile-wrapper"
      onMouseEnter={handleMouseEnter} // ✅ 핸들러 교체
      onMouseLeave={handleMouseLeave} // ✅ 핸들러 교체
    >
      <div className="user-simple" onClick={() => navigate("/mypage")}>
        <div className="avatar-circle"></div>
        <span>{user && user.name ? user.name : "Tomhoon"}</span>
      </div>

      {isDropdownOpen && (
        <div className="user-dropdown-menu">
          <div className="dropdown-profile-info">
            <div className="avatar-large"></div>
            <div className="info-text">
              <span className="name">
                {user && user.name ? user.name : "Tomhoon"}
              </span>
              <span className="status">Online</span>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <ul className="dropdown-list">
            <li onClick={() => navigate("/mypage")}>
              <FontAwesomeIcon icon={faUser} className="icon" /> 계정
            </li>
            <li onClick={() => navigate("/payments")}>
              <FontAwesomeIcon icon={faCreditCard} className="icon" /> 결제내역
            </li>
            <li onClick={() => navigate("/settings")}>
              <FontAwesomeIcon icon={faCog} className="icon" /> 설정
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className={`header ${showGolobeHeader ? "wishlist-header" : ""}`}>
        <div className="inner">
          {showGolobeHeader ? (
            /* CASE 1 */
            <>
              <div className="header-left wishlist-mode">
                <Link to="/flights" className="nav-item">
                  <FontAwesomeIcon icon={faPlane} /> Find Flight
                </Link>
                <Link
                  to="/hotels"
                  className={`nav-item ${isFindStaysActive ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faBed} /> Find Stays
                </Link>
              </div>

              <div className="header-center">
                <Link to="/" className="logo">
                  <span className="logo-text">golobe</span>
                </Link>
              </div>

              <div className="header-right wishlist-mode">
                <Link
                  to="/wishlist"
                  className={`menu-text ${isWishlistActive ? "active" : ""}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <FontAwesomeIcon icon={faHeart} /> Favourites
                </Link>
                <span className="divider">|</span>

                {isAuthenticated ? (
                  <>
                    {renderUserProfile()}
                    <button
                      className="btn-logout"
                      onClick={() => setShowModal(true)}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-logout"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>
                )}
              </div>
            </>
          ) : (
            /* CASE 2 */
            <>
              <div className="header-left">
                <Link to="/" className="logo">
                  <FontAwesomeIcon icon={faHotel} /> <span>Hotels</span>
                </Link>
              </div>

              <div className="header-right">
                <Link to="/wishlist" className="menu-item">
                  <FontAwesomeIcon icon={faHeart} /> <span>찜하기</span>
                </Link>
                <div className="separator">|</div>

                {isAuthenticated ? (
                  <>
                    {renderUserProfile()}
                    <button
                      className="btn-logout"
                      onClick={() => setShowModal(true)}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-logout"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </header>
      <LogoutModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default Header;
