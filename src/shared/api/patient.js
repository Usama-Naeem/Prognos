/* eslint-disable no-await-in-loop */
import { API, graphqlOperation } from "aws-amplify";
import { message } from "antd";
import {
  listCHWtoPatients,
  listPrognosCareGivertoPatients,
  listPrognosPatients,
  listPrognosPatientsByDate,
  listCHWtoCaregivers,
} from "../../graphql/queries";

export const listPatients = async () => {
  let nextToken = null;
  let allItems = [];

  do {
    try {
      // eslint-disable-next-line
      const response = await API.graphql({
        ...graphqlOperation(listPrognosPatientsByDate, {
          type: "prognosUser",
          sortDirection: "DESC",
          filter: {
            isDeleted: { ne: true },
          },
          nextToken,
        }),
      });
      const { items, nextToken: newNextToken } =
        response.data.listPrognosPatientsByDate;

      allItems = [...allItems, ...items];
      nextToken = newNextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};
// Filtered List of Patients

export const filteredListPatients = async (
  race,
  language,
  dobFilter,
  assessmentScoreLower,
  assessmentScoreUpper,
) => {
  try {
    const filter = {};
    if (race) {
      filter.race = { eq: race };
    }
    if (language) {
      filter.language = { eq: language };
    }
    if (dobFilter) {
      filter.DOB = dobFilter;
    }
    if (
      assessmentScoreLower !== undefined &&
      assessmentScoreUpper !== undefined
    ) {
      filter.assessmentScore = {
        between: [assessmentScoreLower, assessmentScoreUpper],
      };
    }

    const response = await API.graphql({
      query: listPrognosPatients,
      variables: {
        filter,
      },
      authMode: "API_KEY",
    });
    const list = response.data.listPrognosPatients.items;
    const patients = list.map((patient) => ({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phoneNumber: patient.phoneNumber,
    }));
    return patients;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const listCareGiverToPatients = async () => {
  try {
    const response = await API.graphql({
      query: listPrognosCareGivertoPatients,
    });
    const list = response.data.listPrognosCareGivertoPatients.items;
    // Removed all Deleted user
    const filteredData = list.filter(
      (item) =>
        !item?.prognosCaregivers.isDeleted && !item?.prognosPatients.isDeleted,
    );
    return filteredData;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const fetchAllAssignedChw = async (id) => {
  try {
    const response = await API.graphql({
      query: listCHWtoPatients,
    });
    const list = response?.data?.listCHWtoPatients?.items;
    const result = list.filter((el) => el?.prognosPatientsId?.includes(id));
    const chw = result.flat();
    return chw;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const fetchAllAssignedChwToCaregivers = async (id) => {
  try {
    const response = await API.graphql({
      query: listCHWtoCaregivers,
    });
    const list = response?.data?.listCHWtoCaregivers?.items;
    const result = list.filter((el) => el?.prognosCaregiversId?.includes(id));
    const chw = result.flat();
    return chw;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

// list all chw assigned to current patient
export const fetchAllAssignedChwToCaregiversCompleteObject = async (id) => {
  try {
    const response = [];
    let nextToken = null;

    do {
      const currentChw = await API.graphql({
        query: listCHWtoCaregivers,
        variables: {
          filter: {
            prognosCHWId: { eq: id },
          },
          nextToken: nextToken, // Pass the nextToken for pagination
        },
        authMode: "API_KEY",
      });
      const items = currentChw?.data?.listCHWtoCaregivers?.items || [];
      response.push(...items);
      nextToken = currentChw?.data?.listCHWtoCaregivers?.nextToken;
    } while (nextToken);
    return response;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const fetchAllAssignedCaregivers = async (id, array) => {
  try {
    const result = array.filter((el) => el?.prognosPatientsId?.includes(id));
    const caregivers = result.flat();
    return caregivers;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};
