import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.scss";
import { AuthProvider } from "./hooks";
import { ProtectedRoute } from "./routes";
import { initErrorHandler } from "./api";
import { UserProvider } from "./contexts";
import { Login, Register } from "./components/auth";
import { Home } from "./components/home";
import { PageLayout } from "./components/page-layout";
import { Books } from "./pages/books";

function App() {
  const navigate = useNavigate();
  const [isInit, setInit] = useState(false);

  useEffect(() => {
    if (!isInit) {
      initErrorHandler(navigate);
      setInit(true);
    }
  }, [navigate, isInit]);

  if (!isInit) return null;

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <UserProvider>
              <PageLayout />
            </UserProvider>
          }
        >
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
