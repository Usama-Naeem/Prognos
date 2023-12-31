import React from "react";
import LogoutHeader from "../../components/Header/LogoutHeader";
import AdminSigninForm from "../../components/SigninForm/AdminSigninForm";

const AdminSignin = () => (
  <div className="w-screen h-screen bg-darkColor absolute">
    <LogoutHeader />
    <AdminSigninForm />
  </div>
);

export default AdminSignin;
