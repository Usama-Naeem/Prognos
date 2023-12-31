import React, { useContext, useState } from "react";
import { Form, message } from "antd";
import { UserOutlined, MailOutlined, MobileOutlined } from "@ant-design/icons";
import { API } from "aws-amplify";
import {
  addToCognitoGroup,
  addPatientOrCaregiverToCognitoGroup,
  createCognitoUser,
  createPatientOrCaregiverInCognito,
  createDynamoUser,
  deleteAdminFromCognito,
} from "../../shared/api/teamMemberInvite";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import ModalInput from "../../shared/components/ModalInput/ModalInput";
import { FormRule } from "../../shared/enum/formRules";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import FormModal from "../../shared/components/FormModal/FormModal";
import AuthContext from "../../shared/context/AuthContext";
import { USER_EXIST } from "../../shared/constant/error";
import { EmailTemplates } from "../../shared/enum/email";
import { emailOrPhoneExist } from "../../shared/api/assessment";
import PhoneNumberInput from "../../shared/components/PhoneNumberInput/PhoneNumberInput";
import ModalNameInput from "../../shared/components/ModalInput/ModalNameInput";
import { randomStrings } from "../../shared/utils";
import { INVITED_USER } from "../../shared/constant/pageRoutes";

function TeamMemberModal({
  isModalOpen,
  setIsModalOpen,
  title,
  options,
  createDynamoUserOnly,
  fetchUserDetails,
  role,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const userPoolId = user?.pool?.userPoolId;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: role,
  });

  const onChangeHandler = (event) => {
    // update form state
    setFormValues((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onSelectHandler = (event) => {
    setFormValues((prev) => ({
      ...prev,
      role: event,
    }));
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    try {
      const exist = await emailOrPhoneExist({
        email: formValues.email.toLowerCase(),
        phoneNumber: formValues.phoneNumber,
      });
      if (exist) {
        message.error("Email or phone number already exists", [5]);
        setIsLoading(false);
        return;
      }

      // if one of the call fails, fail everything. Just like the a transaction process
      if (createDynamoUserOnly) {
        const dynamoUser = await createDynamoUser(formValues);
        await Promise.all([
          await createPatientOrCaregiverInCognito(formValues, userPoolId),
          await addPatientOrCaregiverToCognitoGroup(formValues, userPoolId),
        ]);
        const assessmentUrl = `${window.location.origin}/assessment/new?role=${formValues.role}&userID=${dynamoUser.id}&firstName=${formValues.firstName}&lastName=${formValues.lastName}&email=${formValues.email}&phone=${formValues.phoneNumber}`;

        // Lambda function to send invitation email.
        await API.post("apiEmailTransporter", "/sendEmail", {
          body: {
            toAddress: [formValues.email.toLowerCase()],
            fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
            templateName: EmailTemplates.INVITATION,
            templateData: {
              name: `${formValues.firstName} ${formValues.lastName}`,
              link: assessmentUrl,
            },
          },
        });
      } else {
        const temporaryPassword = randomStrings();
        formValues.temporaryPassword = temporaryPassword;
        const registerURL = `${window.location.origin}${INVITED_USER}?email=${formValues.email}`;
        await Promise.all([
          await createCognitoUser(formValues, userPoolId),
          await addToCognitoGroup(formValues, userPoolId),
          await createDynamoUser(formValues),
        ]);
        if (values.role === "Admin") {
          // Lambda function to send invitation email.
          await API.post("apiEmailTransporter", "/sendEmail", {
            body: {
              toAddress: formValues.email,
              fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
              templateName: EmailTemplates.ADMIN_INVITATION_TEMPLATE,
              templateData: {
                name: `${formValues.firstName} ${formValues.lastName}`,
                email: formValues.email,
                link: registerURL,
                password: temporaryPassword,
              },
            },
          });
        } else {
          // Lambda function to send invitation email.
          await API.post("apiEmailTransporter", "/sendEmail", {
            body: {
              toAddress: formValues.email,
              fromAddress: process.env.REACT_APP_SES_SENDER_EMAIL,
              templateName: EmailTemplates.CHW_INVITATION_TEMPLATE,
              templateData: {
                name: `${formValues.firstName} ${formValues.lastName}`,
                email: formValues.email,
                link: registerURL,
                password: temporaryPassword,
              },
            },
          });
        }
      }
      message.success("Invitation has been successfully sent", [3]);
      setIsLoading(false);
      setIsModalOpen(false);
      setPhoneNumber(null);
      await fetchUserDetails();
    } catch (err) {
      // if the exception is not UsernameExistsException
      if (!err.message.toLowerCase().includes(USER_EXIST.toLowerCase())) {
        deleteAdminFromCognito(values, userPoolId);
      }
      message.error(err.message, [4]);
      setIsLoading(false);
    }
  };
  return (
    <>
      <FormModal
        title={title}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div className="pt-[40px] pb-[20px]">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <ModalNameInput
              label="First Name"
              name="firstName"
              placeholder="Enter you first name"
              icon={<UserOutlined />}
              onChange={onChangeHandler}
              className="rounded-2xl"
            />
            <ModalNameInput
              label="Last Name"
              name="lastName"
              placeholder="Enter you last name"
              icon={<UserOutlined />}
              onChange={onChangeHandler}
              className="rounded-2xl"
            />
            <ModalInput
              label="Email"
              rules={FormRule.EMAIL}
              type="email"
              name="email"
              placeholder="abc@xyz.com"
              icon={<MailOutlined />}
              className="rounded-2xl"
              onChange={onChangeHandler}
            />
            <Form.Item
              label="Phone Number"
              type="text"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number!",
                },
                {
                  min: 10,
                  message: "The phone number must have 10 digits!",
                },
              ]}
            >
              <PhoneNumberInput
                value={phoneNumber}
                placeholder="(222) 222-2222"
                icon={<MobileOutlined />}
                onChange={(newPhoneNumber) => setPhoneNumber(newPhoneNumber)}
                setFormState={setFormValues}
                className="rounded-2xl"
                maxLength={10}
              />
            </Form.Item>
            {!createDynamoUserOnly ? (
              <FormSelect
                name="role"
                label="Role"
                rules={FormRule.SELECT}
                options={options}
                placeholder="Please select a role"
                handleChange={onSelectHandler}
              />
            ) : null}

            <ModalSubmitButton loading={isLoading} label="Invite" />
          </Form>
        </div>
      </FormModal>
    </>
  );
}

export default TeamMemberModal;
