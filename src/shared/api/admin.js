import { API, graphqlOperation } from "aws-amplify";
import { message } from "antd";
import {
  listPrognosAdminsByDate,
  listPrognosSuperAdmins,
} from "../../graphql/queries";
import { getUserByEmail } from "./filter";
import { GroupType } from "../enum/roles";

export const listAdmins = async () => {
  let nextToken = null;
  let allItems = [];

  do {
    try {
      // eslint-disable-next-line
      const response = await API.graphql({
        ...graphqlOperation(listPrognosAdminsByDate, {
          type: "prognosUser",
          sortDirection: "DESC",
          filter: {
            isDeleted: { ne: true },
          },
          nextToken,
        }),
      });
      const { items, nextToken: newNextToken } =
        response.data.listPrognosAdminsByDate;

      allItems = [...allItems, ...items];
      nextToken = newNextToken;
    } catch (err) {
      message.error(err.message);
      throw Error(err.errors[0].message);
    }
  } while (nextToken);

  return allItems;
};

export const fetchDataFromStorageOnUpdate = async (email, userType, group) => {
  let dynamoData;
  try {
    // Gets dynamo id using email filter if current group is community health worker
    const userFilter = await getUserByEmail(email, userType);
    group?.includes(GroupType.SUPER_ADMIN)
      ? (dynamoData = userFilter)
      : group?.includes(GroupType.ADMIN)
      ? (dynamoData = userFilter)
      : (dynamoData = userFilter);
    window.localStorage.setItem("userDynamo", JSON.stringify(dynamoData));
    return dynamoData;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getSuperAdminDetails = async () => {
  try {
    const response = await API.graphql({
      query: listPrognosSuperAdmins,
      variables: {
        filter: {
          status: { eq: "Confirmed" },
        },
      },
    });
    const list = response.data.listPrognosSuperAdmins.items;
    return list;
  } catch (error) {
    throw Error(error.errors[0].message);
  }
};
