import React from "react";
import { Input, Form } from "antd";

function ModalNameInput({
  label = "",
  name,
  type = "text",
  placeholder,
  icon = null,
  defaultValue,
  disabled = false,
  onChange = {},
  className,
  id = "",
}) {
  return (
    <>
      <Form.Item
        label={label}
        name={name}
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input
          className={className}
          type={type}
          addonAfter={icon}
          onChange={onChange ? onChange : null}
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

export default ModalNameInput;
