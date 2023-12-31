import { Button, Form, Spin } from "antd";
import React, { useState } from "react";
import { API } from "aws-amplify";
import FormInput from "../../shared/components/FormInput/FormInput";
import { FormRule } from "../../shared/enum/formRules";
import ConfirmSignupForm from "../ConfirmSignupForm/ConfirmSignupForm";
import { createPrognosCHW } from "../../graphql/mutations";
import ApiErrorMessage from "../../shared/components/ApiErrorMessage/ApiErrorMessage";
import {
  ENTER_EMAIL,
  ENTER_PASSWORD,
  PASSWORD_POLICY_ERROR,
  USER_EXIST,
  ENTER_FIRST_NAME,
  ENTER_LAST_NAME,
  ENTER_PHONE_NO,
  PASSWORD_NOT_MATCHED,
} from "../../shared/constant/error";
import { userStatuses } from "../../shared/enum/user";
import { signUp } from "../../shared/api/signUp";
import signup from "../../shared/assests/images/signin.png";
import { GroupType } from "../../shared/enum/roles";
import ModalNameInput from "../../shared/components/ModalInput/ModalNameInput";
import PhoneNumberInput from "../../shared/components/PhoneNumberInput/PhoneNumberInput";
import ModalInput from "../../shared/components/ModalInput/ModalInput";

const CommunityHealthWorkerSignup = () => {
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (event) => {
    // update form state
    setFormValues((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onSignup = async () => {
    try {
      setErrorMessage(null);
      if (formValues.password !== formValues.confirmPassword) {
        setErrorMessage(PASSWORD_NOT_MATCHED);
        return;
      }
      setIsLoading(true);
      if (!formValues.firstName) {
        setErrorMessage(ENTER_FIRST_NAME);
        setIsLoading(false);
        return;
      }
      if (!formValues.lastName) {
        setErrorMessage(ENTER_LAST_NAME);
        setIsLoading(false);
        return;
      }
      if (!formValues.email) {
        setErrorMessage(ENTER_EMAIL);
        setIsLoading(false);
        return;
      }
      if (!formValues.phoneNumber) {
        setErrorMessage(ENTER_PHONE_NO);
        setIsLoading(false);
        return;
      }
      if (!formValues.password) {
        setErrorMessage(ENTER_PASSWORD);
        setIsLoading(false);
        return;
      }
      // APi for Signup
      const response = await signUp(formValues.email, formValues.password);
      setIsLoading(false);
      if (response === PASSWORD_POLICY_ERROR)
        setErrorMessage("Password did not confirm with policy");
      else if (response === USER_EXIST)
        setErrorMessage("User with same email alredy exist");
      else {
        setEmail(formValues.email);
        setPassword(formValues.password);
        setConfirm(true);
      }
    } catch (error) {
      setIsLoading(false);
      throw error(error.message);
    }

    // Add community health worker details in Dynamo DB
    const chwDetails = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      status: userStatuses.UNCONFIRMED,
      role: GroupType.COMMUNITY_HEALTH_WORKER,
      isDeleted: false,
      isSuspended: false,
      type: "prognosUser",
    };

    try {
      const details = await API.graphql({
        query: createPrognosCHW,
        variables: { input: chwDetails },
      });
      setId(details.data.createPrognosCHW.id);
    } catch (err) {
      throw Error(err.message);
    }
  };
  return (
    <div className="h-[calc(100vh-100px)] w-full">
      {confirm ? (
        <ConfirmSignupForm email={email} password={password} id={id} />
      ) : (
        <div className="flex items-center justify-center h-full md:justify-around lg:px-6">
          <div className="flex justify-center flex-col">
            <h1 className="font-sans text-3xl font-semibold md:text-4xl text-lightColor">
              Sign Up
            </h1>
            <span className="font-normal text-md md:text-lg text-lightColor mb-4">
              Please fill out your details.
            </span>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onSignup}
              className="flex flex-col items-center justify-center"
            >
              <ModalNameInput
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="w-[300px] lg:w-[450px] h-[40px] rounded-lg gap-2"
                onChange={onChangeHandler}
              />
              <ModalNameInput
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="w-[300px] lg:w-[450px] h-[40px] rounded-lg gap-2"
                onChange={onChangeHandler}
              />
              <ModalInput
                id="email"
                name="email"
                type="email"
                rules={FormRule.EMAIL}
                placeholder="Email"
                onChange={onChangeHandler}
                className="w-[300px] lg:w-[450px] h-[40px] rounded-lg gap-2"
              />
              <Form.Item
                type="text"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    min: 10,
                    message: "The phone number must have 10 digits!",
                  },
                ]}
              >
                <PhoneNumberInput
                  value={phoneNumber}
                  placeholder="(222) 222-2222"
                  onChange={(newPhoneNumber) => setPhoneNumber(newPhoneNumber)}
                  setFormState={setFormValues}
                  maxLength={10}
                  className="w-[300px] lg:w-[450px] h-[40px] rounded-lg gap-2"
                />
              </Form.Item>
              <FormInput
                id="password"
                name="password"
                type="password"
                rules={FormRule.PASSWORD}
                placeholder="Password"
                onChange={onChangeHandler}
              />
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                rules={FormRule.PASSWORD}
                placeholder="Confirm Password"
                onChange={onChangeHandler}
              />
              <ApiErrorMessage errorMessage={errorMessage} />
              <Button
                type="primary"
                htmlType="submit"
                className="w-[300px] lg:w-[450px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
              >
                {isLoading ? (
                  <Spin className="flex items-center justify-center" />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Form>
          </div>
          <div className="hidden md:flex md:justify-between">
            <img
              src={signup}
              alt="logo"
              className="md:w-[400px] lg:w-[490px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityHealthWorkerSignup;
