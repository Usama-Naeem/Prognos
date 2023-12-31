// TODO Need to fix countries-states-cities-service package right now it's impacting build
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { Cities } from "countries-states-cities-service";
import FormModal from "../../shared/components/FormModal/FormModal";
import SimpleButton from "../../shared/components/SimpleButton/SimpleButton";
import ModalInput from "../../shared/components/ModalInput/ModalInput";
import { FormRule } from "../../shared/enum/formRules";
import ChatTable from "./ChatTable";
import FormSelect from "../../shared/components/FormSelect/FormSelect";
import ModalSubmitButton from "../../shared/components/ModalSubmitButton/ModalSubmitButton";
import {
  RaceSelectOptions,
  LanguageSelectOptions,
  Age,
} from "../../shared/enum/selectOptions";
import { addGroupConversation } from "../../shared/store/slices/groupConversation";
import { listCommunityHealthWorkers } from "../../shared/api/communityHealthWorker";
import { filteredListCaregivers } from "../../shared/api/caregiver";
import { filteredListPatients } from "../../shared/api/patient";
import { listAdmins, getSuperAdminDetails } from "../../shared/api/admin";
import AuthContext from "../../shared/context/AuthContext";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import { resetGroupMessage } from "../../shared/store/slices/groupMessage";
import { getStageList } from "../../shared/api/strapi";
import { AgeOptionsFilter, checkUserStatus } from "../../shared/utils";
import { GroupType } from "../../shared/enum/roles";
import { allCities } from "../../shared/constant/citiesList";

