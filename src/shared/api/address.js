import { API } from "aws-amplify";
import { message } from "antd";
import {
  createPrognosUsersAddress,
  updatePrognosUsersAddress,
} from "../../graphql/mutations";

// Update User Address if address in userObject is not null

export const createPrognosAddress = async (addressDetails) => {
  const createAddress = {
    city: addressDetails.city,
    address: addressDetails.address,
    state: addressDetails.state,
  };
  try {
    const response = await API.graphql({
      query: createPrognosUsersAddress,
      variables: { input: createAddress },
    });
    const addressId = response.data.createPrognosUsersAddress.id;
    return addressId;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};

export const updatePrognosAddress = async (editAddress, addressId) => {
  const updateAddress = {
    id: addressId,
    city: editAddress.city,
    address: editAddress.address,
    state: editAddress.state,
  };
  try {
    const response = await API.graphql({
      query: updatePrognosUsersAddress,
      variables: { input: updateAddress },
      authMode: "API_KEY",
    });
    return response;
  } catch (err) {
    message.error(err.message);
    throw Error(err.errors[0].message);
  }
};
