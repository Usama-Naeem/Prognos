import { Auth } from "aws-amplify";

export const signUp = async (email, password) => {
  try {
    const response = await Auth.signUp({
      username: email.toLowerCase(),
      password,
      autoSignIn: {
        enabled: false,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};
