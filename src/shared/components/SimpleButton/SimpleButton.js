import React from "react";
import { Button } from "antd";

function SimpleButton({
  type = "primary",
  className = "",
  label = "",
  onClick,
  loading,
}) {
  return (
    <>
      <Button
        type={type}
        htmlType="submit"
        className={className}
        onClick={onClick}
        loading={loading}
      >
        {label}
      </Button>
    </>
  );
}

export default SimpleButton;
