import React from "react";
import { LeftSidebar } from "../components/LeftSidebar";
import { RightSidebar } from "../components/RightSidebar";
import { Navbar } from "../components/Navbar";
import { HomePage } from "./HomePage";

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <LeftSidebar />
        <HomePage />
        <RightSidebar />
      </div>
    </>
  );
};
