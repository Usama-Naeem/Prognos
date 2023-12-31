import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import ChatGroupsView from "../../components/ChatGroupsView/ChatGroupsView";
import AuthContext from "../../shared/context/AuthContext";
import { listGroupConversations } from "../../shared/store/slices/groupConversation";

function Chat() {
  const dispatch = useDispatch();
  const { userDynamo } = useContext(AuthContext);

  useEffect(() => {
    dispatch(listGroupConversations(userDynamo.id));
  }, []);

  return (
    <div>
      <ChatGroupsView />
    </div>
  );
}

export default Chat;
