import React, { useEffect } from "react";
import AppRouter from "./AppRouter";

const App = () => {
  // useEffect를 사용하여 컴포넌트가 처음 마운트될 때 한 번만 실행되도록 수정
  useEffect(() => {
    // 1. 호텔 정보 가져오기
    fetch("/api/hotels")
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`); // 에러 처리 강화
        return res.json();
      })
      .then((data) => console.log("✅ GET /api/hotels:", data))
      .catch((err) => console.error("❌ GET /api/hotels error:", err));

    // 2. 객실 정보 가져오기
    fetch("/api/rooms")
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((data) => console.log("✅ GET /api/rooms:", data))
      .catch((err) => console.error("❌ GET /api/rooms error:", err));
  }, []); // [] 의존성 배열을 비워두면 처음에 딱 한 번만 실행됨

  return <AppRouter />;
};

export default App;