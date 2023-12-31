import React from "react";
import PlayStore from "../../shared/assests/images/play-store.png";
import AppStore from "../../shared/assests/images/app-store.png";

export default function DesktopView() {
  return (
    <div className="background-gradient">
      <div className="p-[30px] m-0 md:px-[80px]">
        <div className="bg-white min-h-screen md:min-h-0 rounded-none md:rounded-lg px-0 py-[30px] md:p-[80px]">
          <h1 className="text-2xl text-center">
            Please download mobile application
          </h1>
          <div className="flex justify-center mt-[30px]">
            <a
              href="https://play.google.com/store/apps/details?id=com.prognosus"
              target="_blank"
              rel="noreferrer"
            >
              <img src={PlayStore} />
            </a>
            <a
              href="https://apps.apple.com/pk/app/prognosus/id6449099224"
              target="_blank"
              rel="noreferrer"
            >
              <img src={AppStore} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
