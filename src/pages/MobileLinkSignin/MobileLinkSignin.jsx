import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import DesktopView from "./DesktopView";

export default function MobileLinkSignin() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [URLSearchParams] = useSearchParams();
  const accessToken = URLSearchParams.get("accessToken");
  const userRole = URLSearchParams.get("role");
  const deviceType = new MobileDetect(window.navigator.userAgent);

  useEffect(() => {
    if (deviceType.os() === "AndroidOS" || deviceType.os() === "iOS") {
      setIsLoading(false);
      window.location.replace(
        `com.prognosus://?role=${userRole}&accessToken=${accessToken}`,
      );
    } else {
      setIsLoading(false);
      setIsDesktop(true);
    }
  });

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {isDesktop && <DesktopView />}
        {isLoading && <Spinner className={darkColorSpinner} />}
      </div>
    </div>
  );
}
