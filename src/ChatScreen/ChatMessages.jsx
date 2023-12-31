import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../shared/context/AuthContext";
import "./ChatStyles.css";
import { highlightUrl } from "../shared/utils";

function ChatMessages({ botttomScrollRef }) {
  const { messages } = useSelector((state) => state.groupMessages);
  const { userDynamo } = useContext(AuthContext);

  useEffect(() => {
    botttomScrollRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="flex flex-col  gap-3 px-4 pt-4 pb-[80px]">
      {messages.map((message, index) => (
        <div
          key={`${Math.random()}${index}`}
          className={
            userDynamo.id === message.senderId
              ? "flex flex-col ml-auto my-1 max-w-[50%]"
              : "flex flex-col mr-auto my-1 max-w-[50%]"
          }
        >
          <div
            className={`bubble ${
              userDynamo.id === message.senderId
                ? "bubble-right"
                : "bubble-left"
            }`}
          >
            <h1 className="text-sm font-bold">{message.fullName}</h1>
            <p className="text-xs">{highlightUrl(message.messageText)}</p>
          </div>
          <p
            className={`text-[8px] my-1  mx-3 font-medium ${
              userDynamo.id === message.senderId ? "" : "text-right"
            }`}
          >
            {message.createdAt}
          </p>
        </div>
      ))}
      <div ref={botttomScrollRef} />
    </div>
  );
}

export default ChatMessages;
