import { Form } from "antd";
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import FormInput from "../../shared/components/FormInput/FormInput";
import FormSubmitButton from "../../shared/components/FormSubmitButton/FormSubmitButton";
import Spinner from "../../shared/components/Spinner/Spinner";
import { lightColorSpinner } from "../../shared/constant/tailwindConstants";
import { FormRule } from "../../shared/enum/formRules";
import forgotPassword from "../../shared/assests/images/forgotPassword.png";
import { CORRECT_EMAIL, EMAIL_NOT_FOUND } from "../../shared/constant/error";
import ResetPassword from "../ResetPassword/ResetPassword";
import ApiErrorMessage from "../../shared/components/ApiErrorMessage/ApiErrorMessage";

const ForgotPassword = () => {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const sendConfirmationCode = async (values) => {
    try {
      setIsLoading(true);
      await Auth.forgotPassword(values.email.toLowerCase());
      setIsLoading(false);
      setIsCodeSent(true);
      setUserEmail(values.email);
      setErrorMessage("");
    } catch (error) {
      setIsLoading(false);
      error.message === EMAIL_NOT_FOUND
        ? setErrorMessage(CORRECT_EMAIL)
        : setErrorMessage(error.message);
      throw Error(error);
    }
  };
  return (
    <div className="h-[calc(100vh-100px)]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner className={lightColorSpinner} />
        </div>
      ) : isCodeSent ? (
        <ResetPassword email={userEmail} />
      ) : (
        <div className="flex items-center justify-center h-full md:justify-around lg:px-6">
          <div className="flex justify-center flex-col w-[320px] md:w-[340px] lg:w-[500px] px-3">
            <h1 className="font-sans text-3xl font-semibold md:text-4xl text-lightColor w-full">
              Forgot Password?
            </h1>
            <span className="mt-2 mb-10 font-normal text-sm lg:text-lg text-lightColor w-full">
              Please type your email so we can send a new password to your
              email.
            </span>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={sendConfirmationCode}
              className="flex flex-col items-center justify-center w-full"
            >
              <FormInput
                name="email"
                type="email"
                rules={FormRule.EMAIL}
                placeholder="Email"
              />

              <ApiErrorMessage errorMessage={errorMessage} />
              <FormSubmitButton
                type="primary"
                className="w-[300px] lg:w-[450px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
                label="Forgot Password"
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
      )}
    </div>
  );
};

export default ForgotPassword;
