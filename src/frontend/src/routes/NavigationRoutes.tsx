import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const Home = React.lazy(() => import("../pages/admin/Home"));
const Profile = React.lazy(() => import("../pages/admin/Profile"));
const SearchUser = React.lazy(() => import("../pages/admin/SearchUser"));
const Auth = React.lazy(() => import("../pages/admin/Login"));

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/search-user" element={<SearchUser />}></Route>
      <Route path="/auth" element={<Auth />}></Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default NavigationRoutes;
