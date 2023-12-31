import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Spinner from "../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../shared/constant/tailwindConstants";
import { setTwilioClient } from "../shared/store/slices/twilioClient";

const TwilioRoute = () => {
  const dispatch = useDispatch();
  const { isLoading, client, isSuccessFull } = useSelector(
    (state) => state.twilioClient,
  );

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("userDynamo"));
    dispatch(setTwilioClient(id));
  }, []);

  return isLoading || !client || !isSuccessFull ? (
    <div className="flex items-center justify-center">
      <Spinner className={darkColorSpinner} />
    </div>
  ) : (
    <Outlet />
  );
};

export default TwilioRoute;
