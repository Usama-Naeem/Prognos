import { API } from "aws-amplify";

export const getTwilioToken = async (userId) => {
  try {
    const { body, success } = await API.get(
      "chat",
      `/generate-token/${userId}`,
    );
    if (!success) throw new Error("Could not get the token");
    return body.token;
  } catch (error) {
    throw new Error(error);
  }
};

export const addConversationParticipants = async (
  convoId,
  admins,
  participants,
) => {
  try {
    const { body } = await API.post("chat", "/add-participants", {
      body: {
        conversationSid: convoId,
        admins,
        users: participants,
      },
    });
    return body;
  } catch (error) {
    throw new Error(error);
  }
};
