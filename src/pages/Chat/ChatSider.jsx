import React, { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Input,
  List,
  Button,
  message,
  Popconfirm,
  Popover,
  Upload,
  Space,
} from "antd";
import { HighlightOff, PersonAdd, Search } from "@mui/icons-material";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Storage } from "aws-amplify";

import { isMobileScreen } from "../../shared/utils";
import {
  removeParticipant,
  leaveGroup,
} from "../../shared/store/slices/participants";
import { deleteGroupConversation } from "../../shared/store/slices/groupConversation";
import LeaveGroupChat from "./LeaveGroupChat";
import AddParticipant from "./AddParticipant";
import AuthContext from "../../shared/context/AuthContext";
import { GroupType } from "../../shared/enum/roles";
import {
  PARTICICPANT_REMOVE,
  acceptUploads,
} from "../../shared/constant/formConstatnt";

const CHANNEL_ADMIN_ROLESID = process.env.REACT_APP_TWILIO_CHANNEL_ADMIN;

function ChatSider({ collapseInfo, setCollapseInfo }) {
  const { groupName, participants } = useSelector(
    (state) => state.groupMessages,
  );
  const { participantsList } = useSelector((state) => state.participants);
  const { client } = useSelector((state) => state.twilioClient);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClick, setClick] = useState(false);
  const [description, setDescription] = useState(null);
  const [updateDescription, setUpdateDescription] = useState(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isConversationAdmin, setIsConversationAdmin] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [addAdminParticipant, setAddAdminParticipant] = useState(false);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDynamo, setConversationImageHandler } = useContext(AuthContext);
  const [userData] = useState(userDynamo || {});
  const participantName = `${userData?.firstName} ${userData?.lastName}`;
  const { id } = useParams();

  const confirmDeleteGroup = async () => {
    dispatch(deleteGroupConversation());
    navigate("/chat", { replace: true });
    message.success("group deleted successfully", [5]);
  };

  const mobileScreen = isMobileScreen();

  useEffect(() => {
    // fetch current user group from storage
    setGroup(JSON.parse(localStorage.getItem("currentGroup")));
    (async () => {
      const conversation = await client.getConversationBySid(id);
      const attributes = await conversation.getAttributes();
      setDescription(attributes?.groupDescription);
      if (attributes.imageKey !== undefined) {
        const imageUrl = await Storage.get(attributes.imageKey.key);
        setImage(imageUrl);
      }
    })();
  }, []);

  useEffect(() => {
    const data = participantsList.map((participant, index) => ({
      name: participant.attributes?.fullName,
      email: participant.attributes?.email,
      role: participant.attributes?.role,
      identity: participant.identity,
      isAdmin: participant.roleSid === CHANNEL_ADMIN_ROLESID ? true : false,
      key: index,
    }));
    // filter roleSid for the current user
    const currentUserSid = data.filter(
      (item) => item.email === userDynamo.email,
    );
    setIsConversationAdmin(currentUserSid[0]?.isAdmin);
    if (query) {
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(query?.toLowerCase()) ||
          item.email?.toLowerCase().includes(query?.toLowerCase()),
      );
      setFilteredList(filtered);
      return;
    }
    // if query is empty, set the filtered list to the original list
    setFilteredList(data);
  }, [query, participantsList]);

  const addAdminButtonHandler = () => {
    setAddAdminParticipant(true);
    setIsModalOpen(true);
  };

  const saveDescription = async () => {
    const conversation = await client.getConversationBySid(id);
    const attributes = await conversation.getAttributes();
    if (updateDescription.length < 1) {
      message.error("Please add text to update description", [4]);
      return;
    }
    if (attributes.groupDescription && updateDescription.length > 0) {
      attributes.groupDescription = updateDescription || "Description";
      await conversation.updateAttributes(attributes);
      message.success("Description is update successfully", [4]);
      setDescription(attributes?.groupDescription);
      setClick(false);
    }
  };

  const updateDescroptionText = (e) => {
    setUpdateDescription(e.target.value);
  };

  const addParticipantButtonHandler = () => {
    setAddAdminParticipant(false);
    setIsModalOpen(true);
  };

  const simpleLeaveGroupHandler = () => {
    // leave group chat
    dispatch(leaveGroup(participantName));
    navigate("/chat", { replace: true });
    message.success("You left the group successfully", [5]);
  };

  const props = {
    async customRequest({ file, onSuccess }) {
      const updatedFilename = `${Date.now()}_${file.name}`;
      try {
        // Upload picture to S3
        const storageKey = await Storage.put(updatedFilename, file);
        // Get image URL from s3 using key
        const imageUrl = await Storage.get(storageKey.key);
        // Get existing conversation attributes
        const conversation = await client.getConversationBySid(id);
        const attributes = await conversation.getAttributes();
        // Object with old attributes and imageURL
        attributes.imageKey = storageKey;
        // Strore new attributes to twilio conversation
        await conversation.updateAttributes(attributes);

        setImage(imageUrl);
        setConversationImageHandler(imageUrl);

        onSuccess();
      } catch (error) {
        // eslint-disable-next-line
        console.log({ error });
        throw new Error(error);
      }
    },
  };

  const popoverContent = (
    <div className="flex gap-2">
      <Button
        className="text-white bg-darkColor"
        onClick={addParticipantButtonHandler}
      >
        Add Participant
      </Button>
      <Button
        className="text-white bg-darkColor"
        onClick={addAdminButtonHandler}
      >
        Add Admin
      </Button>
    </div>
  );

  return (
    <>
      <div>
        {/* info header */}
        <div
          className={`h-[80px] border-b border-borderColor py-3 px-6 flex items-center font-medium ${
            mobileScreen ? "justify-center" : "justify-start"
          }`}
        >
          <div className="flex items-center gap-3">
            <HighlightOff
              className="cursor-pointer"
              onClick={() => setCollapseInfo(!collapseInfo)}
            />
            <span>Group Info</span>
          </div>
        </div>
        {/* group name */}
        <div className="flex flex-col items-center justify-center h-[300px] gap-2 border-b border-borderColor">
          {group?.includes(GroupType.SUPER_ADMIN) ||
          group?.includes(GroupType.ADMIN) ||
          (isConversationAdmin &&
            group?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) ? (
            <Upload
              accept={acceptUploads["picture"]}
              maxCount={1}
              {...props}
              className="w-80"
            >
              <Button className="w-full" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          ) : (
            ""
          )}
          <Avatar size={120} src={image} />
          <div className="text-xl font-bold">{groupName}</div>
          {isClick ? (
            <Space.Compact
              style={{
                width: "80%",
              }}
            >
              <Input
                placeholder="Description"
                defaultValue={description}
                onChange={updateDescroptionText}
              />
              <Button
                type="primary"
                className="bg-primaryColor hover:!bg-primaryColor hover:opacity-90"
                onClick={saveDescription}
              >
                Save
              </Button>
            </Space.Compact>
          ) : (
            <div className="text-base font-thin text-gray-400">
              {description && description.length > 24
                ? `${description.slice(0, 35)}...`
                : description}
            </div>
          )}
          <Button
            type="primary"
            className="bg-primaryColor hover:!bg-primaryColor hover:opacity-90"
            onClick={() => setClick(!isClick)}
          >
            {isClick ? "Cancel" : "Edit Description"}
          </Button>
          <div className="text-xs text-gray-400">
            {participants} Participants
          </div>
        </div>
        {/* bottom section */}
        <div className="flex flex-col gap-4 px-6 py-3 bg-borderColor">
          {/* search */}
          <Input
            prefix={<Search />}
            className="rounded-full"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Add participants & action buttons */}
          <div className="flex items-center justify-between">
            {(isConversationAdmin || group === GroupType.ADMIN) && (
              <Popover content={popoverContent} trigger="click">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar
                    icon={<PersonAdd />}
                    className="flex items-center justify-center bg-darkColor"
                    size={40}
                  />
                  <span className="font-medium">Add Participant</span>
                </div>
              </Popover>
            )}
            <div
              className={`flex flex-col items-center gap-2 ${
                !isConversationAdmin ? "ml-auto" : null
              }`}
            >
              {isConversationAdmin &&
              group?.includes(GroupType.COMMUNITY_HEALTH_WORKER) ? (
                <Button
                  className="text-white bg-darkColor"
                  onClick={() => {
                    setIsLeaveModalOpen(true);
                  }}
                >
                  Leave Group
                </Button>
              ) : (
                <Popconfirm
                  title="Leave Group"
                  description="Are you sure you want to leave the group?"
                  onConfirm={simpleLeaveGroupHandler}
                  okText="Yes"
                  okButtonProps={{
                    type: "primary",
                    danger: true,
                  }}
                  cancelText="No"
                >
                  <Button className="text-white bg-darkColor">
                    Leave Group
                  </Button>
                </Popconfirm>
              )}
              {isConversationAdmin && (
                <Popconfirm
                  title="Delete Group"
                  description="Are you sure to delete this task?"
                  onConfirm={confirmDeleteGroup}
                  okText="Yes"
                  okButtonProps={{
                    type: "primary",
                    danger: true,
                  }}
                  cancelText="No"
                >
                  <Button className="text-white bg-red-600">
                    Delete Group
                  </Button>
                </Popconfirm>
              )}
            </div>
          </div>
          {/* Members list */}
          <div>
            <List
              dataSource={filteredList}
              renderItem={(item, index) => (
                <List.Item className="px-0" key={index}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item?.imageUrl} alt="participant-image" />
                    }
                    title={<p className="max-w-[60%]">{item.name}</p>}
                    description={
                      <p className="min-w-[60%] text-sm mr-6">{item.email}</p>
                    }
                  />
                  {item?.role === GroupType.ADMIN ||
                  item?.role === GroupType.SUPER_ADMIN ? (
                    <div className="text-darkColor">Admin</div>
                  ) : item.role === GroupType.COMMUNITY_HEALTH_WORKER ? (
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-darkColor">CHW</div>
                      <Button
                        onClick={() => {
                          dispatch(
                            removeParticipant({ identity: item.identity }),
                          );
                          message.success(PARTICICPANT_REMOVE, [4]);
                        }}
                        className={`${
                          item?.isAdmin ? "bg-subtleTextColor" : "bg-darkColor"
                        } rounded text-white text-sm px-1.5`}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : item?.role === GroupType.PATIENT ||
                    item?.role === GroupType.CARE_GIVER ? (
                    <Button
                      onClick={() => {
                        dispatch(
                          removeParticipant({ identity: item.identity }),
                        );
                        message.success(PARTICICPANT_REMOVE, [4]);
                      }}
                      className={`${
                        item?.isAdmin ? "bg-subtleTextColor" : "bg-darkColor"
                      } rounded text-white text-sm px-1.5`}
                    >
                      Remove
                    </Button>
                  ) : (
                    ""
                  )}
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      {/* add participant modal */}
      <AddParticipant
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isAdminParticipant={addAdminParticipant}
      />

      {/* leave group modal */}
      <LeaveGroupChat
        isLeaveModalOpen={isLeaveModalOpen}
        setIsLeaveModalOpen={setIsLeaveModalOpen}
      />
    </>
  );
}

export default ChatSider;
