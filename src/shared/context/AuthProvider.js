import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  const [userGroup, setUserGroup] = useState(
    JSON.parse(localStorage.getItem("currentGroup")),
  );

  const [userDynamo, setUserDynamo] = useState(
    JSON.parse(localStorage.getItem("userDynamo")),
  );

  const [healthWorker, setHealthWorker] = useState("");
  const [conversationImage, setConversationImage] = useState("");

  // User Methods
  const setUserDataHandler = (profile) => {
    setUser(profile);
  };

  const removeUserDataHandler = () => {
    setUser(null);
  };

  const setUserGroupHandler = (group) => {
    setUserGroup(group);
  };

  const removeUserGroupHandler = () => {
    setUserGroup("");
  };

  const setHealthWorkerHandler = (hWorker) => {
    setHealthWorker(hWorker);
  };

  const setConversationImageHandler = (image) => {
    setConversationImage(image);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserDataHandler,
        removeUserDataHandler,
        userDynamo,
        setUserDynamo,
        userGroup,
        setUserGroupHandler,
        removeUserGroupHandler,
        healthWorker,
        setHealthWorkerHandler,
        conversationImage,
        setConversationImageHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
