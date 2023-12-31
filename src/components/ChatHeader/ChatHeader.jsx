import { Avatar, Button, Modal, Input, notification } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { ArrowBackIos, MenuOpen, Phone } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { API, Storage } from "aws-amplify";
import { isMobileScreen } from "../../shared/utils";
import AuthContext from "../../shared/context/AuthContext";
import { EmailTemplates } from "../../shared/enum/email";

function ChatHeader({ collapseInfo, setCollapseInfo, onChildValueChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetLink, setMeetLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const mobileScreen = isMobileScreen();
  const { healthWorker, setHealthWorkerHandler, conversationImage } =
    useContext(AuthContext);

  const { client } = useSelector((state) => state.twilioClient);
  const { groupName } = useSelector((state) => state.groupMessages);
  const { participantsList } = useSelector((state) => state.participants);

  useEffect(() => {
    const getGoogleMeetLink = async () => {
      const attributes = await getAttributes();
      setMeetLink(attributes.googleMeet);
    };
    getGoogleMeetLink();
    (async () => {
      const conversation = await client.getConversationBySid(id);
      const attributes = await conversation.getAttributes();
      if (attributes.imageKey !== undefined) {
        const imageUrl = await Storage.get(attributes.imageKey.key);
        setImage(imageUrl);
      }
    })();
  }, []);

  useEffect(() => {
    if (conversationImage !== "") {
      setImage(conversationImage);
    }
  }, [conversationImage]);

  // eslint-disable-next-line
  const meetRegEx = /https:\/\/meet\.google\.com\/[a-z0-9\-]{10}/;

  const getAttributes = async () => {
    const conversation = await client.getConversationBySid(id);
    const response = await conversation.getAttributes();
    return response;
  };

  const setAttributes = async (attObj) => {
    const conversation = await client.getConversationBySid(id);
    const conversationObject = { ...conversation.attributes, ...attObj };
    const response = await conversation.updateAttributes(conversationObject);
    return response;
  };

  const showModal = async () => {
    const attributes = await getAttributes();
    setHealthWorkerHandler(attributes?.workerName);
    attributes.googleMeet
      ? setMeetLink(attributes.googleMeet)
      : setMeetLink("");
    if (meetRegEx.test(meetLink)) {
      setErrorMessage("");
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!meetRegEx.test(meetLink)) {
      setErrorMessage("Please enter a valid Google Meet URL!");
      return;
    }

    if (meetRegEx.test(meetLink)) {
      setErrorMessage("");
    }

    const attributesObj = {
      workerName: healthWorker,
      googleMeet: meetLink,
    };
    await setAttributes(attributesObj);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (event) => {
    setMeetLink(event.target.value);
  };

  const handleChange = () => {
    onChildValueChange(meetLink);
  };

  const handleGoogleMeet = async () => {
    handleChange();
    if (meetLink === "") {
      notification.error({
        message: "Please enter Google Meet Link to initiate the meeting.",
        duration: 3,
      });
    }

    if (meetLink !== "") {
      window.open(meetLink);

      // make a list of participants email
      const participantsEmail = participantsList.map(
        (item) => item.attributes?.email,
      );
      const participantsName = participantsList.map(
        (item) => item.attributes?.fullName,
      );

      const participantsObj = [];

      if (participantsEmail.length > 0 && participantsName.length > 0) {
        for (let i = 0; i < participantsEmail.length; i += 1) {
          participantsObj.push({
            email: participantsEmail[i],
            name: participantsName[i],
          });
        }

        // sending emails to all participants
        // eslint-disable-next-line
        for (const obj of participantsObj) {
          // eslint-disable-next-line
          await API.post("apiEmailTransporter", "/sendEmail", {
            body: {
              toAddress: obj.email,
              fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
              templateName: EmailTemplates.GOOGLE_MEET,
              templateData: {
                name: obj.name,
                link: meetLink,
              },
            },
          });
        }
      }
    }
  };

  return (
    <div className="w-full border-b border-[#D9D9D9] h-[80px] py-3 px-6 flex items-center justify-between">
      {mobileScreen ? (
        <ArrowBackIos onClick={() => navigate("/chat")} className="ml-auto" />
      ) : (
        <Button
          onClick={() => navigate("/chat")}
          className="text-white bg-darkColor"
        >
          <ArrowBackIos className="text-white !text-[12px]" />
          Back
        </Button>
      )}

      <div
        className={`flex items-center gap-2 ${mobileScreen ? "mr-auto" : ""}`}
      >
        {mobileScreen ? null : <Avatar size={40} src={image} />}
        <span className="text-lg font-bold">{groupName}</span>
      </div>
      <div className="flex gap-4">
        <Button onClick={showModal}>Google Meet Link</Button>
        <Modal
          title="Google Meet"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button danger key="1" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="2" onClick={handleOk}>
              Save
            </Button>,
          ]}
        >
          <Input
            placeholder="Google Meet Link"
            className="mt-3 mb-3"
            onChange={handleInputChange}
            value={meetLink}
            type="url"
            pattern="https:\/\/meet\.google\.com\/[a-z0-9\-]{10}"
          />
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </Modal>
        <Phone
          className="cursor-pointer"
          onClick={handleGoogleMeet}
          target="_blank"
        />
        {collapseInfo ? (
          <MenuOpen
            className="cursor-pointer"
            onClick={() => setCollapseInfo(!collapseInfo)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ChatHeader;
