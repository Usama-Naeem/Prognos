import React from "react";
import { Button, Form } from "antd";
import ButtonSpinner from "../Spinner/ButtonSpinner";

function ModalSubmitButton({ label, loading, className }) {
  return (
    <>
      <Form.Item>
        <Button
          htmlType="submit"
          disabled={loading ? true : false}
          className={`w-full text-white bg-primaryColor mt-[20px] h-[40px] rounded-full font-medium ${className}`}
        >
          {loading ? <ButtonSpinner /> : label}
        </Button>
      </Form.Item>
    </>
  );
}

export default ModalSubmitButton;
