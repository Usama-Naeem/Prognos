import { Button } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../shared/assests/images/logo.png";
import { ADMIN_SIGNIN } from "../../shared/constant/pageRoutes";
import { logout } from "../../shared/utils";
import AuthContext from "../../shared/context/AuthContext";

function MainHeader({ loading }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    loading(true);
    await logout();
    authContext.setUserDynamo(null);
    navigate(ADMIN_SIGNIN);
  };

  return (
    <div className="h-[60px] bg-darkColor w-screen">
      <div className="flex items-center justify-between min-h-full px-3 sm:px-5">
        <img src={Logo} className="w-[130px] sm:w-[160px]" />
        <div className="flex items-center gap-[20px]">
          <Button
            className="border-0 bg-secondaryColor hover:!text-black"
            onClick={logoutHandler}
          >
            {"Sign Out"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
