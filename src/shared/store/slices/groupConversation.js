/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { addConversationParticipants } from "../../api/twilioChat";
import { EmailTemplates } from "../../enum/email";
import { CHAT_DEFAULT_IMAGE_URL } from "../../constant/formConstatnt";

const initialState = {
  groupConversationList: [],
  isLoading: true,
  isSuccessFull: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
};

// List Group Conversation
export const listGroupConversations = createAsyncThunk(
  "groupConversation/listing",
  async (_, thunkApi) => {
    try {
      // Getting Groups from Twilio
      const { twilioClient } = thunkApi.getState();
      const { client } = twilioClient;
      let conversationList = [];

      let initialResponse = await client.getSubscribedConversations();
      conversationList = conversationList.concat(initialResponse.items);

      while (initialResponse.hasNextPage) {
        initialResponse = await initialResponse.nextPage();
        conversationList = conversationList.concat(initialResponse.items);
      }
      const conversations = await Promise.all(
        conversationList.map(async (conv) => {
          try {
            const participants = await conv.getParticipants();
            return {
              groupName: conv.friendlyName,
              key: conv.sid,
              groupMembers: participants.length,
              workerName: conv.attributes.workerName,
              createdAt: new Date(conv.dateCreated),
            };
          } catch (error) {
            console.error(
              "Error fetching participants for conversation:",
              error,
            );
            return {
              groupName: conv.friendlyName,
              key: conv.sid,
              groupMembers: 0, // Default to 0 if there is an error
              workerName: conv.attributes.workerName,
              createdAt: new Date(conv.dateCreated),
            };
          }
        }),
      );

      return conversations.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Add a New Group Conversation

export const addGroupConversation = createAsyncThunk(
  "groupConversation/add",
  async (data, thunkApi) => {
    try {
      // Add new Group
      const {
        groupName,
        groupDescription,
        workerName: chwName,
        adminList,
        patientCaregiverList,
        participantCHWList,
        autoAddPatientCaregiver = false,
      } = data;
      const { twilioClient } = thunkApi.getState();
      const { client } = twilioClient;
      const { items } = await client.getSubscribedConversations();

      const participantsFound = [];
      // Check if patient or caregiver is already in a conversation
      // eslint-disable-next-line
      for (const conversation of items) {
        // eslint-disable-next-line
        for (const participant of patientCaregiverList) {
          try {
            // eslint-disable-next-line
            await conversation.getParticipantByIdentity(participant.id);
            participantsFound.push(participant.id);
          } catch (err) {
            // No need to throw error here
          }
        }
      }

      // Final list of participants after filtering
      let participantsList = [...participantCHWList];

      if (autoAddPatientCaregiver) {
        // Filter out participants that are already present in a conversation
        const patientCaregiverListWithoutCommon = patientCaregiverList.filter(
          (val) => !participantsFound.includes(val.id),
        );

        participantsList = [...patientCaregiverListWithoutCommon];
      }

      const newGroupConversation = await client.createConversation({
        friendlyName: groupName,
        uniqueName: nanoid(),
        attributes: {
          workerName: chwName,
          imageKey: CHAT_DEFAULT_IMAGE_URL,
          groupDescription: groupDescription,
        },
      });
      const response = await addConversationParticipants(
        newGroupConversation.sid,
        adminList,
        participantsList,
      );
      const { friendlyName, sid, attributes } = newGroupConversation;
      const { workerName } = attributes;
      return {
        groupName: friendlyName,
        key: sid,
        groupMembers: response.length || 1,
        workerName,
        groupDescription,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const deleteGroupConversation = createAsyncThunk(
  "deleteGroupConversation/add",
  async (_, thunkApi) => {
    try {
      const { groupMessages, participants } = thunkApi.getState();
      const { groupId, conversation, groupName } = groupMessages;
      const { participantsList } = participants;
      await conversation.delete();
      // refresh the list of conversations
      thunkApi.dispatch(leaveGroup(groupId));
      // make a list of participants email
      const participantsEmail = participantsList.map(
        (item) => item.attributes?.email,
      );
      // breaking this list into chunks of 50 as AWS SES sends 50 emails at a time
      const chunks = [];
      const chunkSize = 50;
      for (let i = 0; i < participantsEmail.length; i += chunkSize) {
        chunks.push(participantsEmail.slice(i, i + chunkSize));
      }
      // sending emails to all participants
      chunks.forEach(async (chunk) => {
        try {
          // Lambda function to group email.
          await API.post("apiEmailTransporter", "/sendEmail", {
            body: {
              toAddress: chunk,
              fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
              templateName: EmailTemplates.DELETE_CHAT,
              templateData: {
                groupName: groupName,
              },
            },
          });
        } catch (err) {
          throw Error(err.message);
        }
      });
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Slice Group Conversation
const groupConversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    reset: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
      state.isLoading = false;
      state.isError = false;
    },
    leaveGroup: (state, action) => {
      const groupList = state.groupConversationList;
      const filteredGroupList = groupList.filter(
        (item) => item.key !== action.payload,
      );
      state.groupConversationList = filteredGroupList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listGroupConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listGroupConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessFull = true;
        state.groupConversationList = action.payload;
      })
      .addCase(listGroupConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addGroupConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGroupConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groupConversationList.unshift(action.payload);
        state.isSuccessFull = true;
        state.successMessage = "Conversation Added";
      })
      .addCase(addGroupConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset, leaveGroup } = groupConversationSlice.actions;
export default groupConversationSlice.reducer;
