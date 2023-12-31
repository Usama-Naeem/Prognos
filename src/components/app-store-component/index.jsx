import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { isIOS, isAndroid } from "react-device-detect";
import PlayStore from "../../shared/assests/images/play-store.png";
import AppStore from "../../shared/assests/images/app-store.png";

const AppStoreComponent = () => (
  <div className="flex align mt-[30px]">
    {isAndroid ? (
      <a href="https://play.google.com/store/apps/details?id=com.prognosus" target="_blank" rel="noreferrer">
        <img src={PlayStore} />
      </a>
    ) : isIOS ? (
      <a href="https://apps.apple.com/pk/app/prognosus/id6449099224" target="_blank" rel="noreferrer">
        <img src={AppStore} />
      </a>
    ) : (
      <div className="flex align">
        <a href="https://play.google.com/store/apps/details?id=com.prognosus" target="_blank" rel="noreferrer">
          <img src={PlayStore} />
        </a>
        <a href="https://apps.apple.com/pk/app/prognosus/id6449099224" target="_blank" rel="noreferrer">
          <img src={AppStore} />
        </a>
      </div>
    )}
  </div>
);

export default AppStoreComponent;