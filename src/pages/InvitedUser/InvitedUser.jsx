import React from "react";
import LogoutHeader from "../../components/Header/LogoutHeader";
import TemporaryPassword from "../../components/TemporaryPassword/TemporaryPassword";

const InvitedUser = () => (
  <div className="w-screen h-screen bg-darkColor absolute">
    <LogoutHeader />
    <TemporaryPassword />
  </div>
);

export default InvitedUser;
