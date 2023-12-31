import { API, Auth, Storage } from "aws-amplify";
import {
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import { message } from "antd";
import { GroupType, ScreenTypes } from "../enum/roles";

import {
  updatePrognosAdmin,
  updatePrognosCHW,
  updatePrognosCaregivers,
  updatePrognosPatients,
} from "../../graphql/mutations";
import { AMPLIFY_CONFIG } from "../constant";
import { EmailTemplates } from "../enum/email";
import { updatelocalStorage, updateUser } from "../api/filter";
import {
  assignPatientToChw,
  removePatientToChw,
  assignCaregiverToChw,
  removeCaregiverToChw,
} from "../api/communityHealthWorker";
import { FREQUENCY } from "../constant/DashboardRoutes";
import {
  listPrognosCaregivers,
  listPrognosPatients,
  listPrognosAdmins,
  listPrognosCHWS,
} from "../../graphql/queries";
import { userStatuses } from "../enum/user";

const { CONFIRMED } = userStatuses;

// this function returns the JWT token
export const getJWT = async () => {
  try {
    const userCurrentSession = await Auth.currentSession();
    const accessToken = userCurrentSession.getAccessToken();
    const JWTvalue = accessToken.getJwtToken();
    return JWTvalue;
  } catch (error) {
    throw Error(error.message);
  }
};

export const isAdmin = (userType) => userType.includes(GroupType.ADMIN);
export const isCommunityHealthWorker = (userType) =>
  userType?.includes(GroupType.COMMUNITY_HEALTH_WORKER);
export const isSuperAdmin = (userType) =>
  userType?.includes(GroupType.SUPER_ADMIN);

// this function logouts the user
export const logout = async () => {
  try {
    // Clear local storage completely
    localStorage.clear();
    await Auth.signOut();
  } catch (error) {
    throw Error(error.message);
  }
};

// this function generates a temporary password with base 36
export const randomStrings = () => Math.random().toString(36).slice(2, 12);

// this function converts the string in camelcase
export const toCamelCase = (str) =>
  str
    .split(" ")
    .map((word, index) => {
      // If it is the first word make sure to lowercase all the chars.
      if (index === 0) {
        return word.toLowerCase();
      }
      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");

function getItem(label, key, route, icon = null, children = null) {
  return {
    label,
    key,
    route,
    icon,
    children,
    className: "py-2",
  };
}

export const getAssessmentFormsList = (questionnaireList, items) => {
  let childsList = [];
  // Generating Forms list as child list of Route Object
  if (questionnaireList.length > 0) {
    childsList = questionnaireList.map((questionnaire, index) =>
      getItem(
        questionnaire.name,
        `question${index}`,
        `/questionnaire/${questionnaire.id}`,
      ),
    );
  }

  // Adding Default New Assessment Object to the Forms List on start of Array
  childsList.splice(0, 0, {
    key: randomStrings(),
    icon: "",
    label: "Frequency",
    route: FREQUENCY,
  });

  // Adding Form List as Children to the Assement Object in Navigation
  items.map((item) => {
    const updatedItem = item;
    if (updatedItem.key === 3) {
      updatedItem.children = childsList;
    }
    return updatedItem;
  });
  return items;
};

// this function returns the device name for the current screen size
export const getScreenType = () => {
  const width = window.innerWidth;
  if (width < 600) {
    return ScreenTypes.MOBILE;
  }
  if (width < 1080) {
    return ScreenTypes.TAB;
  }
  return ScreenTypes.SYSTEM;
};

// this function returns true or false based on the screen size
export const isMobileScreen = () => window.innerWidth < 600;

export const shouldSidebarOpen = () => {
  const isMobile = isMobileScreen();

  if (isMobile) {
    return false;
  }
  return true;
};

export const storeUserDetails = async (user, group, dynamoId, chwFirstName) => {
  const JWT = await getJWT();
  // Persisting the login state in local storage.
  window.localStorage.setItem("jwt", JSON.stringify(JWT));
  window.localStorage.setItem("currentUser", JSON.stringify(user));
  window.localStorage.setItem("currentGroup", JSON.stringify(group));
  if (dynamoId) {
    window.localStorage.setItem(
      "CommunityHealthWorkerDynamoId",
      JSON.stringify(dynamoId),
    );
    window.localStorage.setItem(
      "CommunityHealthWorkerDynamoFirstName",
      JSON.stringify(chwFirstName),
    );
  }
};

export const getPatientOrCaregiverDataObj = (values, role) => {
  if (values.assessmentFor === "yourLovedOne" || role === "CareGiver") {
    const caregiverData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email.toLowerCase(),
      phoneNumber: values.phoneNumber,
      role: GroupType.CARE_GIVER,
      zipCode: values.zipCode,
      race: values.race,
      language: values.language || "",
      gender: values.sex,
      status: "Confirmed",
      type: "prognosUser",
    };

    return caregiverData;
  }

  if (values.assessmentFor === "you" || role === "Patient") {
    const patientData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email.toLowerCase(),
      phoneNumber: values.phoneNumber,
      role: GroupType.PATIENT,
      zipCode: values.zipCode,
      race: values.race,
      language: values.language || "",
      gender: values.sex,
      status: "Confirmed",
      type: "prognosUser",
    };

    return patientData;
  }
};

export const fetchcareGiverToPatientDetails = (item) => {
  const response = {
    key: item.prognosPatients.id,
    firstName: item.prognosPatients.firstName,
    lastName: item.prognosPatients.lastName,
    phoneNumber: item.prognosPatients.phoneNumber,
    status: item.prognosPatients.status,
    assignedTo: item.prognosPatients.assignedTo,
    role: item.prognosPatients.role,
    race: item.prognosPatients.race,
    language: item.prognosPatients.language,
    caregiverFirstName: item?.prognosCaregivers?.firstName,
    caregiverLastName: item?.prognosCaregivers?.lastName,
    caregiverPhoneNumber: item?.prognosCaregivers?.phoneNumber,
    caregiverStatus: item?.prognosCaregivers?.status,
    children: [],
    createdAt: item.createdAt,
  };
  return response;
};

// update dataIndex for caregiver so patient and caregiver not conflict
export const updateTableIndex = (item, index) => {
  const careGiverObject = item.prognosCaregivers;
  careGiverObject["key"] = item.prognosCaregivers.id + index;
  careGiverObject["caregiverFirstName"] = careGiverObject["firstName"];
  careGiverObject["caregiverLastName"] = careGiverObject["lastName"];
  careGiverObject["caregiverPhoneNumber"] = careGiverObject["phoneNumber"];
  careGiverObject["caregiverStatus"] = careGiverObject["status"];
  delete careGiverObject["firstName"];
  delete careGiverObject["lastName"];
  delete careGiverObject["phoneNumber"];
  delete careGiverObject["status"];
  return careGiverObject;
};
// get sidebar id to enable defaultselect tab
export const getCurrentTabId = (selectedPath, sidebarList) => {
  const currentTabId = sidebarList
    .map((obj) => {
      if (obj.children !== undefined) {
        const data = obj.children.filter((el) => el.route === selectedPath);
        if (data && data.length > 0) {
          const [result] = [...data];
          return result;
        }
      }
      const data = obj.route === selectedPath;
      return { ...obj, data };
    })
    .filter((sidebarId) => sidebarId);
  const response = currentTabId.filter((el) => el.data !== false);
  const [obj] = [...response];
  return obj;
};

export const getUpdateMutationType = (role) => {
  let mutationType = null;
  if (role === "Admin") {
    mutationType = updatePrognosAdmin;
  } else if (role === "CommunityHealthWorker") {
    mutationType = updatePrognosCHW;
  } else if (role === "Patient") {
    mutationType = updatePrognosPatients;
  } else if (role === "CareGiver") {
    mutationType = updatePrognosCaregivers;
  }

  return mutationType;
};

export const softDeleteDynamoUser = async (userId, role) => {
  try {
    // Fetching the updation mutation type based on role.
    const updateMutationType = getUpdateMutationType(role);

    // GraphQL Query Params.
    const editUserParams = {
      id: userId,
      isDeleted: true,
    };

    // Soft Deleting the user in DynamoDB if mutation type exist.
    if (updateMutationType) {
      await API.graphql({
        query: updateMutationType,
        variables: { input: editUserParams },
        authMode: "API_KEY",
      });
    }
  } catch (error) {
    throw Error(error.message);
  }
};

// Setting up client with data from env file.
const client = new CognitoIdentityProviderClient(AMPLIFY_CONFIG);

// Disable User from Cognito.
export const disableUserCognito = async (email, userPoolId) => {
  try {
    const addRoleParams = {
      Username: email,
      UserPoolId: userPoolId,
    };
    const command = new AdminDisableUserCommand(addRoleParams);
    await client.send(command);
  } catch (error) {
    throw Error(error);
  }
};
// Enable User from Cognito.
export const enableUserCognito = async (email, userPoolId) => {
  try {
    const addRoleParams = {
      Username: email,
      UserPoolId: userPoolId,
    };
    const command = new AdminEnableUserCommand(addRoleParams);
    await client.send(command);
  } catch (error) {
    throw Error(error);
  }
};

// User Management sub-menu items
export const userManagementItems = [
  {
    children: null,
    className: "",
    icon: null,
    key: "patients",
    label: "Patients",
    route: "/patients",
  },
  {
    children: null,
    className: "",
    icon: null,
    key: "caregivers",
    label: "Caregivers",
    route: "/caregivers",
  },
  // {
  //   children: null,
  //   className: "",
  //   icon: null,
  //   key: "patientCaregiverAssociation",
  //   label: "Association",
  //   route: "/patient-caregiver-association",
  // },
];
// Check Twilio Message Empty
export const isBlankOrEmptyMessage = (str) =>
  str === null || str.match(/^ *$/) !== null;

export const enableSuspendedUser = async (rowId, userPoolId) => {
  const { email, role, phoneNumber, firstName, lastName } = rowId;

  if (role === GroupType.PATIENT || role === GroupType.CARE_GIVER) {
    const formattedPhoneNumberForCognito = `+1${phoneNumber.replace(
      /[- )(]/g,
      "",
    )}`;
    await Promise.all([
      await enableUserCognito(formattedPhoneNumberForCognito, userPoolId),
      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [email.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.ENABLE,
          templateData: {
            name: `${firstName} ${lastName}`,
          },
        },
      }),
    ]);
  } else {
    await Promise.all([
      await enableUserCognito(email, userPoolId),
      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [email.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.ENABLE,
          templateData: {
            name: `${firstName} ${lastName}`,
          },
        },
      }),
    ]);
  }

  const updateUserStatus = {
    id: rowId.key,
    isSuspended: false,
  };

  const changeUserStatus = (status) => {
    if (status) {
      updateUserStatus.status = userStatuses.CONFIRMED;
    } else {
      updateUserStatus.status = userStatuses.INVITED;
    }
  };

  const filteration = { email: { eq: email.toLowerCase() } };
  let response;
  let status;

  if (role.includes(GroupType.CARE_GIVER)) {
    // if the user is a caregiver
    response = await API.graphql({
      query: listPrognosCaregivers,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });
    status = response?.data?.listPrognosCaregivers?.items[0]?.gender;
    changeUserStatus(status);
  }

  if (role.includes(GroupType.PATIENT)) {
    // if the user is a patient
    response = await API.graphql({
      query: listPrognosPatients,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });
    status = response?.data?.listPrognosPatients?.items[0]?.gender;
    changeUserStatus(status);
  }

  if (role.includes(GroupType.ADMIN)) {
    // if the user is Admin
    response = await API.graphql({
      query: listPrognosAdmins,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });
    status = response?.data?.listPrognosAdmins?.items[0]?.language;
    changeUserStatus(status);
  }

  if (role.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
    // if the user is Community Health Worker
    response = await API.graphql({
      query: listPrognosCHWS,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });
    status = response?.data?.listPrognosCHWS?.items[0]?.language;
    changeUserStatus(status);
  }

  if (role?.includes(GroupType.ADMIN)) {
    await updateUser(updateUserStatus, updatePrognosAdmin);
  }
  if (role?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
    await updateUser(updateUserStatus, updatePrognosCHW);
  }
  if (role?.includes(GroupType.CARE_GIVER)) {
    await updateUser(updateUserStatus, updatePrognosCaregivers);
  }
  if (role?.includes(GroupType.PATIENT)) {
    await updateUser(updateUserStatus, updatePrognosPatients);
  }
  message.success("The user account is enabled", [2]);
};

