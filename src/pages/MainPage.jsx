import React from "react";
import { LeftSidebar } from "../components/bars/LeftSidebar";
import { RightSidebar } from "../components/bars/RightSidebar";
import { Navbar } from "../components/bars/Navbar";
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
