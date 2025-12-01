import React, { createContext, useState, useEffect, useContext } from "react";
import { authApi } from "../api/authApi";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthed = !!user;

  const login = async (email, password) => {
    try {
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

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
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
