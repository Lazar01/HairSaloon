import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../routes/HomePage";
import ContactPage from "../routes/ContactPage";
import BlogPage from "../routes/BlogPage";
import NavigationLayout from "./navigationLayout";
import StaffPage from "../routes/Staff";
import ServicesPage from "../routes/Services";
import Login from "../routes/Login";
import Register from "../routes/Register";
import useVerifyAuthentication from "../hooks/verifyJWTHook";
import React, { useEffect } from "react";
function NavBar() {
  const { isAuthenticated, user, refetch, expTime, loading, error } =
    useVerifyAuthentication();
  let location = useLocation();
  useEffect(() => {
    if (expTime * 1000 < Date.now()) {
      refetch();
    }
  }, [location]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <>
      <NavigationLayout
        isAuthenticated={isAuthenticated}
        refetch={refetch}
        user={user}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Login isAuthenticated={isAuthenticated} refetch={refetch} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <HomePage
              isAuthenticated={isAuthenticated}
              user={user}
              refetch={refetch}
            />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/staff" element={<StaffPage />} />
        <Route
          path="/services"
          element={
            <ServicesPage user={user} isAuthenticated={isAuthenticated} />
          }
        />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </>
  );
}
export default NavBar;