export const suspendUser = async (rowId, userPoolId, reason) => {
  if (rowId.role === GroupType.PATIENT || rowId.role === GroupType.CARE_GIVER) {
    const formattedPhoneNumberForCognito = `+1${rowId.phoneNumber.replace(
      /[- )(]/g,
      "",
    )}`;
    await Promise.all([
      await disableUserCognito(formattedPhoneNumberForCognito, userPoolId),
      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [rowId.email.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.SUSPEND,
          templateData: {
            name: `${rowId.firstName} ${rowId.lastName}`,
            reason: reason,
          },
        },
      }),
    ]);
  } else {
    await Promise.all([
      await disableUserCognito(rowId.email, userPoolId),
      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [rowId.email.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.SUSPEND,
          templateData: {
            name: `${rowId.firstName} ${rowId.lastName}`,
            reason: reason,
          },
        },
      }),
    ]);
  }
  const updateUserStatus = {
    id: rowId.key,
    isSuspended: true,
    status: "Suspended",
  };
  if (rowId.role?.includes(GroupType.ADMIN)) {
    await updateUser(updateUserStatus, updatePrognosAdmin);
  }
  if (rowId.role?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
    await updateUser(updateUserStatus, updatePrognosCHW);
  }
  if (rowId.role?.includes(GroupType.CARE_GIVER)) {
    await updateUser(updateUserStatus, updatePrognosCaregivers);
  }
  if (rowId.role?.includes(GroupType.PATIENT)) {
    await updateUser(updateUserStatus, updatePrognosPatients);
  }
  message.success("The user is suspended", [2]);
};

