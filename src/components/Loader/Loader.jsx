// src/components/Loader.js
import React from "react";
import { Oval } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <Oval
        height={80}
        width={80}
        color="#696299"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#f0f0f0"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;


