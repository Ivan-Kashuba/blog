import React from "react";
import preloader from "./../../img/spinner.svg";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloader} alt="loading..." />
    </div>
  );
};

export default Preloader;
