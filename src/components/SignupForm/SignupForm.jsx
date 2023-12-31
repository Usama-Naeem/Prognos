import { Button, Form } from "antd";
import React, { useState } from "react";
import { API, Auth } from "aws-amplify";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import FormInput from "../../shared/components/FormInput/FormInput";
import { FormRule } from "../../shared/enum/formRules";
import * as mutations from "../../graphql/mutations";
import {AMPLIFY_CONFIG} from "../../shared/constant";


const SignupForm = () => {
  const [confirm, setConfirm] = useState(false);
  const [id, setId] = useState("");

  const client = new CognitoIdentityProviderClient(AMPLIFY_CONFIG);

  const onFinish = async (values) => {
    try {
      // Signup method
      setConfirm(true);
      await Auth.signUp({
        username: values.email,
        password: values.password,
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
    } catch (error) {
      setConfirm(false);
    }

    // Add user details into Dynamo DB
    const userDetails = {
      email: values.email,
      phoneNumber: values.phoneNumber,
      status: "false",
    };

    try {
      const details = await API.graphql({
        query: mutations.createPrognosCHW,
        variables: { input: userDetails },
      });
      setId(details.data.createPrognosCHW.id);
    } catch (err) {
      throw Error(err.errors[0].message);
    }
  };

  const onConfirmSignup = async (values) => {
    try {
      await Auth.confirmSignUp(values.email, values.code);
      // getting the current session
      const addRoleParams = {
        GroupName: "CommunityHealthWorker",
        Username: values.email,
        UserPoolId: "us-east-1_fI0FADaoz",
      };
      const command = new AdminAddUserToGroupCommand(addRoleParams);
      await client.send(command);
      const session = await Auth.currentSession();
      // saving the user in localstorage
      window.localStorage.setItem("user", JSON.stringify(session));
    } catch (error) {
      throw Error(error.message);
    }
  };

  return (
    <div>
      {confirm ? (
        <div className="flex justify-center flex-col w-[320px] md:w-[340px] lg:w-[500px] px-3">
          <h1 className="font-sans text-3xl font-semibold md:text-5xl text-lightColor">
            Confirm SignUp
          </h1>
          <span className="font-normal text-md md:text-lg text-lightColor">
            Welcome back! Please enter your code.
          </span>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onConfirmSignup}
            className="flex flex-col items-center justify-center mt-4"
          >
            <FormInput
              name="email"
              type="email"
              rules={FormRule.EMAIL}
              placeholder="Email"
            />
            <FormInput
              name="code"
              type="number"
              rules={FormRule.CODE}
              placeholder="Confirmation Code"
            />
            {/* <ApiErrorMessage errorMessage={errorMessage} /> */}
            <Button
              type="primary"
              htmlType="submit"
              className="w-[300px] md:w-[350px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
            >
              Confirm Signup
            </Button>
          </Form>
        </div>
      ) : (
        <div className="flex justify-center flex-col w-[320px] md:w-[340px] lg:w-[500px] px-3">
          <h1 className="font-sans text-3xl font-semibold md:text-5xl text-lightColor">
            Sign Up
          </h1>
          <span className="font-normal text-md md:text-lg text-lightColor">
            Welcome back! Please enter your details.
          </span>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            className="flex flex-col items-center justify-center mt-4"
          >
            <FormInput
              name="email"
              type="email"
              rules={FormRule.EMAIL}
              placeholder="Email"
            />
            <FormInput
              name="phoneNumber"
              type="tel"
              rules={FormRule.PHONENUMBER}
              placeholder="Phone Number"
            />
            <FormInput
              name="password"
              type="password"
              rules={FormRule.PASSWORD}
              placeholder="Password"
            />
            {/* <ApiErrorMessage errorMessage={errorMessage} /> */}
            <Button
              type="primary"
              htmlType="submit"
              className="w-[300px] md:w-[350px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
            >
              Sign Up
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
