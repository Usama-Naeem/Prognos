import React, { useState } from "react";
import { Form, message } from "antd";
import { FormRule } from "../../shared/enum/formRules";
import FormModal from "../../shared/components/FormModal/FormModal";
import FormInput from "../../shared/components/FormInput/FormInput";
import SimpleButton from "../../shared/components/SimpleButton/SimpleButton";
import { changePassword } from "../../shared/api/changePassword";
import { PASSWORD_NOT_MATCHED } from "../../shared/constant/error";

function ChangePasswordModal({ isModalOpen, setIsModalOpen, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleFormSubmit = async (values) => {
    try {
      setErrorMessage(null);
      if (values.newPassword !== values.confirmPassword) {
        setErrorMessage(PASSWORD_NOT_MATCHED);
        return;
      }
      setIsLoading(true);
      await changePassword(values.oldPassword, values.newPassword);
      message.success("Your password is successfully changed", [3]);
      setIsLoading(false);
      setIsModalOpen(false);
      setErrorMessage(null);
    } catch (err) {
      setIsLoading(false);
      throw Error(err.message);
    }
  };
  return (
    <>
      <FormModal
        title={title}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div className="flex items-center justify-center pt-[40px] pb-[20px] w-full">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <FormInput
              name="oldPassword"
              type="password"
              rules={FormRule.PASSWORD}
              placeholder="Old Password"
              className="w-[200px] lg:w-[300px] h-[40px] rounded-lg gap-2"
            />
            <FormInput
              name="newPassword"
              type="password"
              rules={FormRule.PASSWORD}
              placeholder="New Password"
              className="w-[200px] lg:w-[300px] h-[40px] rounded-lg gap-2"
            />
            <FormInput
              name="confirmPassword"
              type="password"
              rules={FormRule.PASSWORD}
              placeholder="Confirm Password"
              className="w-[200px] lg:w-[300px] h-[40px] rounded-lg gap-2"
            />
            {errorMessage && (
              <p className="text-red-400 w-[200px] lg:w-[300px] h-[40px] rounded-lg gap-2">
                {errorMessage}
              </p>
            )}
            <SimpleButton
              label={"Change Password"}
              loading={isLoading}
              className="font-light md:font-medium font-sans text-center text-white !bg-primaryColor w-[200px] lg:w-[300px] h-[40px] rounded-lg gap-2"
            />
          </Form>
        </div>
      </FormModal>
    </>
  );
}
export default ChangePasswordModal;
