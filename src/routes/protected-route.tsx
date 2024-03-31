import { Navigate } from "react-router-dom";
import * as React from "react";
import { useAuth } from "../hooks/use-auth";

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();
  if (!user) {
    // return <span>hello</span>;
    return <Navigate to="/login" />;
  }
  return children;
};
