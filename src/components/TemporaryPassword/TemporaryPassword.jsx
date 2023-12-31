import { Form } from "antd";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import { MailOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import ApiErrorMessage from "../../shared/components/ApiErrorMessage/ApiErrorMessage";
import FormInput from "../../shared/components/FormInput/FormInput";
import {
  INVALID_CREDENTIALS,
  REGULAR_EXPRESSION_PATTREN_ERROR,
  USER_NOT_EXIST,
} from "../../shared/constant/error";
import signin from "../../shared/assests/images/signin.png";
import { FormRule } from "../../shared/enum/formRules";
import FormSubmitButton from "../../shared/components/FormSubmitButton/FormSubmitButton";
import ChangePassword from "../ChangePassword/ChangePassword";
import AuthContext from "../../shared/context/AuthContext";
import Spinner from "../../shared/components/Spinner/Spinner";
import { lightColorSpinner } from "../../shared/constant/tailwindConstants";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import { LanguageSelectOptions } from "../../shared/enum/selectOptions";

const TemporaryPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userlanguage, setUserLanguage] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [searchParams] = useSearchParams();
  const getEmail = searchParams.get("email");
  // by default useSearchParams replace + with space, so this line of code is used to again replace space with +
  const email = getEmail?.replace(" ", "+");
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      // Cognito API for sign in
      const userData = await Auth.signIn({
        username: email,
        password: values.password,
      });
      setUserLanguage(values.language);
      setUserEmail(email);
      if (userData.challengeName === "NEW_PASSWORD_REQUIRED") {
        // saving the user data in context
        authContext.setUserDataHandler(userData);
        setIsLoading(false);
        setConfirm(true);
        return;
      }
    } catch (err) {
      setIsLoading(false);
      setConfirm(false);
      // Error messages when API failed
      err.message === USER_NOT_EXIST
        ? setErrorMessage(INVALID_CREDENTIALS)
        : err.message === REGULAR_EXPRESSION_PATTREN_ERROR
        ? setErrorMessage("Value at 'userAlias' failed to satisfy constraint")
        : setErrorMessage(err.message);
      throw Error(err.message);
    }
  };
  return (
    <div className="h-[calc(100vh-100px)] w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner className={lightColorSpinner} />
        </div>
      ) : confirm ? (
        <ChangePassword language={userlanguage} email={userEmail} />
      ) : (
        <div className="flex items-center justify-center h-full md:justify-around lg:px-6">
          <div className="flex justify-center flex-col w-[320px] md:w-[340px] lg:w-[500px] px-3">
            <h1 className="font-sans text-2xl font-semibold md:text-3xl text-lightColor">
              {t("temporaryPassword")}
            </h1>
            <span className="mt-2 mb-10 text-sm font-normal lg:text-lg text-lightColor">
              {t("temporaryPasswordSubText")}
            </span>
            <Form
              name="basic"
              initialValues={{
                remember: true,
                email: email,
              }}
              onFinish={onFinish}
              className="flex flex-col items-center justify-center"
            >
              <FormInput
                name="email"
                type="email"
                rules={FormRule.EMAIL}
                placeholder="Email"
                disabled={true}
                className="bg-white !w-[300px] lg:!w-[450px] !h-[40px]"
              />
              <FormInput
                name="password"
                type="password"
                rules={FormRule.PASSWORD}
                placeholder="Enter Temporary Password"
                className="bg-white !w-[300px] lg:!w-[450px] !h-[40px]"
              />
              <FormSelect
                rules={FormRule.LANGUAGE}
                options={LanguageSelectOptions.LANGUAGES}
                name="language"
                placeholder="Select Language"
                icon={<MailOutlined />}
                className="!w-[300px] lg:!w-[450px] !h-[40px]"
              />
              <ApiErrorMessage errorMessage={errorMessage} />
              <FormSubmitButton
                type="primary"
                className="w-[300px] lg:w-[450px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
                label="Continue"
              />
            </Form>
          </div>
          <div className="hidden md:flex md:justify-between">
            <img
              src={signin}
              alt="logo"
              className="md:w-[400px] lg:w-[490px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default TemporaryPassword;