function ChatGroupsView() {
  const [openModal, setIsModalOpen] = React.useState(false);
  const { isLoading: loading } = useSelector(
    (state) => state.groupConversation,
  );

  const { userDynamo } = useContext(AuthContext);
  const { groupId } = useSelector((state) => state.groupMessages);

  const dispatch = useDispatch();
  const [CHWListing, setCHWListing] = useState([]);
  const [CHWDropDownOptions, setCHWDropDownOptions] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    getCHWListing();
    getStages();
    getAdmins();
    getSuperAdmins();

    (async () => {
      await checkUserStatus();
    })();
  }, []);

  useEffect(() => {
    if (groupId) {
      dispatch(resetGroupMessage());
    }
  }, [groupId]);

  const getCitiesList = useMemo(() => {
    const citiesList = allCities;
    const citiesSelectData = citiesList.map((city, index) => ({
      value: city.name.toLowerCase(),
      label: city.name,
      key: index,
    }));
    return citiesSelectData;
  }, []);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const getStages = async () => {
    const stageList = await getStageList();
    setStages(stageList);
  };

  // Get CHW
  const getCHWListing = async () => {
    const chwListing = await listCommunityHealthWorkers();
    const chwDropDownOptions = chwListing.map((chw) => ({
      value: chw.id,
      label: `${chw.firstName} ${chw.lastName}`,
    }));
    setCHWListing(chwListing);
    setCHWDropDownOptions(chwDropDownOptions);
  };

  // Getting Admin
  const getAdmins = async () => {
    const adminList = await listAdmins();
    setAdmins(adminList);
  };

  // getting super admins
  const getSuperAdmins = async () => {
    const adminList = await getSuperAdminDetails();
    setAdmins((prev) => [...prev, ...adminList]);
  };

  // Get Name,Email  of CHW
  const getCHWNameAndEmail = (id) => {
    const CHW = CHWListing.find((chw) => chw.id === id);
    return {
      firstName: CHW.firstName,
      lastName: CHW.lastName,
      email: CHW.email,
      role: CHW.role,
    };
  };

  // ADD new Conversation
  const submitHandler = async (values) => {
    setIsLoading(true);
    const { groupName, language, race, age, stage, groupDescription } = values;
    let lowerLimit;
    let upperLimit;

    if (stage === 1) {
      lowerLimit = 0;
      upperLimit = 15;
    }
    if (stage === 2) {
      lowerLimit = 31;
      upperLimit = 60;
    }
    if (stage === 3) {
      lowerLimit = 61;
      upperLimit = 90;
    }
    if (stage === 4) {
      lowerLimit = 91;
      upperLimit = 120;
    }
    if (stage === 5) {
      lowerLimit = 121;
      upperLimit = 180;
    }

    const chw =
      userDynamo.role === GroupType.COMMUNITY_HEALTH_WORKER
        ? userDynamo.id
        : values.chw;
    const { firstName, lastName, email, role } = getCHWNameAndEmail(chw);

    const assignedCHW = {
      id: chw,
      firstName,
      lastName,
      email,
      role,
    };

    const particpantPatientList = await filteredListPatients(
      race,
      language,
      AgeOptionsFilter[age],
      lowerLimit,
      upperLimit,
    );

    const participantCareGiverList = await filteredListCaregivers(
      race,
      language,
      AgeOptionsFilter[age],
      lowerLimit,
      upperLimit,
    );
    const participantCHWList = CHWListing.filter(
      (worker) => worker.id !== chw,
    ).map((worker) => ({
      id: worker.id,
      firstName: worker.firstName,
      lastName: worker.lastName,
      email: worker.email,
      phoneNumber: worker.phoneNumber,
      role: worker.role,
    }));

    const participantAdminList = admins.map((admin) => ({
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      role: admin.role,
    }));

    const data = {
      groupName,
      groupDescription,
      workerName: `${firstName} ${lastName}`,
      adminList: [...participantAdminList, assignedCHW],
      patientCaregiverList: [
        ...particpantPatientList,
        ...participantCareGiverList,
      ],
      participantCHWList,
    };
    dispatch(addGroupConversation(data));
    setIsModalOpen(false);
    setIsLoading(false);
  };
  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner className={darkColorSpinner} />
      </div>
    );
  return (
    <div>
      <div className="flex flex-col justify-center gap-4">
        <SimpleButton
          onClick={openModalHandler}
          label="create new"
          className="bg-primaryColor hover:!bg-primaryColor hover:opacity-90 ml-auto "
        />

        {/* Table View */}
        <ChatTable />
      </div>

      <FormModal
        isModalOpen={openModal}
        setIsModalOpen={setIsModalOpen}
        title="Create New Group"
      >
        <div className="pt-[40px] pb-[20px]">
          <Form layout="vertical" onFinish={submitHandler}>
            {/* group name */}
            <ModalInput
              name="groupName"
              placeholder="Enter Group Name"
              label="Group Name"
              rules={FormRule.GROUP_NAME}
            />
            {/* Description */}
            <ModalInput
              name="groupDescription"
              placeholder="Enter Group Description"
              label="Group Description"
              rules={FormRule.GROUP_DESCRIPTION}
            />
            {/* city */}
            <FormSelect
              name="city"
              label="City Name"
              placeholder="Select Your City"
              showSearch={true}
              options={getCitiesList}
              rules={FormRule.CITY_NOT_REQUIRED}
            />
            {/* zip code */}
            <ModalInput
              name="zipcode"
              placeholder="Enter Zip Code"
              label="Zip Code"
              rules={FormRule.ZIPCODE_NOT_REQUIRED}
            />
            {/* race */}
            <FormSelect
              name="race"
              label="Race / Ethnicity"
              placeholder="Select Race / Ethnicity"
              options={RaceSelectOptions.RACE}
              rules={FormRule.RACE_NOT_REQUIRED}
            />
            {/* language */}
            <FormSelect
              name="language"
              label="Language"
              placeholder="Select Language"
              options={LanguageSelectOptions.LANGUAGES}
              rules={FormRule.CHAT_RACE}
            />
            {/* Age */}
            <FormSelect
              name="age"
              label="Age Group"
              placeholder="Select Age Group"
              options={Age.AGE}
              rules={FormRule.AGE_NOT_REQUIRED}
            />
            {/* Stage */}
            <FormSelect
              name="stage"
              label="Stage"
              placeholder="Select Stage"
              options={stages}
              rules={FormRule.STAGE}
            />
            {/* CHW */}
            {userDynamo.role !== GroupType.COMMUNITY_HEALTH_WORKER && (
              <FormSelect
                name="chw"
                label="Assign Health Worker"
                placeholder="Select Health Worker"
                rules={FormRule.CHAT_CHW}
                options={CHWDropDownOptions}
              />
            )}
            <ModalSubmitButton label="Create Chat" loading={isLoading} />
          </Form>
        </div>
      </FormModal>
    </div>
  );
}

export default ChatGroupsView;
