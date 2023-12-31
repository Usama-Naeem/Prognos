import { Form } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared/components/Spinner/Spinner";
import ApiErrorMessage from "../../shared/components/ApiErrorMessage/ApiErrorMessage";
import FormInput from "../../shared/components/FormInput/FormInput";
import {
  ACCESS_DENIED,
  INVALID_CREDENTIALS,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_NOT_MATCHED,
  PASSWORD_POLICY_ERROR,
  USER_NOT_EXIST,
} from "../../shared/constant/error";
import { lightColorSpinner } from "../../shared/constant/tailwindConstants";
import confirmPassword from "../../shared/assests/images/confirmPassword.png";
import { FormRule } from "../../shared/enum/formRules";
import FormSubmitButton from "../../shared/components/FormSubmitButton/FormSubmitButton";
import AuthContext from "../../shared/context/AuthContext";
import { ADMIN_SIGNIN, DASHBOARDHOME } from "../../shared/constant/pageRoutes";
import { storeUserDetails } from "../../shared/utils";
import { GroupType, isAnyUser, isNotAdmin } from "../../shared/enum/roles";
import { listPrognosAdmins, listPrognosCHWS } from "../../graphql/queries";
import { updatePrognosAdmin, updatePrognosCHW } from "../../graphql/mutations";
import { getUserByEmail, updateUser } from "../../shared/api/filter";

const ChangePassword = ({ language, email }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  let chwDynamoId = ""; // chw -> CommunityHealthWorker
  let chwFirstName = "";
  let dynamoData = "";
  const navigate = useNavigate();
  useEffect(() => {
    if (!authContext.user) {
      navigate(ADMIN_SIGNIN);
    }
  }, []);
  const onChangePassword = async (values) => {
    try {
      setErrorMessage(null);
      if (values.password !== values.confirmPassword) {
        setErrorMessage(PASSWORD_NOT_MATCHED);
        return;
      }
      setIsLoading(true);
      const response = await Auth.completeNewPassword(
        authContext.user,
        values.password,
      );
      // check user group
      const userGroups =
        response?.signInUserSession?.idToken?.payload["cognito:groups"];
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
      if (userGroups.length > 1) {
        storeUserDetails(response, userGroups);
      }

      // Find CHW by email and store id and name in local storage and update language and status
      if (userGroups?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
        const chwDetails = await getUserByEmail(email, listPrognosCHWS);
        chwDynamoId = chwDetails?.id;
        chwFirstName = chwDetails?.firstName;
        dynamoData = chwDetails;
        // Update user language and status in dynamo
        const editUser = {
          id: chwDynamoId,
          language: language,
          status: "Confirmed",
        };
        await updateUser(editUser, updatePrognosCHW);
      }
      // Check for Admin and Update language and status in dynamo
      else {
        const adminDetails = await getUserByEmail(email, listPrognosAdmins);
        const adminId = adminDetails?.id;
        dynamoData = adminDetails;
        const editUser = {
          id: adminId,
          language: language,
          status: "Confirmed",
        };
        await updateUser(editUser, updatePrognosAdmin);
      }

      // Validation: Check group length and store usergroup in localstorage
      if (userGroups?.length === 1) {
        userGroups?.includes(GroupType.SUPER_ADMIN)
          ? storeUserDetails(response, userGroups[superAdminIndex])
          : userGroups?.includes(GroupType.ADMIN)
          ? storeUserDetails(response, userGroups[adminIndex])
          : storeUserDetails(
              response,
              userGroups[communityHealthWorkerIndex],
              chwDynamoId,
              chwFirstName,
            );
      }

      // Store user object in local storage
      window.localStorage.setItem(
        "userDynamo",
        JSON.stringify(dynamoData) || "",
      );
      // Setting the login state in context.
      authContext.setUserDataHandler(response);
      authContext.setUserGroupHandler(userGroups);
      authContext.setUserDynamo(dynamoData);
      setIsLoading(false);
      navigate(DASHBOARDHOME);
    } catch (error) {
      setIsLoading(false);
      error.message.toLowerCase().includes(PASSWORD_POLICY_ERROR.toLowerCase())
        ? setErrorMessage(PASSWORD_ERROR_MESSAGE)
        : setErrorMessage(error.message);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)]">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spinner className={lightColorSpinner} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full md:justify-around lg:px-6">
          <div className="flex justify-center flex-col w-[320px] md:w-[340px] lg:w-[500px] px-3">
            <h1 className="font-sans text-2xl font-semibold md:text-3xl text-lightColor">
              {t("changePassword")}
            </h1>
            <span className="mt-2 font-normal text-sm lg:text-lg text-lightColor">
              {t("changePasswordSubText")}
            </span>
            <li className="mt-1 font-normal text-sm lg:text-lg text-lightColor">
              {t("changePasswordSubTextlist1")}
            </li>
            <li className="mt-1 mb-6 font-normal text-sm lg:text-lg text-lightColor">
              {t("changePasswordSubTextlist2")}
            </li>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onChangePassword}
              className="flex flex-col items-center justify-center"
            >
              <FormInput
                name="password"
                type="password"
                rules={FormRule.PASSWORD}
                placeholder="Enter New Password"
              />
              <FormInput
                name="confirmPassword"
                type="password"
                rules={FormRule.PASSWORD}
                placeholder="Confirm Password"
              />
              <ApiErrorMessage errorMessage={errorMessage} />
              <FormSubmitButton
                type="primary"
                className="w-[300px] lg:w-[450px] h-[40px] bg-button rounded-lg gap-2 bg-subtleTextColor"
                label="Change Password"
              />
            </Form>
          </div>
          <div className="hidden md:flex md:justify-between">
            <img
              src={confirmPassword}
              alt="logo"
              className="md:w-[400px] lg:w-[490px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default ChangePassword;
