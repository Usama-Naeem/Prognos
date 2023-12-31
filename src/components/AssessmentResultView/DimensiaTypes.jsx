import React from "react";

function DimensiaTypes({ title, rating }) {
  return (
    <>
      <div className="p-[30px] flex items-center justify-between border-gray-100 border-2 border-solid w-full md:w-[70%] rounded-xl">
        <p className="flex-1 mb-0 text-md md:text-2xl">{title}</p>
        <div className="relative bg-secondaryColor w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full">
          <span className="absolute text-white text-xl md:text-3xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            {rating}
          </span>
        </div>
      </div>
    </>
  );
}

export default DimensiaTypes;
