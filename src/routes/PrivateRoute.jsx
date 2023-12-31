import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../shared/components/Spinner/Spinner";
import { getJWT } from "../shared/utils";
import { darkColorSpinner } from "../shared/constant/tailwindConstants";
import { ADMIN_SIGNIN } from "../shared/constant/pageRoutes";

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loginState, setLoginState] = useState(false);

  // checking if the user is logged in
  useEffect(() => {
    (async () => {
      try {
        await getJWT();
        setLoginState(true);
      } catch (error) {
        setLoginState(false);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-full text-center mt-[40vh]">
        <Spinner className={darkColorSpinner} />
      </div>
    );
  }

  if (!loginState) {
    return <Navigate to={ADMIN_SIGNIN} />;
  }

  return children;
};

export default PrivateRoute;
