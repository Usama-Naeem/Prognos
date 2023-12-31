import { API, Auth } from "aws-amplify";
import React, { useContext, useState } from "react";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Button, Form, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { GroupType } from "../../shared/enum/roles";
import FormInput from "../../shared/components/FormInput/FormInput";
import { FormRule } from "../../shared/enum/formRules";
import { updatePrognosCHW } from "../../graphql/mutations";
import {
  ACCESS_DENIED,
  INVALID_CONFIRMATION_CODE,
  INVALID_CREDENTIALS,
  USER_NOT_EXIST,
} from "../../shared/constant/error";
import ApiErrorMessage from "../../shared/components/ApiErrorMessage/ApiErrorMessage";
import { getJWT, isCommunityHealthWorker } from "../../shared/utils";
import { DASHBOARDHOME } from "../../shared/constant/pageRoutes";
import { userStatuses } from "../../shared/enum/user";
import AuthContext from "../../shared/context/AuthContext";
import {AMPLIFY_CONFIG} from "../../shared/constant";


const ConfirmSignupForm = ({ email, password, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const client = new CognitoIdentityProviderClient(AMPLIFY_CONFIG);
  const storeUserDetails = async (user, group) => {
    const JWT = await getJWT();
    // Persisting the login state in local storage.
    window.localStorage.setItem("jwt", JSON.stringify(JWT));
    window.localStorage.setItem("currentUser", JSON.stringify(user));
    window.localStorage.setItem("currentGroup", JSON.stringify(group));
  };
  const onConfirmSignup = async (values) => {
    setErrorMessage(null);
    try {
      setIsLoading(true);
      // Confirm Signup Api
      const result = await Auth.confirmSignUp(email, values.code);
      if (result === "SUCCESS") {
        const userData = await Auth.signIn({
          username: email,
          password,
        });
        // Add user to group using admin action
        const addRoleParams = {
          GroupName: GroupType.COMMUNITY_HEALTH_WORKER,
          Username: email,
          UserPoolId: userData?.pool?.userPoolId,
        };
        const command = new AdminAddUserToGroupCommand(addRoleParams);
        await client.send(command);
        // Update user status in db
        const updateChwStatus = {
          id,
          status: userStatuses.CONFIRMED,
        };
        const dynamoUser = await API.graphql({
          query: updatePrognosCHW,
          variables: { input: updateChwStatus },
        });
        // saving the user data in context
        localStorage.setItem(
          "userDynamo",
          JSON.stringify(dynamoUser?.data?.updatePrognosCHW),
        );
        authContext.setUserDynamo(dynamoUser?.data?.updatePrognosCHW);
        login();
      }
    } catch (err) {
      err.message === INVALID_CONFIRMATION_CODE
        ? setErrorMessage("Invalid verification code.")
        : setErrorMessage(err.message);
      setIsLoading(false);
      throw Error(err.message);
    }
  };

  const login = async () => {
    try {
      setErrorMessage(null);
      const userData = await Auth.signIn({
        username: email,
        password: password,
      });
      const userGroups =
        userData?.signInUserSession?.idToken?.payload["cognito:groups"];
      const chwIndex = userGroups?.indexOf(GroupType.COMMUNITY_HEALTH_WORKER);
      // Validation - the userGroups is not null
      if (!userGroups?.length) {
        await Auth.signOut();
        setIsLoading(false);
        setErrorMessage(INVALID_CREDENTIALS);
        return;
      }
      // Validation - If the CHW is not found in userGroups
      if (chwIndex === -1) {
        await Auth.signOut();
        setIsLoading(false);
        setErrorMessage(USER_NOT_EXIST);
        return;
      }

      // Validation - If the user does not belong to chw groups.
      if (!isCommunityHealthWorker(userGroups[chwIndex])) {
        await Auth.signOut();
        setErrorMessage(ACCESS_DENIED);
        setIsLoading(false);
        return;
      }
      // if everything goes well
      storeUserDetails(userData, userGroups[chwIndex]);
      navigate(DASHBOARDHOME);
    } catch (err) {
      setIsLoading(false);
      throw Error(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="font-sans text-3xl font-semibold md:text-4xl text-lightColor">
        Confirm Signup
      </h1>
      <span className="font-normal text-[12px] md:text-[14px] text-lightColor">
        Welcome back! Please enter your confirmation code.
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
          name="code"
          type="number"
          rules={FormRule.CODE}
          placeholder="Confirmation Code"
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
            "Confirm Signup"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default ConfirmSignupForm;
