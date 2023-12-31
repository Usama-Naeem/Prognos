import React, { useEffect } from "react";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import ChatScreen from "../../ChatScreen/ChatScreen";
import ChatSider from "./ChatSider";
import { isMobileScreen } from "../../shared/utils";
import {
  listGroupMessages,
  listGroupAttributes,
} from "../../shared/store/slices/groupMessage";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import { listParticipants } from "../../shared/store/slices/participants";

const { Content, Sider } = Layout;

function Conversation() {
  const [collapseInfo, setCollapseInfo] = React.useState(true);
  const [googleMeetLink, setGoogleMeetLink] = React.useState(null);
  const [childValue, setChildValue] = React.useState(false);
  const dispatch = useDispatch();
  const { isLoading, isSuccessFull } = useSelector(
    (state) => state.groupMessages,
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(listParticipants());
  });

  useEffect(() => {
    dispatch(listGroupMessages(id));
    dispatch(listGroupAttributes(id));
  }, [id]);

  useEffect(() => {
    if (isSuccessFull) {
      dispatch(listParticipants());
    }
  }, [isSuccessFull]);

  const handleChildValue = (meetLink) => {
    setGoogleMeetLink(meetLink);
    setChildValue(true);
  };

  const updateParentState = (newValue) => {
    setChildValue(newValue);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner className={darkColorSpinner} />
      </div>
    );
  return (
    <Layout className="!h-full">
      <Content className="w-full">
        <ChatHeader
          collapseInfo={collapseInfo}
          setCollapseInfo={setCollapseInfo}
          onChildValueChange={handleChildValue}
        />
        <Layout>
          <Content>
            <section className="relative max-h-[80vh] h-[80vh]">
              <ChatScreen
                groupId={id}
                collapseInfo={collapseInfo}
                sendCallNotification={childValue}
                updateParentState={updateParentState}
                googleMeetLink={googleMeetLink}
              />
            </section>
          </Content>
        </Layout>
      </Content>
      <Sider
        width={!isMobileScreen ? "100%" : 400}
        collapsible={true}
        collapsed={collapseInfo}
        defaultCollapsed={true}
        collapsedWidth={0}
        trigger={null}
        className="overflow-y-scroll bg-white border border-borderColor h-[calc(100vh-60px)]"
      >
        <ChatSider
          collapseInfo={collapseInfo}
          setCollapseInfo={setCollapseInfo}
        />
      </Sider>
    </Layout>
  );
}

export default Conversation;
