import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [loading, setLoading] = useState(false);
  const isAuthed = !!user;

  /* ✅ [수정됨] 로그인 함수 */
  const login = (userData) => {
    // 1. 들어온 데이터가 유효한지 확인 (이름이 있어야 함)
    if (userData && userData.name) {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      
      if (userData.token) {
        localStorage.setItem("accessToken", userData.token);
      }
    } else {
      // ❌ [삭제됨] 데이터가 없으면 Tomhoon으로 만드는 코드 삭제함
      console.error("로그인 실패: 유저 정보가 없습니다.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuthed, 
        isAuthed,
        login,
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