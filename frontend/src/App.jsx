import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Invitation = lazy(() => import("./pages/Invitation"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/admin" replace />;
  return children;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900">
            <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold-400 border-t-transparent" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/nuhan" replace />} />
          <Route path="/:slug" element={<Invitation />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/nuhan" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
