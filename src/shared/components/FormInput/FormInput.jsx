import { Form, Input } from "antd";
import React from "react";
import { PASSWORD } from "../../constant/formConstatnt";

const FormInput = ({
  name,
  type = "text",
  rules = [
    {
      required: false,
    },
  ],
  placeholder,
  className = "w-[300px] lg:w-[450px] h-[40px] rounded-lg gap-2",
  defaultValue = "",
  disabled = false,
  icon,
  label,
  id = "",
}) => (
  <>
    <Form.Item name={name} type={type} rules={rules} label={label}>
      {type !== PASSWORD ? (
        <Input
          placeholder={placeholder}
          className={className}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={null}
          addonAfter={icon}
          id={id}
        />
      ) : (
        <Input.Password
          onChange={null}
          placeholder={placeholder}
          className={className}
          id={id}
        />
      )}
    </Form.Item>
  </>
);

export default FormInput;
