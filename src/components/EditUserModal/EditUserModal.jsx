import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, message } from "antd";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import AuthContext from "../../shared/context/AuthContext";
import FormModal from "../../shared/components/FormModal/FormModal";
import ModalInput from "../../shared/components/ModalInput/ModalInput";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import { FormRule } from "../../shared/enum/formRules";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import {
  LanguageSelectOptions,
  RaceSelectOptions,
} from "../../shared/enum/selectOptions";
import MultiSelect from "../../shared/components/MultiSelect/MultiSelect";
import { GroupType } from "../../shared/enum/roles";
import SimpleButton from "../../shared/components/SimpleButton/SimpleButton";
import {
  enableSuspendedUser,
  handelEditUserModal,
  softDeleteDynamoUser,
  suspendUser,
} from "../../shared/utils";
import { deleteAdminFromCognito } from "../../shared/api/teamMemberInvite";
import TextAreaInput from "../../shared/components/TeaxtArea/TextAreaInput";
import { EmailTemplates } from "../../shared/enum/email";
import { STAGE_FORM_IDENTIFIER } from "../../shared/constant";
import { STAGE_RESULT_ROUTE } from "../../shared/constant/pageRoutes";

function EditUserModal({
  isModalOpen,
  setIsModalOpen,
  rowId,
  fetchUserDetails,
  isEdit,
  options,
  currentUserGroup,
  show,
  userPhoneNumber,
  name,
  stagging,
  screenning,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [enableLoading, setEnableLoading] = useState(false);
  const [suspendLoader, setSuspendLoader] = useState(false);
  const [deleteLoader, setdeleteLoader] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userPoolId = user?.pool?.userPoolId;
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedchw, setSelectedchw] = useState([]);
  const [unselectedchw, setUnselectedchw] = useState([]);

  const showSuspendModal = () => {
    setIsReasonModalOpen(true);
  };
  const showDeleteModal = async () => {
    setIsDeleteModalOpen(true);
  };
  // handel select and unselect chw
  const handleChange = (value) => {
    setSelectedchw((prevSelected) => [...prevSelected, value]);
    setUnselectedchw((prevUnselected) =>
      prevUnselected.filter((item) => item !== value),
    );
  };
  // Deselect chw if we wrongly select in multiselect
  const onDeSelect = (value) => {
    setUnselectedchw((prevUnselected) => [...prevUnselected, value]);
    setSelectedchw((prevSelected) =>
      prevSelected.filter((item) => item !== value),
    );
  };
  const handleFormSubmit = async () => {
    // Update User Details in Db
    setIsLoading(true);
    try {
      await handelEditUserModal(
        updatedUserValues,
        rowId,
        selectedchw,
        unselectedchw,
      );
      await fetchUserDetails();
      setUnselectedchw([]);
      setSelectedchw([]);
      setIsLoading(false);
      setIsModalOpen(false);
    } catch (err) {
      setUnselectedchw([]);
      setSelectedchw([]);
      setIsLoading(false);
      throw Error(err.errors[0].message);
    }
  };
  const disableUser = async (values) => {
    setSuspendLoader(true);
    const reason = values.reason;
    try {
      await suspendUser(rowId, userPoolId, reason);
      setIsReasonModalOpen(false);
      setSuspendLoader(false);
      await fetchUserDetails();
      setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);
      setIsReasonModalOpen(false);
      setSuspendLoader(false);
      message.error(err.message, [2]);
      throw Error(err.message);
    }
  };

  const enableUser = async () => {
    setEnableLoading(true);
    try {
      await enableSuspendedUser(rowId, userPoolId);
      await fetchUserDetails();
      setEnableLoading(false);
      setIsModalOpen(false);
    } catch (err) {
      setEnableLoading(false);
      message.error(err.message, [2]);
      throw Error(err.message);
    }
  };

  const softDeleteUser = async (values) => {
    setdeleteLoader(true);
    const reason = values.reason;
    try {
      await Promise.all([
        await API.post("apiEmailTransporter", "/sendEmail", {
          body: {
            toAddress: [rowId.email.toLowerCase()],
            fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
            templateName: EmailTemplates.DELETE,
            templateData: {
              name: `${rowId.firstName} ${rowId.lastName}`,
              reason: reason,
            },
          },
        }),

        await softDeleteDynamoUser(rowId.id, rowId.role),
        await deleteAdminFromCognito(rowId, userPoolId),
        await fetchUserDetails(),
        userPhoneNumber,
      ]);
      setdeleteLoader(false);
      setIsReasonModalOpen(false);
      setIsModalOpen(false);
    } catch (err) {
      setdeleteLoader(false);
      setIsReasonModalOpen(false);
      setIsModalOpen(false);
      message.error(err.message, [2]);
      throw Error(err.message);
    }
  };
  const values = {
    firstName: rowId?.firstName,
    lastName: rowId?.lastName,
    language: rowId?.language,
    race: rowId?.race,
    assignedTo: name,
  };

  const viewScore = (assesment) => {
    const data = JSON.parse(assesment.answers);
    if (assesment.keyIdentifier === STAGE_FORM_IDENTIFIER)
      navigate(STAGE_RESULT_ROUTE(assesment.id));
    else if (data.selectDementiaStage1)
      navigate(`/result/${assesment.id}/${data.assessmentFor}`);
    else
      navigate(`/assessment-result/${assesment.id}`, {
        state: {
          answers: { data: JSON.parse(assesment.answers) },
          userPhoneNumber,
        },
      });
  };

  const dateFormat = (date) =>
    new Date(date).toLocaleDateString("en-US").replaceAll("/", "-");
  const updatedUserValues = {};
  updatedUserValues.assignedTo = values.assignedTo;
  const handleFirstNameClick = (event) => {
    updatedUserValues.firstName = event.target.value;
  };
  const handleLastNameClick = (event) => {
    updatedUserValues.lastName = event.target.value;
  };
  const handleLanguageClick = (event) => {
    updatedUserValues.language = event;
  };
  const handleRaceClick = (event) => {
    updatedUserValues.race = event;
  };
  return (
    <>
      <FormModal
        title={
          isReasonModalOpen
            ? "Suspend User"
            : show
            ? "View User"
            : isDeleteModalOpen
            ? "Delete User"
            : "Edit User"
        }
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        setIsReasonModalOpen={setIsReasonModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setUnselectedchw={setUnselectedchw}
        setSelectedchw={setSelectedchw}
      >
        <div className="pt-[40px] pb-[20px]">
          {isReasonModalOpen ? (
            <Form layout="vertical" onFinish={disableUser}>
              <TextAreaInput
                name="reason"
                rules={FormRule.REASON}
                placeholder="Reason..."
                rows={4}
              />
              <ModalSubmitButton loading={suspendLoader} label="Suspend" />
            </Form>
          ) : isDeleteModalOpen ? (
            <Form layout="vertical" onFinish={softDeleteUser}>
              <TextAreaInput
                name="reason"
                rules={FormRule.REASON}
                placeholder="Reason..."
                rows={4}
              />
              <ModalSubmitButton loading={deleteLoader} label="Delete" />
            </Form>
          ) : (
            <Form
              layout="vertical"
              onFinish={handleFormSubmit}
              initialValues={values}
            >
              <ModalInput
                label={t("firstName")}
                rules={FormRule.FIRSTNAME}
                name="firstName"
                placeholder="Enter you first name"
                icon={<UserOutlined />}
                disabled={show}
                onChange={(e) => handleFirstNameClick(e)}
              />
              <ModalInput
                label={t("lastName")}
                rules={FormRule.LASTNAME}
                name="lastName"
                placeholder="Enter you last name"
                icon={<UserOutlined />}
                disabled={show}
                onChange={(e) => handleLastNameClick(e)}
              />
              <FormSelect
                label={t("language")}
                rules={FormRule.LANGUAGE}
                options={LanguageSelectOptions.LANGUAGES}
                name="language"
                placeholder="Enter your Language"
                icon={<MailOutlined />}
                disabled={show}
                handleChange={(e) => handleLanguageClick(e)}
              />
              <FormSelect
                label={t("race")}
                rules={FormRule.RACE}
                options={RaceSelectOptions.RACE}
                name="race"
                placeholder="Enter you race"
                icon={<MailOutlined />}
                disabled={show}
                handleChange={(e) => handleRaceClick(e)}
              />
              {/* Check if the current record have patient role and current signed in user is admin then show this multi select */}
              {(currentUserGroup === GroupType.SUPER_ADMIN ||
                currentUserGroup === GroupType.ADMIN) &&
              isEdit ? (
                <MultiSelect
                  name="assignedTo"
                  label="Assign CHW"
                  mode={"multiple"}
                  allowClear={true}
                  placeholder="Select Chw"
                  options={options}
                  rules={FormRule.CHW}
                  icon={<MailOutlined />}
                  onSelect={handleChange}
                  onDeselect={onDeSelect}
                />
              ) : null}
              {/* Answer id Not required ? */}
              {!show && stagging && stagging.length > 0 && (
                <Card
                  size="small"
                  title="Assessment Stagging"
                  headStyle={{
                    textAlign: "center",
                  }}
                >
                  <div className="flex justify-between items-center px-2">
                    <span>Assessment Date</span>
                    <span className="mr-2">Action</span>
                  </div>
                  {stagging.map((assessment) => (
                    <div
                      key={assessment?.id}
                      className="flex justify-between items-center px-2 mt-2"
                    >
                      <span>{dateFormat(assessment?.createdAt)}</span>
                      <SimpleButton
                        type="link"
                        onClick={() => viewScore(assessment)}
                        className="text-primaryColor !ml-2"
                        label="View"
                      />
                    </div>
                  ))}
                </Card>
              )}

              {!show && screenning && screenning.length > 0 && (
                <Card
                  size="small"
                  title="Assessment Screening"
                  headStyle={{
                    textAlign: "center",
                  }}
                  className="mt-2"
                >
                  <div className="flex justify-between items-center px-2">
                    <span>Assessment Date</span>
                    <span className="mr-2">Action</span>
                  </div>
                  {screenning.map((assessment) => (
                    <div
                      key={assessment?.id}
                      className="flex justify-between items-center px-2 mt-2"
                    >
                      <span>{dateFormat(assessment.createdAt)}</span>
                      <SimpleButton
                        type="link"
                        onClick={() => viewScore(assessment)}
                        className="text-primaryColor !ml-2"
                        label="View"
                      />
                    </div>
                  ))}
                </Card>
              )}

              {!show ? (
                <ModalSubmitButton loading={isLoading} label={t("update")} />
              ) : null}

              {/* Soft Delete Button */}
              <div className="flex justify-between">
                {currentUserGroup?.includes("Admin") ||
                currentUserGroup?.includes("SuperAdmin") ? (
                  <Button
                    className="w-36 md:w-44 text-white bg-darkColor mt-0 h-[40px] rounded-full font-medium"
                    onClick={showDeleteModal}
                  >
                    Remove
                  </Button>
                ) : null}
                {currentUserGroup?.includes("Admin") ||
                currentUserGroup?.includes("SuperAdmin") ? (
                  rowId.isSuspended ? (
                    <Button
                      className="w-36 md:w-44 text-white bg-darkColor mt-0 h-[40px] rounded-full font-medium"
                      onClick={enableUser}
                      loading={enableLoading}
                    >
                      Enable
                    </Button>
                  ) : (
                    <Button
                      className="w-36 md:w-44 text-white bg-darkColor mt-0 h-[40px] rounded-full font-medium"
                      onClick={showSuspendModal}
                      loading={suspendLoader}
                    >
                      Suspend
                    </Button>
                  )
                ) : null}
              </div>
            </Form>
          )}
        </div>
      </FormModal>
    </>
  );
}

export default EditUserModal;
