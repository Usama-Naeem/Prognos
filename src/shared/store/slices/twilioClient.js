/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "@twilio/conversations";
import { getTwilioToken } from "../../api/twilioChat";

const initialState = {
  client: null,
  isSuccessFull: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Set Twilio Client
export const setTwilioClient = createAsyncThunk(
  "twilioClient/token",
  async (id, thunkApi) => {
    try {
      const token = await getTwilioToken(id);
      const client = new Client(token);
      return client;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

// Twilio Client Slice
const twilioClientSlice = createSlice({
  name: "twilioClient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setTwilioClient.pending, (state) => {
        state.isLoading = true;
        state.isSuccessFull = false;
        state.client = null;
      })
      .addCase(setTwilioClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.client = action.payload;
        state.isSuccessFull = true;
      })
      .addCase(setTwilioClient.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.isSuccessFull = false;
        state.isError = true;
      });
  },
});

export default twilioClientSlice.reducer;
