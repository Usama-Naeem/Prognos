import React from "react";
import logo from "../../shared/assests/images/logo.png";

const LogoutHeader = ({
  className,
  height = "h-[100px]",
  logoWidth = "w-[242px]",
  border = "border-b border-light",
}) => (
  <>
    <div
      className={`${height} w-full inset-x-0  box-border ${border} flex items-center justify-center ${className}`}
    >
      <img src={logo} alt="logo" className={`${logoWidth}`} />
    </div>
  </>
);

export default LogoutHeader;
