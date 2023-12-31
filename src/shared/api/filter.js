import { API } from "aws-amplify";
import { message } from "antd";
import {
  listPrognosPatients,
  listPrognosCaregivers,
  listPrognosAdmins,
  listPrognosCHWS,
  listPrognosSuperAdmins,
} from "../../graphql/queries";

export const getUserByEmail = async (email, userType) => {
  try {
    const fetchItems = async (filter, nextToken = null) => {
      const response = await API.graphql({
        query: userType,
        variables: {
          filter,
          nextToken,
        },
        authMode: "API_KEY",
      });
      if (response.data.listPrognosCaregivers) {
        return response.data.listPrognosCaregivers;
      }
      if (response.data.listPrognosPatients) {
        return response.data.listPrognosPatients;
      }
      if (response.data.listPrognosAdmins) {
        return response.data.listPrognosAdmins;
      }
      if (response.data.listPrognosCHWS) {
        return response.data.listPrognosCHWS;
      }
      if (response.data.listPrognosSuperAdmins) {
        return response.data.listPrognosSuperAdmins;
      }
    };

    const filter = {
      email: {
        eq: email,
      },
    };

    let items = [];
    let nextToken = null;

    do {
      // eslint-disable-next-line no-await-in-loop
      const { items: pageItems, nextToken: nextPageToken } = await fetchItems(
        filter,
        nextToken,
      );
      if (pageItems) {
        items = items.concat(pageItems);
      }
      nextToken = nextPageToken;
    } while (nextToken);
    return items[Object.keys(items)[0]];
  } catch (err) {
    message.error(err.errors[0].message);
    throw Error(err.errors[0].message);
  }
};

export const getUserRoleByEmail = async (email) => {
  try {
    const fetchItems = async (filter, nextToken = null) => {
      const response = await API.graphql({
        query: listPrognosCHWS,
        variables: {
          filter,
          nextToken,
        },
        authMode: "API_KEY",
      });

      if (
        response.data.listPrognosCHWS &&
        response.data.listPrognosCHWS.items.length > 0
      ) {
        return response.data.listPrognosCHWS.items[0];
      }

      const responseAdmin = await API.graphql({
        query: listPrognosAdmins,
        variables: {
          filter,
          nextToken,
        },
        authMode: "API_KEY",
      });

      if (
        responseAdmin.data.listPrognosAdmins &&
        responseAdmin.data.listPrognosAdmins.items.length > 0
      ) {
        return responseAdmin.data.listPrognosAdmins.items[0];
      }

      const responseSuperAdmin = await API.graphql({
        query: listPrognosSuperAdmins,
        variables: {
          filter,
          nextToken,
        },
        authMode: "API_KEY",
      });

      if (
        responseSuperAdmin.data.listPrognosSuperAdmins &&
        responseSuperAdmin.data.listPrognosSuperAdmins.items.length > 0
      ) {
        return responseSuperAdmin.data.listPrognosSuperAdmins.items[0];
      }

      return null; // Return null if user not found in any list
    };

    const filter = {
      email: {
        eq: email,
      },
    };

    return await fetchItems(filter);
  } catch (err) {
    message.error(err.errors[0].message);
    throw Error(err.errors[0].message);
  }
};

// this function checks if a user exists in the patient and caregiver table
export const checkUserExist = async (
  email = "",
  phoneNumber = "",
  isAdmin = false,
) => {
  const fetchItems = async (queryFunction, filter) => {
    let items = [];
    let nextToken = null;

    do {
      // eslint-disable-next-line no-await-in-loop
      const response = await API.graphql(queryFunction(filter, nextToken));
      const responseData = response.data[Object.keys(response.data)[0]];
      items = items.concat(responseData.items);
      nextToken = responseData.nextToken;
    } while (nextToken);

    return items;
  };

  try {
    const query =
      (queryName) =>
      (filter, nextToken = null) => ({
        query: queryName,
        variables: {
          filter: email
            ? {
                email: {
                  eq: email,
                },
              }
            : {
                phoneNumber: { eq: phoneNumber },
              },
          nextToken,
        },
        authMode: "API_KEY",
      });

    if (isAdmin) {
      const [chw, admin, superAdmin] = await Promise.all([
        fetchItems(query(listPrognosCHWS)),
        fetchItems(query(listPrognosAdmins)),
        fetchItems(query(listPrognosSuperAdmins)),
      ]);
      return {
        chw,
        admin,
        superAdmin,
      };
    }

    const filter = email
      ? { email: { eq: email } }
      : { phoneNumber: { eq: phoneNumber } };
    const [patient, caregiver, chw] = await Promise.all([
      fetchItems(query(listPrognosPatients), filter),
      fetchItems(query(listPrognosCaregivers), filter),
      fetchItems(query(listPrognosCHWS), filter),
    ]);
    return {
      patient,
      caregiver,
      chw,
    };
  } catch (err) {
    message.error(err.message);
    throw Error(err.message);
  }
};

export const updateUser = async (editUser, userType) => {
  try {
    await API.graphql({
      query: userType,
      variables: { input: editUser },
      authMode: "API_KEY",
    });
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const updatelocalStorage = async (editUser, userType, rowId) => {
  try {
    const res = await API.graphql({
      query: userType,
      variables: { input: editUser },
      authMode: "API_KEY",
    });
    const data = res.data.updatePrognosAdmin;
    const localstorageid = JSON.parse(localStorage.getItem("userDynamo"));
    if (rowId?.id === localstorageid.id) {
      window.localStorage.setItem("userDynamo", JSON.stringify(data));
    }
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const getUserByEmailFromUserAnswers = async (email, userType) => {
  const filteration = {
    or: [{ userEmail: { eq: email } }, { patientEmail: { eq: email } }],
  };
  try {
    const response = await API.graphql({
      query: userType,
      variables: { filter: filteration },
      authMode: "API_KEY",
    });
    return response;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const getUserAnswersByEmailOrId = async (userId, userType) => {
  const filteration = {
    userId: { eq: userId },
  };
  let nextToken = null;
  let allItems = [];

  // eslint-disable-next-line
  do {
    const variables = { filter: filteration, nextToken };
    try {
      // eslint-disable-next-line
      const response = await API.graphql({
        query: userType,
        variables,
        authMode: "API_KEY",
      });
      const { items, nextToken: newNextToken } =
        response.data.listPrognosUserAnswers;

      allItems = [...allItems, ...items];
      nextToken = newNextToken;
      // return response;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

export const AwsDateFormat = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
