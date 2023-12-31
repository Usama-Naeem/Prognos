import { Input } from "antd";
import React, { useEffect, useState } from "react";

const PhoneNumberInput = ({
  value,
  onChange,
  placeholder,
  icon,
  setFormState = {},
  maxLength,
  className,
}) => {
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

  useEffect(() => {
    // Format phone number as (123) 456-7890
    const formatted = value
      ?.replace(/\D/g, "")
      .replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
    setFormState((prev) => ({ ...prev, phoneNumber: formatted }));
    setFormattedPhoneNumber(formatted);
  }, [value]);

  return (
    <>
      <Input
        value={formattedPhoneNumber}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        addonAfter={icon}
        maxLength={maxLength}
        className={className}
      />
    </>
  );
};

export default PhoneNumberInput;
