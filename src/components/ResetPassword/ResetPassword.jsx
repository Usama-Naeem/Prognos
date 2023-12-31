import { Form, message } from "antd";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import FormInput from "../../shared/components/FormInput/FormInput";
import FormSubmitButton from "../../shared/components/FormSubmitButton/FormSubmitButton";
import { FormRule } from "../../shared/enum/formRules";
import forgotPassword from "../../shared/assests/images/forgotPassword.png";
import CodeInput from "../../shared/components/CodeInput/CodeInput";
import { PASSWORD_NOT_MATCHED } from "../../shared/constant/error";

const ResetPassword = ({ email }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const setCodeAndNewPassword = async (values) => {
    try {
      setErrorMessage(null);
      if (values.newPassword !== values.confirmPassword) {
        setErrorMessage(PASSWORD_NOT_MATCHED);
        return;
      }
      setIsLoading(true);
      await Auth.forgotPasswordSubmit(
        email.toLowerCase(),
        values.confirmationCode,
        values.newPassword,
      );
      setErrorMessage("");
      setIsLoading(false);
      navigate(-1);
      message.success("Your password is successfully changed", [4]);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
      throw Error(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-full md:justify-around lg:px-6">
        <div className="flex justify-center flex-col w-[300px] sm:w-[360px] md:w-[450px]">
          <h1 className="font-sans text-3xl font-semibold md:text-4xl text-lightColor w-full">
            Reset Password
          </h1>
          <span className="mt-2 mb-10 font-normal text-sm lg:text-lg text-lightColor w-full">
            Enter Confirmation Code received via Email.
          </span>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={setCodeAndNewPassword}
          >
            {errorMessage && (
              <p className="error-message text-red-500" aria-live="assertive">
                {errorMessage}
              </p>
            )}
            <CodeInput
              name="confirmationCode"
              type="text"
              rules={FormRule.CODE}
              placeholder="Enter your confirmation code"
            />
            <FormInput
              name="newPassword"
              type="password"
              rules={FormRule.PASSWORD}
              placeholder="Password"
            />
            <FormInput
              name="confirmPassword"
              type="password"
              rules={FormRule.PASSWORD}
              placeholder="Confirm Password"
            />
            <FormSubmitButton
              type="primary"
              className="w-[300px] lg:w-[450px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
              label="Reset Password"
              loading={isLoading}
            />
          </Form>
        </div>
        <div className="hidden md:flex md:justify-between">
          <img
            src={forgotPassword}
            alt="logo"
            className="md:w-[400px] lg:w-[490px]"
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
