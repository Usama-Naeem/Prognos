import React from "react";
import { Button, Form } from "antd";

function FormSubmitButton({
  label,
  type = "primary",
  className = "",
  loading,
}) {
  return (
    <>
      <Form.Item>
        <Button
          type={type}
          htmlType="submit"
          className={className}
          loading={loading}
        >
          {label}
        </Button>
      </Form.Item>
    </>
  );
}

export default FormSubmitButton;
