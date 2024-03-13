import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../routes/HomePage";
import ContactPage from "../routes/ContactPage";
import BlogPage from "../routes/BlogPage";
import NavigationLayout from "./navigationLayout";
import StaffPage from "../routes/Staff";
import ServicesPage from "../routes/Services";
import Login from "../routes/Login";
import Register from "../routes/Register";
import UserPage from "../routes/UserPage";
import useVerifyAuthentication from "../hooks/verifyJWTHook";
import React, { useEffect } from "react";
function NavBar() {
  const { isAuthenticated, user, refetch, expTime, loading, error, role } =
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
        <Route
          path="/blog"
          element={
            <BlogPage isAuthenticated={isAuthenticated} role={user.Role} />
          }
        />
        <Route
          path="/staff"
          element={<StaffPage isAuthenticated={isAuthenticated} user={user} />}
        />
        <Route
          path="/services"
          element={
            <ServicesPage user={user} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="*" element={<HomePage />} />
        <Route
          path="/user"
          element={
            <UserPage
              user={user}
              isAuthenticated={isAuthenticated}
              refetch={refetch}
            ></UserPage>
          }
        ></Route>
      </Routes>
    </>
  );
}
export default NavBar;
