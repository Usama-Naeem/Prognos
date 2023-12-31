import React from "react";
import { Select, Form } from "antd";

function FormSelect({
  name,
  label,
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  options,
  className = "",
  disabled,
  handleChange = null,
}) {
  return (
    <>
      <Form.Item name={name} label={label} rules={rules}>
        <Select
          placeholder={placeholder}
          size="large"
          options={options}
          className={className}
          showSearch
          allowClear
          disabled={disabled}
          onChange={handleChange}
        />
      </Form.Item>
    </>
  );
}

export default FormSelect;
