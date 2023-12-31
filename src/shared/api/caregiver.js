import { API, graphqlOperation } from "aws-amplify";
import { message } from "antd";
import {
  listPrognosCaregivers,
  listPrognosCaregiversByDate,
} from "../../graphql/queries";

export const listCaregivers = async () => {
  let nextToken = null;
  let allItems = [];

  do {
    try {
      // eslint-disable-next-line
      const response = await API.graphql({
        ...graphqlOperation(listPrognosCaregiversByDate, {
          type: "prognosUser",
          sortDirection: "DESC",
          filter: {
            isDeleted: { ne: true },
          },
          nextToken,
        }),
      });
      const { items, nextToken: newNextToken } =
        response.data.listPrognosCaregiversByDate;

      allItems = [...allItems, ...items];
      nextToken = newNextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

export const filteredListCaregivers = async (
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
      query: listPrognosCaregivers,
      variables: {
        filter,
      },
      authMode: "API_KEY",
    });
    const list = response.data.listPrognosCaregivers.items;
    const careGivers = list.map((careGiver) => ({
      id: careGiver.id,
      firstName: careGiver.firstName,
      lastName: careGiver.lastName,
      email: careGiver.email,
      phoneNumber: careGiver.phoneNumber,
    }));
    return careGivers;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};
