import React from "react";
import { Select, Form } from "antd";

function MultiSelect({
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
  mode,
  defaultValue = null,
  allowClear = false,
  maxTagCount = 2,
  onSelect,
  onDeselect,
}) {
  return (
    <>
      <Form.Item name={name} label={label} rules={rules}>
        <Select
          mode={mode}
          allowClear={allowClear}
          placeholder={placeholder}
          defaultValue={defaultValue}
          options={options}
          className={className}
          maxTagCount={maxTagCount}
          onSelect={onSelect}
          onDeselect={onDeselect}
          showArrow
        />
      </Form.Item>
    </>
  );
}

export default MultiSelect;
