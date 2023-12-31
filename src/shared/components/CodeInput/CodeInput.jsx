import { Form, Input } from "antd";
import React from "react";

const CodeInput = ({
  name,
  type = "text",
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  className = "w-[300px] lg:w-[450px] h-[40px] rounded-lg gap-2",
}) => (
  <>
    <Form.Item name={name} type={type} rules={rules}>
      <Input placeholder={placeholder} className={className} />
    </Form.Item>
  </>
);

export default CodeInput;
