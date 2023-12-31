import React from "react";
import { Input, Form } from "antd";

function ModalInput({
  label,
  name,
  type = "text",
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  icon,
  defaultValue,
  disabled,
  className,
  id = "",
  onChange,
}) {
  return (
    <>
      <Form.Item label={label} name={name} rules={rules}>
        <Input
          className={className}
          type={type}
          addonAfter={icon}
          onChange={onChange}
          size="large"
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
        />
      </Form.Item>
    </>
  );
}

export default ModalInput;
