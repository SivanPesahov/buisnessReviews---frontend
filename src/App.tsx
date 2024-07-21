import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessesPage from "./pages/BusinessesPage";
import BusinessesDetailsPage from "./pages/BusinessesDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { UserProvider, useUserContext } from "./components/AuthProvider";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUserContext();

  if (user === undefined) {
    return null;
  }

  if (user === null) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="businesses" element={<BusinessesPage />} />

            <Route
              path="businesses/:businessesId"
              element={
                // <ProtectedRoute>
                <BusinessesDetailsPage />
                // </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="*/" element={<NotFoundPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
