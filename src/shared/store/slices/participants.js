/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { addConversationParticipants } from "../../api/twilioChat";
import { EmailTemplates } from "../../enum/email";
import { leaveGroup as leaveGroupReducer } from "./groupConversation";
import { getSuperAdminDetails } from "../../api/admin";

const initialState = {
  participantsList: [],
  isLoading: true,
  isSuccessFull: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
};

// List Group Conversation
export const listParticipants = createAsyncThunk(
  "participants/listing",
  async (_, thunkApi) => {
    try {
      // Getting Groups from Twilio
      const { groupMessages } = thunkApi.getState();
      const { conversation } = groupMessages;
      const getAllParticipants = await conversation.getParticipants();
      return getAllParticipants;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Leave Group Conversation
export const leaveGroup = createAsyncThunk(
  "leaveGroup/listing",
  async (name, thunkApi) => {
    try {
      // Getting Groups from Twilio
      const { groupMessages } = thunkApi.getState();
      const { conversation } = groupMessages;
      await conversation.leave();
      const data = await getSuperAdminDetails();
      // The user name is hardcoded, please remove when get real one
      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [data[0]?.email.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.LEFT_CHAT,
          templateData: {
            name: name,
            adminName: `${data[0]?.firstName} ${data[0]?.lastName}`,
          },
        },
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// remove participants
export const removeParticipant = createAsyncThunk(
  "remove/listing",
  async (identity, thunkApi) => {
    try {
      // Getting Groups from Twilio
      const { groupMessages } = thunkApi.getState();
      const { conversation, groupName } = groupMessages;
      await conversation.removeParticipant(identity.identity);
      // filter out the participantList and remove this items from the array
      const { participantsList } = thunkApi.getState().participants;

      const filteredParticipants = participantsList.filter(
        (item) => item.identity !== identity.identity,
      );

      // Send email to user, when a user removed from group by admin
      const filteredRemovedParticipants = participantsList.filter(
        (item) => item.identity === identity.identity,
      );
      const userEmail = filteredRemovedParticipants[0]?.attributes?.email;
      const userName = filteredRemovedParticipants[0]?.attributes?.fullName;
      // don't send the email if the user is the admin
      if (identity?.dontSendEmail) return filteredParticipants;

      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [userEmail.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.REMOVED_FROM_CHAT,
          templateData: {
            name: `${userName}`,
            group: groupName,
          },
        },
      });

      return filteredParticipants;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Add Participants
export const addParticipant = createAsyncThunk(
  "addParticipant/listing",
  async (dataArr, thunkApi) => {
    try {
      // Getting Groups from Twilio
      const { groupMessages } = thunkApi.getState();
      const { groupId, groupName } = groupMessages;
      const response = await addConversationParticipants(groupId, [], dataArr);
      const responseArray = response?.map((item) => ({
        ...item,
        attributes: JSON.parse(item.attributes),
      }));
      // Send email to user, when a user add in to group by admin
      const userEmail = responseArray[0]?.attributes?.email;
      const userName = responseArray[0]?.attributes?.fullName;
      await API.post("apiEmailTransporter", "/sendEmail", {
        body: {
          toAddress: [userEmail.toLowerCase()],
          fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
          templateName: EmailTemplates.ADDED_TO_CHAT,
          templateData: {
            name: `${userName}`,
            group: groupName,
          },
        },
      });

      return responseArray;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Add Admin Participants
export const addAdminParticipant = createAsyncThunk(
  "addAdminParticipant/listing",
  async (dataArr, thunkApi) => {
    try {
      // Getting Groups from Twilio
      const { groupMessages, participants } = thunkApi.getState();
      const { groupId } = groupMessages;
      const { participantsList } = participants;
      // check if the user already exist in the group
      const isUserExist = participantsList.find(
        (item) => item.attributes?.email === dataArr[0]?.email,
      );
      // if user exist already then remove it first
      if (isUserExist) {
        const adminIdentity = {
          identity: isUserExist.identity,
          dontSendEmail: true,
        };
        thunkApi.dispatch(removeParticipant(adminIdentity));
      }
      const response = await addConversationParticipants(groupId, dataArr, []);
      const responseArray = response?.map((item) => ({
        ...item,
        attributes: JSON.parse(item.attributes),
      }));
      // refreshing the data for group conversation
      thunkApi.dispatch(leaveGroupReducer(groupId));
      return responseArray;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Slice Group Conversation
const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    reset: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
      state.isLoading = false;
      state.isError = false;
      state.participantsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listParticipants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listParticipants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.participantsList = action.payload;
      })
      .addCase(listParticipants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(removeParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participantsList = action.payload;
        state.isSuccessFull = true;
        state.successMessage = "Particpant removed";
      })
      .addCase(removeParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participantsList.push(action.payload[0]);
        state.isSuccessFull = true;
        state.successMessage = "Particpant added";
      })
      .addCase(addParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addAdminParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAdminParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participantsList.push(action.payload[0]);
        state.isSuccessFull = true;
        state.successMessage = "Particpant removed";
      })
      .addCase(addAdminParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default participantsSlice.reducer;
