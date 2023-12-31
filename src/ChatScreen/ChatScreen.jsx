import { Send } from "@mui/icons-material";
import { Button, Form, Input, message } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../shared/context/AuthContext";
import { addNewMessage } from "../shared/store/slices/groupMessage";
import {
  getMessageTime,
  isBlankOrEmptyMessage,
  isMobileScreen,
} from "../shared/utils";
import ChatMessages from "./ChatMessages";
import "./Chatscreen.css";

function ChatScreen({
  collapseInfo,
  groupId,
  sendCallNotification,
  updateParentState,
  googleMeetLink,
}) {
  const { client } = useSelector((state) => state.twilioClient);
  const { userDynamo } = useContext(AuthContext);
  const [conversation, setConversation] = useState();
  const [chatMessage, setChatMessage] = useState("");
  const [disableSendButton, setDisableSendButton] = useState(false);
  const mobileScreen = isMobileScreen();
  const dispatch = useDispatch();
  const botttomScrollRef = useRef(null);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    if (sendCallNotification && !messageSent && googleMeetLink) {
      setMessageSent(true);

      (async function sendmessage() {
        const messageAttributes = {
          email: userDynamo.email,
          fullName: `${userDynamo.firstName} ${userDynamo.lastName}`,
          subtype: "rich_text",
        };
        await conversation.sendMessage(
          `A new group chat has been started. Please join the following link: ${googleMeetLink}`,
          messageAttributes,
        );
        updateParentState(false);
      })();
    }
  }, [sendCallNotification, messageSent, googleMeetLink]);
  const sendMessageHandler = async () => {
    // disable the send button to prevent multiple submits
    setDisableSendButton(true);

    const messageAttributes = {
      email: userDynamo.email,
      fullName: `${userDynamo.firstName} ${userDynamo.lastName}`,
      subtype: "rich_text",
    };
    isBlankOrEmptyMessage(chatMessage)
      ? message.warning("Message can't be empty")
      : await conversation.sendMessage(chatMessage, messageAttributes);
    setChatMessage("");
    // scroll to bottom of the chat after sending the message
    botttomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    setDisableSendButton(false);
  };
  const handleMessageAdded = (mess) => {
    if (mess) {
      const newMessage = {
        messageText: mess.body,
        senderId: mess.author,
        email: mess.attributes?.email,
        fullName: mess.attributes?.fullName,
        createdAt: getMessageTime(mess.dateCreated),
      };
      dispatch(addNewMessage(newMessage));
    }
  };

  const getConversation = async () => {
    const response = await client.getConversationBySid(groupId);
    setConversation(response);
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    if (conversation) {
      conversation.on("messageAdded", handleMessageAdded);
    }
    return () => {
      if (conversation) {
        conversation.removeListener("messageAdded", handleMessageAdded);
      }
    };
  }, [groupId, conversation]);

  return (
    <div className="h-full overflow-y-scroll">
      <ChatMessages botttomScrollRef={botttomScrollRef} />
      {mobileScreen && !collapseInfo ? null : (
        <Form
          onFinish={sendMessageHandler}
          className="absolute bottom-0 w-full px-4 py-2 bg-white shadow-md"
        >
          <Form.Item>
            <Input
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              type="text"
              required
              className="bg-lightColor"
              placeholder="Type a message here"
              suffix={
                <Button
                  className="flex items-center justify-center cursor-pointer bg-primaryColor"
                  htmlType="submit"
                  disabled={disableSendButton}
                  icon={<Send className="text-white -rotate-45" />}
                />
              }
            />
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default ChatScreen;
