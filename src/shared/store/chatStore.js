import { configureStore } from "@reduxjs/toolkit";
import twilioClientSlice from "./slices/twilioClient";
import groupConversationSlice from "./slices/groupConversation";
import groupMessageSlice from "./slices/groupMessage";
import participantsSlice from "./slices/participants";

export const chatStore = configureStore({
  reducer: {
    twilioClient: twilioClientSlice,
    groupConversation: groupConversationSlice,
    groupMessages: groupMessageSlice,
    participants: participantsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
