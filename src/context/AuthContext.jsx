import React, { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthed = !!user;

  // 테스트용 계정 데이터
  const MOCK_USERS = [
    {
      id: 1,
      email: "test@hotel.com",
      password: "test1234",
      name: "홍길동",
      phone: "010-1234-5678",
      profileImage: "/images/default-avatar.jpg"
    }
  ];

  const login = async (email, password) => {
    try {
      // 백엔드가 없는 경우 테스트 계정으로 로그인
      const mockUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );

      if (mockUser) {
        // 비밀번호 제외하고 저장
        const { password: _, ...userData } = mockUser;
        localStorage.setItem("accessToken", "mock-token-12345");
        setUser(userData);
        return true;
      }

      // 실제 API 호출 (백엔드 연동 시 사용)
      const response = await authApi.login({ email, password });

      const token = response?.accessToken || response?.token;

      if (token) {
        localStorage.setItem("accessToken", token);

        const userData = await authApi.getMe();
        setUser(userData);

        return true;
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호를 확인해 주세요.");
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      await authApi.register(userData);
      await login(userData.email, userData.password);
      return true;
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem("accessToken");
      
      // 테스트 토큰인 경우 로컬 상태 업데이트
      if (token === "mock-token-12345") {
        const updatedUser = {
          ...user,
          ...profileData
        };
        setUser(updatedUser);
        return updatedUser;
      }

      // 실제 API 호출
      const updatedUser = await authApi.updateProfile(profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        // 테스트 토큰인 경우
        if (token === "mock-token-12345") {
          const mockUser = MOCK_USERS[0];
          const { password: _, ...userData } = mockUser;
          setUser(userData);
          setLoading(false);
          return;
        }

        // 실제 토큰인 경우
        try {
          const userData = await authApi.getMe();
          setUser(userData);
        } catch (error) {
          console.error("토큰 만료 또는 무효:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuthed,
        isAuthed,
        login,
        signup,
        logout,
        updateProfile,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