export const handelEditUserModal = async (
  values,
  rowId,
  selectedchw,
  unselectedchw,
) => {
  const userDetails = {
    id: rowId.id,
    ...values,
    // assignedTo: values.assignedTo,
  };
  const patientDetails = {
    id: rowId.key,
    ...values,
    // assignedTo: values.assignedTo,
  };

  // Check user group and update user details
  if (rowId.role?.includes(GroupType.ADMIN)) {
    await updatelocalStorage(userDetails, updatePrognosAdmin, rowId);
  }
  if (rowId.role?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
    await updateUser(userDetails, updatePrognosCHW);
  }
  if (rowId.role?.includes(GroupType.CARE_GIVER)) {
    await updateUser(userDetails, updatePrognosCaregivers);
    // userDetails.assignedTo = values.assignedTo;
    values.assignedTo !== undefined
      ? // eslint-disable-next-line array-callback-return
        selectedchw.map(async (id) => {
          const chwToCaregiver = {
            prognosCHWId: id,
            prognosCaregiversId: rowId.key,
          };
          await assignCaregiverToChw(chwToCaregiver);
          // update assigned chw column in patient table
          const updateCaregiver = {
            id: rowId.key,
            assignedTo: "Assigned",
          };
          values.assignedTo.length !== 0
            ? await updateUser(updateCaregiver, updatePrognosCaregivers)
            : null;
        })
      : null;
    unselectedchw.map(async (id) => {
      const removechwtocaregiver = {
        prognosCHWId: id,
        prognosCaregiversId: rowId.key,
      };
      await removeCaregiverToChw(removechwtocaregiver);
      const updateStatus = {
        id: rowId.key,
        assignedTo: null,
      };
      values.assignedTo.length === 0
        ? await updateUser(updateStatus, updatePrognosCaregivers)
        : null;
    });
  }
  if (rowId.role?.includes(GroupType.PATIENT)) {
    await updateUser(patientDetails, updatePrognosPatients);
    userDetails.assignedTo = values.assignedTo;
    values.assignedTo !== undefined
      ? // eslint-disable-next-line array-callback-return
        selectedchw.map(async (id) => {
          const chwtopatient = {
            prognosCHWId: id,
            prognosPatientsId: rowId.key,
          };
          await assignPatientToChw(chwtopatient);
          // update assigned chw column in patient table
          const updatePatient = {
            id: rowId.key,
            assignedTo: "Assigned",
          };
          values.assignedTo.length !== 0
            ? await updateUser(updatePatient, updatePrognosPatients)
            : null;
        })
      : null;
    unselectedchw.map(async (id) => {
      const removechwtopatient = {
        prognosCHWId: id,
        prognosPatientsId: rowId.key,
      };
      await removePatientToChw(removechwtopatient);
      const updateStatus = {
        id: rowId.key,
        assignedTo: null,
      };
      values.assignedTo?.length === 0
        ? await updateUser(updateStatus, updatePrognosPatients)
        : null;
    });
  }
};
const calculateDate = (year) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - year);
  const dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
  const mm = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export const AgeOptionsFilter = {
  lessthan31: { gt: calculateDate(31) },
  between31And40: { between: [calculateDate(41), calculateDate(31)] },
  between41And50: { between: [calculateDate(51), calculateDate(41)] },
  between51And60: { between: [calculateDate(61), calculateDate(51)] },
  above60: { lt: calculateDate(61) },
};

