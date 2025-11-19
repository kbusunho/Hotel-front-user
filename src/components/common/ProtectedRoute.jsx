// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // AuthContext 경로 확인

const ProtectedRoute = ({ children }) => {
  const { isAuthed } = useContext(AuthContext); // 로그인 상태 사용
  // const isAuthed = true; // 개발 중 테스트용으로 true 해제

  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;