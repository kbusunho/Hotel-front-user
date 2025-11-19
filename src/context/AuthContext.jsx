import React, { createContext, useState } from "react";

// Vite 경고 무시용 주석
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 🚀 [핵심 변경] useState 안에 함수를 넣어서, 처음 켜질 때 딱 한 번만 실행되게 함
  // 이렇게 하면 useEffect가 필요 없어서 에러가 싹 사라집니다.
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("세션 파싱 에러", error);
      return null;
    }
  });

  // 로그인 상태 여부
  const isAuthed = !!user;

  // 로그인 함수
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // useEffect가 사라졌습니다! (위의 useState에서 이미 처리했기 때문)

  return (
    <AuthContext.Provider value={{ user, isAuthed, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
