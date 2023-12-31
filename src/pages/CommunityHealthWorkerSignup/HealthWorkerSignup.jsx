import React from "react";
import LogoutHeader from "../../components/Header/LogoutHeader";
import CommunityHealthWorkerSignup from "../../components/CommunityHealthWorkerSignup/CommunityHealthWorkerSignup";

const HealthWorkerSignup = () => (
  <div className="w-screen h-screen bg-darkColor absolute">
    <LogoutHeader />
    <div className="flex items-center justify-center flex-col h-[calc(100%-100px)]">
      <CommunityHealthWorkerSignup />
    </div>
  </div>
);

export default HealthWorkerSignup;
