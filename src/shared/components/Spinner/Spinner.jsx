import React from "react";
import "./Spinner.css";

function Spinner({ className = "" }) {
  return (
    <>
      <span
        className={`loaderSpinner ${className ? className : "bg-black"}`}
      ></span>
    </>
  );
}
export default Spinner;
