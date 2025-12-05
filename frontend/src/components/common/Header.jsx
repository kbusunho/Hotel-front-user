/* src/components/common/Header.jsx */
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faHeart,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import LogoutModal from "./LogoutModal";
import "../../styles/components/common/Header.scss";

const Header = ({ onMouseEnter, onMouseLeave }) => {
  const { isAuthenticated, login, logout, user } = useAuth();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const wishlistCount = getWishlistCount();

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  /* ✅ [수정] 중앙 로고 헤더를 보여줄 페이지 조건 추가 */
  const showGolobeHeader =
    location.pathname === "/wishlist" ||
    location.pathname.startsWith("/booking") ||
    location.pathname.startsWith("/hotels");

  /* ✅ [수정] 각 메뉴 활성화 상태 확인 */
  const isWishlistActive = location.pathname === "/wishlist";
  const isFindStaysActive =
    location.pathname.startsWith("/hotels") ||
    location.pathname.startsWith("/booking");

  return (
    <>
      <header className={`header ${showGolobeHeader ? "wishlist-header" : ""}`}>
        <div className="inner">
          {showGolobeHeader ? (
            /* CASE 1: 중앙 로고 헤더 (찜하기, 예약, 상세 페이지 등) */
            <>
              <div className="header-left wishlist-mode">
                <Link to="/flights" className="nav-item">
                  <FontAwesomeIcon icon={faPlane} /> Find Flight
                </Link>
                {/* ✅ Find Stays에 active 클래스 적용 */}
                <Link
                  to="/hotels"
                  className={`nav-item ${isFindStaysActive ? "active" : ""}`}
                >
                  <FontAwesomeIcon icon={faBed} /> Find Stays
                </Link>
              </div>

              <div className="header-center">
                <Link to="/" className="logo">
                  {/* 로고 이미지 (없으면 텍스트) */}
                  {/* <img src="/images/logo-icon.png" alt="golobe" className="logo-icon" /> */}
                  <span className="logo-text">golobe</span>
                </Link>
              </div>

              <div className="header-right wishlist-mode">
                {/* 찜하기 버튼 active 적용 */}
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
                    <div
                      className="user-menu-wrapper"
                      style={{ position: 'relative' }}
                    >
                      <div
                        className="user-simple"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="avatar-circle"></div>
                        <span>{user && user.name ? user.name : "Tomhoon"}</span>
                      </div>

                      {showUserMenu && (
                        <div className="user-dropdown-menu">
                          <Link to="/mypage" onClick={() => setShowUserMenu(false)}>
                            마이페이지
                          </Link>
                          <Link to="/mypage/bookings" onClick={() => setShowUserMenu(false)}>
                            예약 내역
                          </Link>
                          <Link to="/mypage/wishlist" onClick={() => setShowUserMenu(false)}>
                            찜한 호텔
                          </Link>
                          <Link to="/mypage/profile" onClick={() => setShowUserMenu(false)}>
                            프로필 설정
                          </Link>
                          <div className="divider"></div>
                          <button onClick={() => {
                            setShowUserMenu(false);
                            setShowModal(true);
                          }}>
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
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
            /* CASE 2: 일반 헤더 (메인 등) */
            <>
              <div className="header-left">
                <Link to="/" className="logo">
                  <FontAwesomeIcon icon={faHotel} /> <span>Hotels</span>
                </Link>
              </div>

              <div className="header-center"></div>

              <div className="header-right">
                <Link to="/wishlist" className="menu-item">
                  <FontAwesomeIcon icon={faHeart} /> <span>찜하기</span>
                </Link>
                <div className="separator">|</div>
                {isAuthenticated ? (
                  <>
                    <div
                      className="user-menu-wrapper"
                      style={{ position: 'relative' }}
                    >
                      <div
                        className="user-simple"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="avatar-circle"></div>
                        <span>{user && user.name ? user.name : "Tomhoon"}</span>
                      </div>

                      {showUserMenu && (
                        <div className="user-dropdown-menu">
                          <Link to="/mypage" onClick={() => setShowUserMenu(false)}>
                            마이페이지
                          </Link>
                          <Link to="/mypage/bookings" onClick={() => setShowUserMenu(false)}>
                            예약 내역
                          </Link>
                          <Link to="/mypage/wishlist" onClick={() => setShowUserMenu(false)}>
                            찜한 호텔
                          </Link>
                          <Link to="/mypage/profile" onClick={() => setShowUserMenu(false)}>
                            프로필 설정
                          </Link>
                          <div className="divider"></div>
                          <button onClick={() => {
                            setShowUserMenu(false);
                            setShowModal(true);
                          }}>
                            로그아웃
                          </button>
                        </div>
                      )}
                    </div>
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
