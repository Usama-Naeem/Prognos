import { Button, Form } from "antd";
import { Auth } from "aws-amplify";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared/components/Spinner/Spinner";
import ApiErrorMessage from "../../shared/components/ApiErrorMessage/ApiErrorMessage";
import FormInput from "../../shared/components/FormInput/FormInput";
import {
  INVALID_CREDENTIALS,
  USER_NOT_EXIST,
  USER_IS_DISABLED,
  SUSPENDED_MESSAGE,
  ACCESS_DENIED,
} from "../../shared/constant/error";
import { lightColorSpinner } from "../../shared/constant/tailwindConstants";
import signin from "../../shared/assests/images/signin.png";
import { DASHBOARDHOME } from "../../shared/constant/pageRoutes";
import { FormRule } from "../../shared/enum/formRules";
import { GroupType, isAnyUser, isNotAdmin } from "../../shared/enum/roles";
import { storeUserDetails } from "../../shared/utils/index";
import FormSubmitButton from "../../shared/components/FormSubmitButton/FormSubmitButton";
import AuthContext from "../../shared/context/AuthContext";
import { getUserByEmail } from "../../shared/api/filter";
import {
  listPrognosAdmins,
  listPrognosCHWS,
  listPrognosSuperAdmins,
} from "../../graphql/queries";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  let chwDynamoId = ""; // chw -> CommunityHealthWorker
  let chwFirstName = "";
  let dynamoData = "";
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      // Cognito API for sign in
      const userData = await Auth.signIn({
        username: values.email.toLowerCase(),
        password: values.password,
      });
      // check user group
      const userGroups =
        userData?.signInUserSession?.idToken?.payload["cognito:groups"];
      const communityHealthWorkerIndex = userGroups?.indexOf(
        GroupType.COMMUNITY_HEALTH_WORKER,
      );
      const adminIndex = userGroups?.indexOf(GroupType.ADMIN);
      const superAdminIndex = userGroups?.indexOf(GroupType.SUPER_ADMIN);
      // Validation - the userGroups is not null
      if (!userGroups?.length) {
        await Auth.signOut();
        setIsLoading(false);
        setErrorMessage(INVALID_CREDENTIALS);
        return;
      }
      // Validation - If the CHW, Admin and super Admin is not found in userGroups
      if (
        communityHealthWorkerIndex === -1 &&
        adminIndex === -1 &&
        superAdminIndex === -1
      ) {
        await Auth.signOut();
        setIsLoading(false);
        setErrorMessage(USER_NOT_EXIST);
        return;
      }

      // Validation - The user does not belong to admin groups.
      if (!isAnyUser(userGroups) || isNotAdmin(userGroups)) {
        await Auth.signOut();
        setErrorMessage(ACCESS_DENIED);
        setIsLoading(false);
        return;
      }

      // Gets dynamo id using email filter if current group is super admin
      if (userGroups?.includes(GroupType.SUPER_ADMIN)) {
        const adminFilter = await getUserByEmail(
          values.email.toLowerCase(),
          listPrognosSuperAdmins,
        );
        dynamoData = adminFilter;
      }

      // Gets dynamo id using email filter if current group is admin
      if (userGroups?.includes(GroupType.ADMIN)) {
        const adminFilter = await getUserByEmail(
          values.email.toLowerCase(),
          listPrognosAdmins,
        );
        dynamoData = adminFilter;
      }

      // Gets dynamo id using email filter if current group is community health worker
      if (userGroups?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
        const chw = await getUserByEmail(
          values.email.toLowerCase(),
          listPrognosCHWS,
        );
        chwDynamoId = chw?.id;
        chwFirstName = chw?.firstName;
        dynamoData = chw;
      }
      // Validation: Check group length and store usergroup in localstorage
      if (userGroups?.length === 1) {
        userGroups?.includes(GroupType.SUPER_ADMIN)
          ? storeUserDetails(userData, userGroups[superAdminIndex])
          : userGroups?.includes(GroupType.ADMIN)
          ? storeUserDetails(userData, userGroups[adminIndex])
          : storeUserDetails(
              userData,
              userGroups[communityHealthWorkerIndex],
              chwDynamoId,
              chwFirstName,
            );
      }
      if (userGroups.length > 1) {
        storeUserDetails(userData, userGroups);
      }
      // Store user object in local storage
      window.localStorage.setItem("userDynamo", JSON.stringify(dynamoData));
      // Setting the login state in context.
      authContext.setUserDataHandler(userData);
      authContext.setUserGroupHandler(userGroups);
      authContext.setUserDynamo(dynamoData);
      // if everything goes well
      setIsLoading(false);
      navigate(DASHBOARDHOME);
      setErrorMessage(null);
    } catch (err) {
      setIsLoading(false);
      // Error messages when API failed
      err.message === USER_NOT_EXIST
        ? setErrorMessage(INVALID_CREDENTIALS)
        : err.message === USER_IS_DISABLED
        ? setErrorMessage(SUSPENDED_MESSAGE)
        : setErrorMessage(err.message);
      throw Error(err.message);
    }
  };
  const ForgetPassword = () => {
    setForgotPassword(true);
  };
  return (
    <div className="h-[calc(100vh-100px)]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner className={lightColorSpinner} />
        </div>
      ) : forgotPassword ? (
        <ForgotPassword />
      ) : (
        <div className="flex items-center justify-center h-full md:justify-around lg:px-6">
          <div className="flex justify-center flex-col w-[320px] md:w-[340px] lg:w-[500px] px-3">
            <h1 className="font-sans text-3xl font-semibold md:text-4xl text-lightColor">
              Sign In
            </h1>
            <span className="mt-2 mb-10 text-sm font-normal lg:text-lg text-lightColor">
              Welcome back! Please enter your details.
            </span>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              className="flex flex-col items-center justify-center"
            >
              <FormInput
                name="email"
                type="email"
                rules={FormRule.EMAIL}
                placeholder="Email"
              />
              <FormInput
                name="password"
                type="password"
                rules={FormRule.PASSWORD}
                placeholder="Password"
              />
              <div className="flex w-full mb-8">
                <Button
                  type="link"
                  onClick={ForgetPassword}
                  className="px-2 ml-auto font-sans text-sm font-normal text-white cursor-pointer"
                >
                  Forgot Password
                </Button>
              </div>

              <ApiErrorMessage errorMessage={errorMessage} />
              <FormSubmitButton
                type="primary"
                className="w-[300px] lg:w-[450px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
                label="Sign In"
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

export default SigninForm;
