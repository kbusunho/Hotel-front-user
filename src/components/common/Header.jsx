import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./LogoutModal"; /* ✅ 모달 추가 */
import "../../styles/components/common/Header.scss";

const Header = ({ onMouseEnter, onMouseLeave }) => {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  
  /* ✅ 모달 상태 관리 */
  const [showModal, setShowModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="inner">
          <div className="header-left">
            <Link to="/" className="logo">
              <FontAwesomeIcon icon={faHotel} />
              <span>Hotels</span>
            </Link>
          </div>

          <div className="header-right">
            <span className="menu-text">♥ 찜하기</span>
            <span className="divider">|</span>
            
            {isAuthenticated ? (
              <>
                <div 
                  className="user-simple"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <div className="avatar-circle"></div>
                  <span>Tomhoon</span>
                </div>

                {/* ✅ 클릭 시 모달 띄움 */}
                <button className="btn-logout" onClick={() => setShowModal(true)}>
                  로그아웃
                </button>
              </>
            ) : (
              <button className="btn-logout" onClick={() => navigate('/login')}>
                로그인
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ✅ 모달 컴포넌트 렌더링 */}
      <LogoutModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={handleLogoutConfirm} 
      />
    </>
  );
};

export default Header;