import React, { useState } from "react";
import { Form } from "antd";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import PhoneNumberInput from "../../shared/components/PhoneNumberInput/PhoneNumberInput";

function AssessmentPhone({ onSubmit, loading, phoneNumber, onChange }) {
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState({
    phoneNumber: "",
  });

  const handleInputChange = (newPhoneNumber) => {
    onChange(newPhoneNumber);
  };
  const handleFormSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <div className="p-[40px] min-h-screen md:min-h-0 md:ml-[50%] md:translate-x-[-50%] bg-white min-w-[100%] lg:min-w-[60%] md:rounded-2xl">
      <h3>Please Enter your phone number to find your result</h3>
      <p>The format is as follows (241)212-3422</p>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item
          label="Phone Number"
          type="text"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter Phone Number!",
            },
          ]}
        >
          <PhoneNumberInput
            value={phoneNumber}
            placeholder="(222) 222-2222"
            errorCheck={true}
            onChange={handleInputChange}
            setFormState={setFormValues}
            maxLength={10}
          />
        </Form.Item>
        <ModalSubmitButton
          loading={loading}
          label="Get My Result"
          className="h-[55px] text-lg"
        />
      </Form>
    </div>
  );
}

export default AssessmentPhone;
