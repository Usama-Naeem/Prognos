import React, { useEffect, useState, useRef } from "react";
import {
  EditOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import { listPrognosUserAnswers } from "../../graphql/queries";
import {
  fetchConfirmedCHW,
  listAllChwPatients,
} from "../../shared/api/communityHealthWorker";
import { getUserAnswersByEmailOrId } from "../../shared/api/filter";
import { fetchAllAssignedChw, listPatients } from "../../shared/api/patient";
import Spinner from "../../shared/components/Spinner/Spinner";
import PrognosTable from "../../shared/components/Table/PrognosTable";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import { GroupType } from "../../shared/enum/roles";
import TeamMemberModal from "../../components/TeamMemberModal/TeamMemberModal";
import { UserSelectOptions } from "../../shared/enum/selectOptions";
import { sortDate } from "../../shared/enum/race";
import { LanguageType } from "../../shared/enum/language";
import {
  ASSESSMENT_FORM_IDENTIFIER,
  STAGE_FORM_IDENTIFIER,
} from "../../shared/constant";
import { checkUserStatus } from "../../shared/utils";

const PatientManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [chw, setChw] = useState(null);
  const [chwName, setChwName] = useState("");
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rowId, setRowId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [group, setGroup] = useState([]);
  const [stagging, setStagging] = useState([]);
  const [screenning, setScreening] = useState([]);
  const [assignedCHWPatients, setAssignedCHWPatients] = useState([]);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="text-white bg-primaryColor hover:!bg-primaryColor flex items-center"
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (dropDownVisible) => {
      if (dropDownVisible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleEditClick = async (record) => {
    const temp = { key: record.id, ...record };
    setRowId({ ...temp });
    setIsLoading(true);

    // Fetch UserAnswers from Database again user email
    const { key } = temp;
    const details = await getUserAnswersByEmailOrId(
      key,
      listPrognosUserAnswers,
    );

    const filteredStagging = details
      ?.filter((answer) => answer.keyIdentifier === STAGE_FORM_IDENTIFIER)
      ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    setStagging(filteredStagging.length ? filteredStagging : []);

    const filteredScreening = details
      ?.filter((answer) => answer.keyIdentifier === ASSESSMENT_FORM_IDENTIFIER)
      ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
    setScreening(filteredScreening.length ? filteredScreening : []);

    // if userPhoneNumber is null means caregiver filled patient assessment and we have to fetch patientPhoneNumber
    const patientNumber = details[0]?.patientPhoneNumber;
    // if userPhoneNumber is not null means patient filled his assessment and we have to fetch userPhoneNumber
    const phoneNumber = details[0]?.userPhoneNumber;
    if (patientNumber !== null) {
      // if caregiver fill patient assessment
      setUserPhoneNumber(patientNumber);
    } else {
      // if patient fill his assessment
      setUserPhoneNumber(phoneNumber);
    }

    // fetch all assigned chw
    const fetchchw = await fetchAllAssignedChw(temp.key);
    const assignedMembers = fetchchw.map((el) => (
      <div
        key={el.prognosCHW.id}
        className="flex items-center justify-center text-center bg-gray-100 rounded-xl m-1 p-1"
      >
        {`${el.prognosCHW.firstName} ${el.prognosCHW.lastName}`}
      </div>
    ));
    setChwName(assignedMembers);
    const chwList = await fetchConfirmedCHW();
    setChw(chwList);
    // If current User group is chw, and check is current patient assigned to chw
    const currentGroup = JSON.parse(localStorage.getItem("currentGroup"));
    if (currentGroup?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
      const dynamoId = JSON.parse(
        localStorage.getItem("CommunityHealthWorkerDynamoId"),
      );
      const assignedPatientsToChw = await listAllChwPatients(dynamoId);
      const response = assignedPatientsToChw.filter(
        (item) => item?.prognosPatientsId === temp.key,
      )[0];
      response !== undefined ? setDisabled(false) : setDisabled(true);
    } else {
      setDisabled(false);
    }
    setVisible(true);
    setIsLoading(false);
  };
  const Columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",

      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "10%",

      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone Number",
      width: "10%",
      dataIndex: "phoneNumber",
    },
    {
      title: "Language",
      dataIndex: "language",
      width: 150,
    },
    {
      title: "Race",
      dataIndex: "race",
      width: "10%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
    },
    {
      title: "Subscription",
      dataIndex: "appStoreSubscriptionTier",
      width: "10%",
      render: (_, record) => {
        let subscriptionLabel;

        if (
          record?.currentPlatform === "iOS" &&
          (record?.appStoreSubscriptionStatus === "3" ||
            record?.appStoreSubscriptionStatus === "4" ||
            record?.appStoreSubscriptionStatus === "5" ||
            record?.appStoreSubscriptionStatus === "2")
        ) {
          subscriptionLabel = "Cancelled";
        } else if (
          record?.currentPlatform === "Android" &&
          (record?.playStoreSubscriptionStatus === "3" ||
            record?.playStoreSubscriptionStatus === "4" ||
            record?.playStoreSubscriptionStatus === "5" ||
            record?.playStoreSubscriptionStatus === "2")
        ) {
          subscriptionLabel = "Cancelled";
        } else if (
          (record?.currentPlatform === "Android" &&
            record?.playStoreSubscriptionTier === "com.prognosus.app.tier1") ||
          (record?.currentPlatform === "iOS" &&
            record?.appStoreSubscriptionTier === "com.prognosus.app.tier1")
        ) {
          subscriptionLabel = "Tier 1";
        } else if (
          (record?.currentPlatform === "Android" &&
            record?.playStoreSubscriptionTier === "com.prognosus.app.tier2") ||
          (record?.currentPlatform === "iOS" &&
            record?.appStoreSubscriptionTier === "com.prognosus.app.tier2")
        ) {
          subscriptionLabel = "Tier 2";
        } else if (
          !record?.playStoreSubscriptionTier ||
          !record?.appStoreSubscriptionTier
        ) {
          subscriptionLabel = "Free";
        }
        return (
          <span
            className={`text-black text-sm ${
              subscriptionLabel === "Tier 1" ? "bg-gray " : ""
            }py-1 px-2 rounded-md`}
          >
            {subscriptionLabel}
          </span>
        );
      },
    },
    {
      title:
        group?.includes(GroupType.ADMIN) ||
        group?.includes(GroupType.SUPER_ADMIN) ||
        group?.includes(GroupType.COMMUNITY_HEALTH_WORKER)
          ? "Action"
          : null,
      key: "action",
      width: "10%",
      // eslint-disable-next-line
      render: (_, record) => {
        if (
          group?.includes(GroupType.ADMIN) ||
          group?.includes(GroupType.SUPER_ADMIN)
        ) {
          return (
            <Button
              style={{ color: "#1890ff", border: "solid 0px" }}
              onClick={() => handleEditClick(record)}
            >
              {isLoading && rowId.key === record.id ? (
                <LoadingOutlined />
              ) : (
                <EditOutlined />
              )}
            </Button>
          );
        }

        if (group?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
          const isAssigned = assignedCHWPatients.filter(
            (patient) => patient.prognosPatientsId === record.id,
          );
          if (isAssigned.length > 0) {
            return (
              <Button
                style={{ color: "#1890ff", border: "solid 0px" }}
                onClick={() => handleEditClick(record)}
              >
                {isLoading && rowId.key === record.id ? (
                  <LoadingOutlined />
                ) : (
                  <EditOutlined />
                )}
              </Button>
            );
          }
        }
      },
    },
  ];

  // Fetching data from dynamo
  useEffect(() => {
    (async () => {
      await getUserDetails();
      await checkUserStatus();
    })();
    // Find group for Action process
    setGroup(JSON.parse(localStorage.getItem("currentGroup")));
  }, []);
  const getUserDetails = async () => {
    try {
      const response = await listPatients();
      // Modify database gender, language and race for frontend
      const modifiedPatientData = response.map((patientDetails) => ({
        ...patientDetails,
        language: LanguageType[patientDetails.language],
        DOB: sortDate(patientDetails.DOB),
      }));

      const currentGroup = JSON.parse(localStorage.getItem("currentGroup"));
      if (currentGroup?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
        const dynamoId = JSON.parse(
          localStorage.getItem("CommunityHealthWorkerDynamoId"),
        );
        const assignedPatientsToChw = await listAllChwPatients(dynamoId);
        setAssignedCHWPatients(assignedPatientsToChw);
      }

      setDataSource(modifiedPatientData);
    } catch (error) {
      throw Error(error.errors[0].message);
    }
  };

  return (
    <div className="flex gap-[32px] flex-column h-full">
      <div className="flex justify-end">
        <Button
          onClick={handleClick}
          className="text-white bg-primaryColor h-[38px]"
        >
          Invite Patient
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <TeamMemberModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Invite Patient"}
          options={UserSelectOptions.ROLE}
          createDynamoUserOnly={true}
          fetchUserDetails={getUserDetails}
          role={GroupType.PATIENT}
        />
        {dataSource ? (
          <PrognosTable columns={Columns} dataSource={dataSource} />
        ) : (
          <div className="flex items-center justify-center">
            <Spinner className={darkColorSpinner} />
          </div>
        )}
        <EditUserModal
          currentUserGroup={group}
          isModalOpen={visible}
          setIsModalOpen={setVisible}
          rowId={rowId}
          fetchUserDetails={getUserDetails}
          isEdit={true}
          options={chw}
          show={disabled}
          userPhoneNumber={userPhoneNumber}
          name={chwName}
          stagging={stagging}
          screenning={screenning}
        />
      </div>
    </div>
  );
};

export default PatientManagement;
