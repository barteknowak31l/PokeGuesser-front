import React from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProfilePage from "../pages/ProfilePage";

const Page = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default Page;
