import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/Navbar";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { LoginPage } from "../pages/LoginPage";
import { LeftSidebar } from "../components/LeftSidebar";
import { MainPage } from "../pages/MainPage";
import { RightSidebar } from "../components/RightSidebar";
import { WorkPage } from "../pages/WorkPage";
import { DollarPage } from "../pages/DollarPage";
import { ForgetPassword } from "../pages/ForgetPassword";

export const AppRouter = () => {
  /*  const { status } = useSelector((state) => state.auth); */
  const [status, setStatus] = useState("auth");
  const [showLeftbar, setShowLeftbar] = useState(true);
  const [showRightbar, setShowRightbar] = useState(true);

  return (
    <>
      {status === "auth" ? (
        <>
          <Navbar
            showLeftbar={showLeftbar}
            setShowLeftbar={setShowLeftbar}
            showRightbar={showRightbar}
            setShowRightbar={setShowRightbar}
          />
          <div className="flex">
            <LeftSidebar showLeftbar={showLeftbar} />
            <div className="w-full p-3 bg-blue-600 text-white">
              <Routes>
                <>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/dollar" element={<DollarPage />} />
                  <Route path="/*" element={<HomePage />} />
                </>
              </Routes>
            </div>
            <RightSidebar showRightbar={showRightbar} />
          </div>
        </>
      ) : (
        <Routes>
          <>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
          </>
        </Routes>
      )}
    </>
  );
};
