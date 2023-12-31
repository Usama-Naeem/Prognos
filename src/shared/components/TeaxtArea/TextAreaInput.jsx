import React from "react";
import { Input, Form } from "antd";

const { TextArea } = Input;
function TextAreaInput({
  name,
  type = "text",
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  rows,
}) {
  return (
    <>
      <Form.Item name={name} rules={rules}>
        <TextArea
          type={type}
          size="large"
          placeholder={placeholder}
          rows={rows}
        />
      </Form.Item>
    </>
  );
}

export default TextAreaInput;
