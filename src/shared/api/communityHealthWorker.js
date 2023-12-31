/* eslint-disable no-await-in-loop */
import { API, graphqlOperation } from "aws-amplify";
import { message } from "antd";
import {
  listCHWtoPatients,
  getPrognosCHW,
  listPrognosCareGivertoPatients,
  listPrognosCHWByDate,
  listCHWtoCaregivers,
} from "../../graphql/queries";
import {
  createCHWtoPatient,
  deleteCHWtoPatient,
  deletePrognosCareGivertoPatient,
  createCHWtoCaregiver,
  deleteCHWtoCaregiver,
} from "../../graphql/mutations";

let CHW = "";

// Get A CHW from db
export const getCommunityHealthWorker = async (chwId) => {
  try {
    const response = await API.graphql({
      query: getPrognosCHW,
      variables: {
        id: chwId,
      },
    });
    return response.data.getPrognosCHW.firstName;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// fetch all chw from db
export const listCommunityHealthWorkers = async () => {
  let nextToken = null;
  let allItems = [];

  do {
    try {
      // eslint-disable-next-line
      const response = await API.graphql({
        ...graphqlOperation(listPrognosCHWByDate, {
          type: "prognosUser",
          sortDirection: "DESC",
          filter: {
            isDeleted: { ne: true },
          },
          nextToken,
        }),
      });
      const { items, nextToken: newNextToken } =
        response.data.listPrognosCHWByDate;

      allItems = [...allItems, ...items];
      nextToken = newNextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

// Fetch all confirmed chw from db for listing all chw in select options when admin assign chw to patient
export const fetchConfirmedCHW = async () => {
  try {
    const communityHealthWorkers = await API.graphql({
      ...graphqlOperation(listPrognosCHWByDate, {
        type: "prognosUser",
        sortDirection: "DESC",
        variables: {
          filter: {
            status: { eq: "Confirmed" },
          },
        },
        authMode: "API_KEY",
      }),
    });
    const chwList = communityHealthWorkers.data.listPrognosCHWByDate.items;
    CHW = chwList.map(({ id: key, ...rest }) => ({
      key,
      ...rest,
    }));
    const options = CHW.map((member) => ({
      key: member.key,
      value: member.key,
      label: `${member.firstName} ${member.lastName}`,
    }));
    return options;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// Api to assign chw to patient (Join Table)
export const assignPatientToChw = async (details) => {
  try {
    await API.graphql({
      query: createCHWtoPatient,
      variables: { input: details },
      authMode: "API_KEY",
    });
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// Api to assign chw to patient (Join Table)
export const removePatientToChw = async (details) => {
  try {
    const currentchw = await API.graphql({
      query: listCHWtoPatients,
      variables: {
        filter: {
          and: [
            { prognosCHWId: { eq: details.prognosCHWId } },
            { prognosPatientsId: { eq: details.prognosPatientsId } },
          ],
        },
      },
      authMode: "API_KEY",
    });
    const data = currentchw?.data?.listCHWtoPatients?.items[0];
    if (data !== undefined) {
      const getChwid = {
        id: data.id,
      };
      await API.graphql({
        query: deleteCHWtoPatient,
        variables: { input: getChwid },
        authMode: "API_KEY",
      });
    }
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const assignCaregiverToChw = async (details) => {
  try {
    await API.graphql({
      query: createCHWtoCaregiver,
      variables: { input: details },
      authMode: "API_KEY",
    });
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const removeCaregiverToChw = async (details) => {
  try {
    const currentchw = await API.graphql({
      query: listCHWtoCaregivers,
      variables: {
        filter: {
          and: [
            { prognosCHWId: { eq: details.prognosCHWId } },
            { prognosCaregiversId: { eq: details.prognosCaregiversId } },
          ],
        },
      },
      authMode: "API_KEY",
    });
    const data = currentchw?.data?.listCHWtoCaregivers?.items[0];
    if (data !== undefined) {
      const getChwid = {
        id: data.id,
      };
      await API.graphql({
        query: deleteCHWtoCaregiver,
        variables: { input: getChwid },
        authMode: "API_KEY",
      });
    }
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// list all chw assigned to current patient
export const listAllChwPatients = async (chwId) => {
  try {
    const response = [];
    let nextToken = null;

    do {
      const currentChw = await API.graphql({
        query: listCHWtoPatients,
        variables: {
          filter: {
            prognosCHWId: { eq: chwId },
          },
          nextToken: nextToken, // Pass the nextToken for pagination
        },
        authMode: "API_KEY",
      });
      const items = currentChw?.data?.listCHWtoPatients?.items || [];
      response.push(...items);
      nextToken = currentChw?.data?.listCHWtoPatients?.nextToken;
    } while (nextToken);
    return response;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const removePatientToCaregiver = async (details) => {
  try {
    const currentMatch = await API.graphql({
      query: listPrognosCareGivertoPatients,
      variables: {
        filter: {
          and: [
            { prognosCaregiversId: { eq: details.prognosCaregiversId } },
            { prognosPatientsId: { eq: details.prognosPatientsId } },
          ],
        },
      },
      authMode: "API_KEY",
    });
    const data = currentMatch?.data?.listPrognosCareGivertoPatients?.items[0];
    const matchedId = {
      id: data.id,
    };
    await API.graphql({
      query: deletePrognosCareGivertoPatient,
      variables: { input: matchedId },
      authMode: "API_KEY",
    });
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};
