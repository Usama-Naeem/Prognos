import React from "react";
import { Select } from "antd";

function SimpleSelect({
  placeholder = null,
  options,
  defaultValue = null,
  size = "large",
  onChangeHandler = {},
}) {
  return (
    <>
      <Select
        placeholder={placeholder}
        defaultValue={defaultValue}
        size={size}
        options={options}
        className="w-[90px]"
        onChange={onChangeHandler}
      />
    </>
  );
}

export default SimpleSelect;
