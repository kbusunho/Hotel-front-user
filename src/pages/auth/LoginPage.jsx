import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginForm = styled.form`
  margin-top: 30px;
  .input-group {
    margin-bottom: 20px;
    text-align: left;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
    input {
      width: 100%;
      padding: 13px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.2s ease-in-out;
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.2);
      }
    }
  }

  .forgot-password {
    text-align: right;
    margin-top: -10px;
    margin-bottom: 20px;
    a {
      color: var(--text-secondary);
      font-size: 0.9rem;
      &:hover {
        color: var(--primary-color);
      }
    }
  }

  .social-login {
    margin-top: 30px;
    border-top: 1px solid var(--border-color);
    padding-top: 25px;

    p {
      margin-bottom: 15px;
      color: var(--text-secondary);
    }
    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;

      button {
        background: #f0f2f5;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        color: var(--text-secondary);
        font-weight: 600;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

        &:hover {
          background: #e8ebf0;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: translateY(0);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

const LoginPage = () => {
  // 이미지 URL을 변수로 빼서 에러 방지
  const KAKAO_IMG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Kakao_CI_White.svg/1200px-Kakao_CI_White.svg.png";
  const GOOGLE_IMG =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png";

  return (
    <>
      <h2>로그인</h2>
      <LoginForm>
        <div className="input-group">
          <label htmlFor="email">이메일 주소</label>
          <input type="email" id="email" placeholder="이메일을 입력해주세요" />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="forgot-password">
          <Link to="/reset-password">비밀번호를 잊으셨나요?</Link>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", padding: "15px" }}
        >
          로그인
        </button>
      </LoginForm>

      <p
        style={{
          marginTop: "25px",
          color: "var(--text-secondary)",
          fontSize: "0.95rem",
        }}
      >
        아직 계정이 없으신가요?{" "}
        <Link
          to="/signup"
          style={{ color: "var(--primary-color)", fontWeight: "bold" }}
        >
          회원가입
        </Link>
      </p>

      <div className="social-login">
        <p>- 또는 소셜 계정으로 로그인 -</p>
        <div className="social-buttons">
          <button type="button">
            <img
              src={KAKAO_IMG}
              alt="Kakao"
              style={{ filter: "invert(100%)" }}
            />
            카카오
          </button>
          <button type="button">
            <img src={GOOGLE_IMG} alt="Google" />
            구글
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