// Get Time in hh:mm with message today,yesterday for others None
export const getMessageTime = (inputDate) => {
  const date = new Date(inputDate);
  const today = new Date();
  let status;
  const format = date.getHours() >= 12 ? "PM" : "AM";
  const inputDateString = date.toDateString();
  if (inputDateString === today.toDateString()) {
    status = "Today";
  } else if (
    inputDate.toDateString() ===
    new Date(today.setDate(today.getDate() - 1)).toDateString()
  )
    status = "Yesterday";
  else status = formatDate(date);
  const hh = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const mm =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${status} ${hh}:${mm} ${format}`;
};

export const formatDate = (date) => {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const yyyy = date.getFullYear();
  return `${mm < 10 ? "0" : ""}${mm}-${dd < 10 ? "0" : ""}${dd}-${yyyy}`;
};

export const getCurrentUserProfile = async (id) => {
  try {
    const storageKey = await Storage.get(id);
    return storageKey;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkUserStatus = async () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userGroup = JSON.parse(localStorage.getItem("currentGroup"));
  if (userGroup === GroupType.ADMIN) {
    const responseAdmin = await API.graphql({
      query: listPrognosAdmins,
      variables: {
        filter: { email: { eq: user?.attributes?.email.toLowerCase() } },
      },
      authMode: "API_KEY",
    });
    const userStatus = responseAdmin.data.listPrognosAdmins?.items[0].status;
    if (userStatus !== CONFIRMED) {
      await logout();
    }
  }

  if (userGroup === GroupType.COMMUNITY_HEALTH_WORKER) {
    const responseCHW = await API.graphql({
      query: listPrognosCHWS,
      variables: {
        filter: { email: { eq: user?.attributes?.email.toLowerCase() } },
      },
      authMode: "API_KEY",
    });
    const userStatus = responseCHW.data.listPrognosCHWS?.items[0].status;
    if (userStatus !== CONFIRMED) {
      await logout();
    }
  }
};

/* eslint-disable */
export function highlightUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part) => {
    if (part.match(urlRegex)) {
      return (
        <a href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
}

/* eslint-enable */
