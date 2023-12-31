import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { API } from "aws-amplify";
import { AMPLIFY_CONFIG } from "../constant";
import { userStatuses } from "../enum/user";
import { randomStrings } from "../utils";
import {
  createPrognosCHW,
  createPrognosAdmin,
  createPrognosCaregivers,
  createPrognosPatients,
  updatePrognosPatients,
  updatePrognosCaregivers,
} from "../../graphql/mutations";
import { updateUser } from "./filter";
import { GroupType } from "../enum/roles";
import {
  assignPatientToChw,
  assignCaregiverToChw,
} from "./communityHealthWorker";

// Get CHW dynamo id from local storage
// providing the keys for admin actions
const client = new CognitoIdentityProviderClient(AMPLIFY_CONFIG);

export const addToCognitoGroup = async (values, userPoolId) => {
  const roleParams = {
    GroupName: values.role,
    Username: values?.email?.toLowerCase(),
    UserPoolId: userPoolId,
  };
  try {
    const command = new AdminAddUserToGroupCommand(roleParams);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const createCognitoUser = async (values, userPoolId) => {
  const formattedPhoneNumberForCognito = `+1${values.phoneNumber.replace(
    /[- )(]/g,
    "",
  )}`;
  const params = {
    UserPoolId: userPoolId,
    Username: values.email.toLowerCase(),
    PhoneNumber: values.phoneNumber,
    DesiredDeliveryMediums: ["EMAIL"],
    TemporaryPassword: values.temporaryPassword,
    MessageAction: "SUPPRESS",
    UserAttributes: [
      {
        Name: "email_verified",
        Value: "true",
      },
      {
        Name: "email",
        Value: values.email.toLowerCase(),
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
      {
        Name: "phone_number",
        Value: formattedPhoneNumberForCognito,
      },
    ],
  };

  try {
    // check if a user already created

    const command = new AdminCreateUserCommand(params);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

// by using this method, cognito will not send any temporary password email to user
export const createPatientOrCaregiverInCognito = async (values, userPoolId) => {
  const formattedPhoneNumberForCognito = `+1${values.phoneNumber.replace(
    /[- )(]/g,
    "",
  )}`;
  const params = {
    UserPoolId: userPoolId,
    Username: formattedPhoneNumberForCognito,
    PhoneNumber: values.phoneNumber,
    MessageAction: "SUPPRESS",
    TemporaryPassword: randomStrings(),
    UserAttributes: [
      {
        Name: "email_verified",
        Value: "true",
      },
      {
        Name: "email",
        Value: values.email.toLowerCase(),
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
      {
        Name: "phone_number",
        Value: formattedPhoneNumberForCognito,
      },
    ],
  };

  try {
    // check if a user already created

    const command = new AdminCreateUserCommand(params);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

// Add Patient or Caregiver to cognito
export const addPatientOrCaregiverToCognitoGroup = async (
  values,
  userPoolId,
) => {
  const formattedPhoneNumberForCognito = `+1${values.phoneNumber.replace(
    /[- )(]/g,
    "",
  )}`;
  const roleParams = {
    GroupName: values.role,
    Username: formattedPhoneNumberForCognito,
    UserPoolId: userPoolId,
  };
  try {
    const command = new AdminAddUserToGroupCommand(roleParams);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};
// create user in Dynamo DB
export const createDynamoUser = async (values) => {
  // Fetch Community health worker id and firstName from locaal storage
  const currentCHWId = JSON.parse(
    localStorage.getItem("CommunityHealthWorkerDynamoId"),
  );
  const currentUserGroup = JSON.parse(localStorage.getItem("currentGroup"));
  const userDetails = {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    phoneNumber: values.phoneNumber,
    status: userStatuses.INVITED,
    role: values.role,
    isDeleted: false,
    isSuspended: false,
    type: "prognosUser",
  };
  try {
    // Check invited user group and store data in dynamo db table accordingly
    if (values.role === GroupType.COMMUNITY_HEALTH_WORKER) {
      const response = await API.graphql({
        query: createPrognosCHW,
        variables: { input: userDetails },
        authMode: "API_KEY",
      });
      return response;
    }
    if (values.role === GroupType.ADMIN) {
      const response = await API.graphql({
        query: createPrognosAdmin,
        variables: { input: userDetails },
        authMode: "API_KEY",
      });
      return response;
    }
    if (values.role === GroupType.CARE_GIVER) {
      const response = await API.graphql({
        query: createPrognosCaregivers,
        variables: { input: userDetails },
        authMode: "API_KEY",
      });
      if (currentUserGroup?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
        // Fetch caregiver from db using email filter and store id in join table
        const caregiverId = response.data.createPrognosCaregivers.id;
        const userData = {
          prognosCHWId: currentCHWId,
          prognosCaregiversId: caregiverId,
        };
        // Assign chw to caregiver when chw invite caregiver
        await assignCaregiverToChw(userData);
        // Update assignedTo column in caregiver table
        const updateCaregiver = {
          id: caregiverId,
          assignedTo: "Assigned",
        };
        await updateUser(updateCaregiver, updatePrognosCaregivers);
      }
      return response.data.createPrognosCaregivers;
    }
    if (values.role === GroupType.PATIENT) {
      const patientData = await API.graphql({
        query: createPrognosPatients,
        variables: { input: userDetails },
        authMode: "API_KEY",
      });
      if (currentUserGroup?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
        // Fetch patient from db using email filter and store id in join table
        const patientId = patientData.data.createPrognosPatients.id;
        const userData = {
          prognosCHWId: currentCHWId,
          prognosPatientsId: patientId,
        };
        // Assign chw to patient when chw invite patient
        await assignPatientToChw(userData);
        // Update assignedTo column in patient table
        const updatePatient = {
          id: patientId,
          assignedTo: "Assigned",
        };
        await updateUser(updatePatient, updatePrognosPatients);
      }
      return patientData.data.createPrognosPatients;
    }
  } catch (err) {
    throw Error(err.errors[0].message);
  }
};

export const deleteAdminFromCognito = async (values, userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
  };
  if (
    values.role === GroupType.PATIENT ||
    values.role === GroupType.CARE_GIVER
  ) {
    const formattedPhoneNumberForCognito = `+1${values.phoneNumber.replace(
      /[- )(]/g,
      "",
    )}`;
    params.Username = formattedPhoneNumberForCognito;
  } else {
    params.Username = values.email.toLowerCase();
  }
  try {
    const command = new AdminDeleteUserCommand(params);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};

export const findUserFromCognito = async (values, userPoolId) => {
  const params = {
    UserPoolId: userPoolId,
    Username: values.email.toLowerCase(),
  };
  try {
    const command = new AdminGetUserCommand(params);
    const response = await client.send(command);
    return response;
  } catch (err) {
    throw Error(err.message);
  }
};
