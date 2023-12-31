import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PrognosTable from "../../shared/components/Table/PrognosTable";

function ChatTable() {
  const navigate = useNavigate();
  const { groupConversationList } = useSelector(
    (state) => state.groupConversation,
  );

  const columns = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
    },
    {
      title: "Health Worker Name",
      dataIndex: "workerName",
      key: "workerName",
    },
    {
      title: "Group Members",
      dataIndex: "groupMembers",
      key: "groupMembers",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          className="text-white bg-subtleTextColor hover:bg-subtleTextColor hover:opacity-90"
          onClick={() => navigate(`/chat/group/${record.key}`)}
        >
          Chat
        </Button>
      ),
    },
  ];

  return (
    <>
      <PrognosTable columns={columns} dataSource={groupConversationList} />
    </>
  );
}

export default ChatTable;
