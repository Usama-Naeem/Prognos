import { message } from "antd";
import { Auth } from "aws-amplify";

export const changePassword = async (oldPassword, newPassword) => {
  try {
    // Getting the current authenticated user info.
    const userInfo = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(userInfo, oldPassword, newPassword);
  } catch (error) {
    error.message === "Incorrect username or password."
      ? message.error("Incorrect old password.", [4])
      : error.message ===
        "1 validation error detected: Value at 'proposedPassword' failed to satisfy constraint: Member must not be null"
      ? message.error(
          "New Password and Confirm Password fields can't be null!",
          [4],
        )
      : error.message ===
        "1 validation error detected: Value at 'previousPassword' failed to satisfy constraint: Member must satisfy regular expression pattern: ^[\\S]+.*[\\S]+$"
      ? message.error("Incorrect old password.", [4])
      : message.error(error.message, [4]);
    throw Error(error.message);
  }
};
