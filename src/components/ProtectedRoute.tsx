import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // 컴포넌트가 함수를 감싸안는 형태라서
  // 이것을 함수에서 컴포넌트로 변경한다.
  // const navigate = useNavigate();
  const user = auth.currentUser;
  console.log(user);
  if (!user || user === null) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
