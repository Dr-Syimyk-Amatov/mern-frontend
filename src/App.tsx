import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Login, Register } from "./components/auth";
import { Home } from "./components/home";
import { AuthProvider } from "./hooks";
import { ProtectedRoute } from "./routes";
import { PageLayout } from "./components/page-layout/page-layout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PageLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
