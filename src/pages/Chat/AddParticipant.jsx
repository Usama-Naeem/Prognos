/* eslint-disable no-await-in-loop */
import React, { useState } from "react";
import { Form, message, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FormRule } from "../../shared/enum/formRules";
import FormModal from "../../shared/components/FormModal/FormModal";
import ModalInput from "../../shared/components/ModalInput/ModalInput";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import { checkUserExist } from "../../shared/api/filter";
import {
  addParticipant,
  addAdminParticipant,
} from "../../shared/store/slices/participants";
import PhoneNumberInput from "../../shared/components/PhoneNumberInput/PhoneNumberInput";
import { PARTICIPANT_ALREADY_EXIST } from "../../shared/constant/tailwindConstants";
import { GroupType } from "../../shared/enum/roles";

function AddParticipant({ isModalOpen, setIsModalOpen, isAdminParticipant }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedPhoneValue, setFormattedPhoneValue] = useState({});
  const [checkboxValue, setCheckboxValue] = useState("email");
  const { participantsList } = useSelector((state) => state.participants);
  const { client } = useSelector((state) => state.twilioClient);

  const handleSubmit = async ({ email }) => {
    setIsLoading(true);
    // if email or phone number is not provided
    try {
      if (!email && !formattedPhoneValue) {
        message.error("Email or phone number is required", [5]);
        setIsLoading(false);
        return;
      }
      if (
        checkboxValue === "phone" &&
        formattedPhoneValue.phoneNumber.length !== 14
      ) {
        message.error("Phone number is not valid", [5]);
        setIsLoading(false);
        return;
      }
      // case if admin
      if (isAdminParticipant) {
        let adminParticipant;
        if (checkboxValue === "phone") {
          const { chw, admin, superAdmin } = await checkUserExist(
            "",
            formattedPhoneValue.phoneNumber,
            true,
          );
          adminParticipant = [...chw, ...admin, ...superAdmin];
        } else {
          const { chw, admin, superAdmin } = await checkUserExist(
            email,
            "",
            true,
          );
          adminParticipant = [...chw, ...admin, ...superAdmin];
        }
        // if we dont find something in the db
        if (!adminParticipant?.length) {
          message.error("Admin doesn't exist", [5]);
          setIsLoading(false);
          return;
        }
        // Check is a User is CHW, And check is any other CHW is a admin of current chat
        if (adminParticipant[0].role === GroupType.COMMUNITY_HEALTH_WORKER) {
          if (
            participantsList.filter(
              (item) =>
                item.attributes.role === GroupType.COMMUNITY_HEALTH_WORKER &&
                item.attributes.isAdmin === true,
            ).length > 0
          ) {
            message.warning("Another CHW is already admin of this chat", [4]);
            setIsLoading(false);
            return;
          }
        }

        if (
          participantsList.filter(
            (item) => item.attributes.email === adminParticipant[0].email,
          ).length > 0
        ) {
          message.error("Admin already in the group", [5]);
          setIsLoading(false);
          return;
        }

        dispatch(addAdminParticipant([adminParticipant[0]]));
        message.success("Admin successfully added to the group", [5]);
        setIsLoading(false);
        setIsModalOpen(false);
        return;
      }

      let participant;
      if (checkboxValue === "phone") {
        const { patient, caregiver, chw } = await checkUserExist(
          "",
          formattedPhoneValue.phoneNumber,
        );
        participant = [...patient, ...caregiver, ...chw];
      } else {
        const { patient, caregiver, chw } = await checkUserExist(email);
        participant = [...patient, ...caregiver, ...chw];
      }
      // if we find something in the db
      if (!participant?.length) {
        message.error("Participant doesn't exist", [5]);
        setIsLoading(false);
        return;
      }
      if (
        participantsList.filter(
          (item) => item.attributes.email === participant[0].email,
        ).length > 0
      ) {
        message.error("Participant already in the group", [5]);
        setIsLoading(false);
        return;
      }

      const { items } = await client.getSubscribedConversations();
      let groupMembershipCount = 0
      // Check if patient or caregiver is already in two conversation
      // eslint-disable-next-line
      for (const conversation of items) {
        try {
          const currentUserGroups = await conversation.getParticipantByIdentity(participant[0].id,);
          if (currentUserGroups) {
            groupMembershipCount += 1
          }
        } catch (error) {
          // No need to throw error
        }
      }
      if (groupMembershipCount < 2 ) {
        dispatch(addParticipant(participant));
        message.success("Participant successfully added to the group", [5]);
        setIsLoading(false)
        setIsModalOpen(false)
      } else {
        message.error("Participant is already in two groups")
        setIsLoading(false)
        setIsModalOpen(false)
        return;
      }
    } catch (err) {
      setIsLoading(false);
      message.error("Something went wrong", [5]);
    }
  };

  async function checkAndAddParticipantToConversation(
    conversation,
    participantId,
  ) {
    try {
      const currentUserGroups = await conversation.getParticipantByIdentity(
        participantId,
      );

      if (currentUserGroups) {
        message.error(PARTICIPANT_ALREADY_EXIST);
        setIsLoading(false);
        setIsModalOpen(false);
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <FormModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title="Add Participant"
      >
        <Form className="pt-[50px] pb-[10px]" onFinish={handleSubmit}>
          {/* radio buttons */}
          <Radio.Group
            onChange={(e) => setCheckboxValue(e.target.value)}
            value={checkboxValue}
            className="mb-3"
          >
            <Radio value={"email"}>Email</Radio>
            <Radio value={"phone"}>Phone</Radio>
          </Radio.Group>

          {/* email input */}
          {checkboxValue === "email" ? (
            <ModalInput
              placeholder="Enter email"
              type="email"
              name="email"
              rules={FormRule.EMAIL}
            />
          ) : (
            <div className="mb-8">
              <PhoneNumberInput
                value={phoneNumber}
                rules={FormRule.PHONE}
                name="phoneNumber"
                placeholder="(222) 222-2222"
                errorCheck={true}
                onChange={(e) => setPhoneNumber(e)}
                setFormState={setFormattedPhoneValue}
              />
            </div>
          )}

          <ModalSubmitButton label="Add" loading={isLoading} className="mt-0" />
        </Form>
      </FormModal>
    </>
  );
}

export default AddParticipant;
