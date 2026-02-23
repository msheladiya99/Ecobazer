import React from "react";
import { Footer } from "../Components";
import {pagenotfound} from "../assets"

const NotFonundPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between mt-6">
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
        <img src={pagenotfound} alt="Page Note Found" />
        <h1 className="text-center w-full text-7xl font-Poppins sm:text-3xl">Page Not Found</h1>
      </div>
      <Footer />
    </div>
  );
};

export default NotFonundPage;
