/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessageTime } from "../../utils";

const initialState = {
  messages: [],
  conversation: null,
  groupId: "",
  groupName: "",
  participants: 0,
  isLoading: false,
  isSuccessFull: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
  attributes: "",
};

// Listing Selected Group Messages
export const listGroupMessages = createAsyncThunk(
  "selectedGroupConversation/listing",
  async (groupId, thunkApi) => {
    try {
      // Getting Selected Group
      const { twilioClient } = thunkApi.getState();
      const { client } = twilioClient;
      const conversation = await client.getConversationBySid(groupId);

      const { friendlyName, _participants } = conversation;
      const { items } = await conversation.getMessages();
      const messages = items.map((message) => ({
        messageText: message.body,
        senderId: message.author,
        fullName: message.attributes?.fullName,
        createdAt: getMessageTime(message.dateCreated),
        email: message.attributes?.email,
      }));

      return {
        messages,
        groupName: friendlyName,
        participants: _participants.size,
        groupId,
        conversation,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const setGroupAttributes = createAsyncThunk(
  "selectedGroupConversationAttributes/setting",
  async (groupObj, thunkApi) => {
    try {
      const { twilioClient } = thunkApi.getState();
      const { client } = twilioClient;
      const conversation = await client.getConversationBySid(groupObj.id);

      const attributes = await conversation.updateAttributes({
        googleMeet: groupObj.meet,
      });

      return attributes;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const listGroupAttributes = createAsyncThunk(
  "selectedGroupConversationAttributes/listing",
  async (groupId, thunkApi) => {
    try {
      const { twilioClient } = thunkApi.getState();
      const { client } = twilioClient;
      const conversation = await client.getConversationBySid(groupId);

      const attributes = await conversation.getAttributes();

      return attributes;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Slice Group Conversation
const groupMessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    resetGroupMessage: (state) => {
      state.groupId = "";
      state.groupName = "";
      state.messages = [];
      state.successMessage = "";
      state.errorMessage = "";
      state.isLoading = false;
      state.isError = false;
      state.conversation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listGroupMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listGroupMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participants = action.payload.participants;
        state.messages = action.payload.messages;
        state.groupName = action.payload.groupName;
        state.groupId = action.payload.groupId;
        state.conversation = action.payload.conversation;
        state.isSuccessFull = true;
      })
      .addCase(listGroupMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messages = [];
        state.errorMessage = action.payload;
      })
      .addCase(listGroupAttributes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listGroupAttributes.fulfilled, (state, action) => {
        state.isLoading = false;
        state = action.payload;
        state.isSuccessFull = true;
      })
      .addCase(listGroupAttributes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(setGroupAttributes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setGroupAttributes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attributes = action.payload.attributes;
        state.isSuccessFull = true;
      })
      .addCase(setGroupAttributes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { addNewMessage, resetGroupMessage } = groupMessageSlice.actions;

export default groupMessageSlice.reducer;
