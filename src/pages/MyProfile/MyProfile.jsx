import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, message, Upload } from "antd";
import { Storage } from "aws-amplify";
import React, { useContext, useEffect, useState } from "react";
import ChangePasswordModal from "../../components/ChangePasswordModal/ChangePasswordModal";
import {
  updatePrognosAdmin,
  updatePrognosCHW,
  updatePrognosSuperAdmin,
} from "../../graphql/mutations";
import {
  listPrognosAdmins,
  listPrognosCHWS,
  listPrognosSuperAdmins,
} from "../../graphql/queries";
import {
  createPrognosAddress,
  updatePrognosAddress,
} from "../../shared/api/address";
import { fetchDataFromStorageOnUpdate } from "../../shared/api/admin";
import { updateUser } from "../../shared/api/filter";
import FormInput from "../../shared/components/FormInput/FormInput";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import SimpleButton from "../../shared/components/SimpleButton/SimpleButton";
import { acceptUploads } from "../../shared/constant/formConstatnt";
import AuthContext from "../../shared/context/AuthContext";
import { FormRule } from "../../shared/enum/formRules";
import { GroupType } from "../../shared/enum/roles";
import {
  LanguageSelectOptions,
  RaceSelectOptions,
} from "../../shared/enum/selectOptions";
import { checkUserStatus, getCurrentUserProfile } from "../../shared/utils";

function MyProfile() {
  const authContext = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [group, setGroup] = useState(null);
  let dynamoData = "";
  let addressId;
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data] = useState(authContext.userDynamo || {});

  useEffect(() => {
    (async () => {
      const userImage = await getCurrentUserProfile(data?.imageURL);
      setImage(userImage);
      await checkUserStatus();
    })();
    // fetch current user group from storage
    setGroup(JSON.parse(localStorage.getItem("currentGroup")));
  }, []);
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const defaultvalues = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    role: data?.role,
    race: data?.race,
    language: data?.language,
    city: data?.address?.city,
    address: data?.address?.address,
    state: data?.address?.state,
  };

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      if (data.addressId === null) {
        // create address if it's not exist
        addressId = await createPrognosAddress(values);
      } else {
        // update address if it's already exist
        await updatePrognosAddress(values, data.addressId);
      }
      const editUser = {
        id: data.id,
        race: values.race,
        language: values.language,
        addressId: addressId, // store addressId in user table
      };

      // Check usergroup and update user details accordingly
      if (group?.includes(GroupType.SUPER_ADMIN)) {
        await updateUser(editUser, updatePrognosSuperAdmin);
        dynamoData = await fetchDataFromStorageOnUpdate(
          data.email,
          listPrognosSuperAdmins,
          group,
        );
      } else if (group?.includes(GroupType.ADMIN)) {
        await updateUser(editUser, updatePrognosAdmin);
        dynamoData = await fetchDataFromStorageOnUpdate(
          data.email,
          listPrognosAdmins,
          group,
        );
      } else {
        await updateUser(editUser, updatePrognosCHW);
        dynamoData = await fetchDataFromStorageOnUpdate(
          data.email,
          listPrognosCHWS,
          group,
        );
      }
      message.success("Your details are successfully updated", [4]);
      // update user in auth
      authContext.setUserDynamo(dynamoData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error(err.message, [4]);
      throw Error(err.message);
    }
  };
  const props = {
    async customRequest({ file, onSuccess }) {
      const updatedFilename = `${Date.now()}_${file.name}`;
      try {
        const response = await Storage.put(updatedFilename, file);
        const editUserProfile = {
          id: data.id,
          imageURL: response?.key,
        };
        if (group?.includes(GroupType.SUPER_ADMIN)) {
          await updateUser(editUserProfile, updatePrognosSuperAdmin);
          dynamoData = await fetchDataFromStorageOnUpdate(
            data.email,
            listPrognosSuperAdmins,
            group,
          );
          const userImage = await getCurrentUserProfile(response?.key);
          setImage(userImage);
        } else if (group?.includes(GroupType.ADMIN)) {
          await updateUser(editUserProfile, updatePrognosAdmin);
          dynamoData = await fetchDataFromStorageOnUpdate(
            data.email,
            listPrognosAdmins,
            group,
          );
          const userImage = await getCurrentUserProfile(response?.key);
          setImage(userImage);
        } else {
          await updateUser(editUserProfile, updatePrognosCHW);
          dynamoData = await fetchDataFromStorageOnUpdate(
            data.email,
            listPrognosCHWS,
            group,
          );
          const userImage = await getCurrentUserProfile(response?.key);
          setImage(userImage);
        }
        onSuccess();
      } catch (error) {
        throw new Error(error);
      }
    },
  };
  return (
    <div className="bg-white w-[90vw] md:w-[80vw] lg:w-[65vw] flex-col py-6 gap-[16px] mx-auto">
      <div className="flex items-center justify-between mb-4 px-2 mx-4">
        <div className="flex flex-col gap-1">
          <Avatar size={80} src={image} icon={<UserOutlined />} />
          <Upload
            accept={acceptUploads["picture"]}
            maxCount={1}
            {...props}
            className="upload-button"
          >
            <Button className="w-full" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-2">
          <SimpleButton
            label={"Change Password"}
            onClick={handleClick}
            className="font-light md:font-medium font-sans text-center text-white !bg-subtleTextColor md:px-4"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ChangePasswordModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Change Password"}
        />
        <Form
          layout="vertical"
          onFinish={handleFormSubmit}
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 "
          initialValues={defaultvalues}
        >
          <FormInput
            name="firstName"
            label="First Name"
            type="text"
            rules={FormRule.NAME}
            placeholder="Enter Your First Name"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
            disabled={true}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            type="text"
            rules={FormRule.NAME}
            placeholder="Enter Your Last Name"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
            disabled={true}
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            rules={FormRule.EMAIL}
            placeholder="Enter Your Email"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
            disabled={true}
          />
          <FormInput
            name="phoneNumber"
            label="Phone Number"
            type="phone"
            rules={FormRule.PHONENUMBER}
            placeholder="+12345678"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
            disabled={true}
          />
          <FormInput
            name="role"
            label="Role"
            type="text"
            placeholder="Role"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
            disabled={true}
          />
          <FormSelect
            name="race"
            label="Race"
            rules={FormRule.RACE}
            options={RaceSelectOptions.RACE}
            placeholder="Please select a role"
          />
          <FormSelect
            name="language"
            label="Language Preferences"
            rules={FormRule.LANGUAGE}
            options={LanguageSelectOptions.LANGUAGES}
            placeholder="Language"
          />
          <FormInput
            name="city"
            label="City"
            type="text"
            placeholder="City"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
          />
          <FormInput
            name="address"
            label="Address"
            type="text"
            placeholder="Address"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
          />
          <FormInput
            name="state"
            label="State"
            type="text"
            placeholder="State"
            className="w-[255px] lg:w-[300px] h-[40px] rounded-lg"
          />
          <SimpleButton
            label={"Update"}
            className="font-light md:font-medium font-sans text-center text-white !bg-primaryColor col-span-1 md:col-span-2 mx-auto mt-4 w-[154px]"
            loading={loading}
          />
        </Form>
      </div>
    </div>
  );
}

export default MyProfile;
