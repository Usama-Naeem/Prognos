import React from "react";

const AuthContext = React.createContext({
  user: {},
  setUserDataHandler: () => {},
  removeUserDataHandler: () => {},
  userDynamo: {},
  setUserDynamo: () => {},
  userGroup: "",
  setUserGroupHandler: () => {},
  removeUserGroupHandler: () => {},
  pagePermissions: [],
  setActivePermissionPageHandler: () => {},
  healthWorker: "",
  setHealthWorkerHandler: () => {},
  conversationImage: "",
  setConversationImageHandler: () => {},
});

export default AuthContext;
