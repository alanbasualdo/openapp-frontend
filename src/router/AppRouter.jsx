import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Navbar } from "../components/bars/Navbar";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { LoginPage } from "../pages/LoginPage";
import { LeftSidebar } from "../components/bars/LeftSidebar";
import { MainPage } from "../pages/MainPage";
import { RightSidebar } from "../components/bars/RightSidebar";
import { DollarPage } from "../pages/DollarPage";
import { ForgetPassword } from "../pages/ForgetPassword";
import { CreateTicket } from "../pages/CreateTicket";
import { Users } from "../pages/Users";

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
          <div className="flex" style={{ marginTop: "60px" }}>
            <LeftSidebar showLeftbar={showLeftbar} />
            <div
              className="w-full bg-dark text-white"
              style={{
                height: "calc(100vh - 60px)",
              }}
            >
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 60px)",
                }}
                className="py-3 px-4"
              >
                <div
                  style={{
                    maxWidth: "calc(100vw - 480px)",
                    margin: "0 auto",
                  }}
                >
                  <Routes>
                    <>
                      <Route path="/*" element={<HomePage />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/dollar" element={<DollarPage />} />
                      <Route path="/createTicket" element={<CreateTicket />} />
                      <Route path="/users" element={<Users />} />
                    </>
                  </Routes>
                </div>
              </div>
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
