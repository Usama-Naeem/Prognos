import React, { useContext, useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormModal from "../../shared/components/FormModal/FormModal";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import { listCommunityHealthWorkers } from "../../shared/api/communityHealthWorker";
import { FormRule } from "../../shared/enum/formRules";
import {
  addAdminParticipant,
  leaveGroup,
} from "../../shared/store/slices/participants";
import AuthContext from "../../shared/context/AuthContext";

function LeaveGroupChat({ isLeaveModalOpen, setIsLeaveModalOpen }) {
  const authContext = useContext(AuthContext);
  const [communityHealthWorkers, setCommunityHealthWorkers] = useState([]);
  const [selectOptions, setSelectOptions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = authContext.userDynamo?.id;
  const [data] = useState(authContext.userDynamo || {});
  const participantName = `${data?.firstName} ${data?.lastName}`;
  useEffect(() => {
    (async () => {
      const response = await listCommunityHealthWorkers();
      setCommunityHealthWorkers(response);
      const options = response
        .filter((user) => user.id !== userId)
        .map((item) => ({
          label: `${item.email}`,
          value: item.email,
        }));
      setSelectOptions(options);
    })();
  }, []);

  const makeAdminSubmitHandler = async (e) => {
    setIsLoading(true);
    try {
      // get the selected chw from communityHealthWorkers list
      const admin = communityHealthWorkers.filter(
        (item) => item.email === e.chw,
      );
      // feed this admin into the addParticipant function
      dispatch(addAdminParticipant([...admin]));
      // make the participant leave the channel
      dispatch(leaveGroup(participantName));
      // redirect the user to chat page with react router dom
      navigate("/chat", { replace: true });
      message.success("You left the group successfully", [5]);
      setIsLoading(false);
    } catch (err) {
      message.error("Something went wrong", [5]);
      setIsLoading(false);
    }
  };
  return (
    <>
      <FormModal
        isModalOpen={isLeaveModalOpen}
        setIsModalOpen={setIsLeaveModalOpen}
        title="Admins"
      >
        <Form
          className="pt-[50px] pb-[10px]"
          layout="vertical"
          onFinish={makeAdminSubmitHandler}
        >
          <FormSelect
            name="chw"
            label="Select an admin"
            rules={FormRule.SELECT}
            placeholder="Select an admin"
            options={selectOptions}
          />
          <ModalSubmitButton
            label="Make Admin"
            loading={isLoading}
            className="mt-0"
          />
        </Form>
      </FormModal>
    </>
  );
}

export default LeaveGroupChat;
