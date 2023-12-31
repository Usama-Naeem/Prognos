import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import TeamMemberModal from "../../components/TeamMemberModal/TeamMemberModal";
import { UserSelectOptions } from "../../shared/enum/selectOptions";
import {
  fetchAllAssignedChw,
  listCareGiverToPatients,
  listPatients,
} from "../../shared/api/patient";
import {
  fetchConfirmedCHW,
  listAllChwPatients,
} from "../../shared/api/communityHealthWorker";
import { GroupType } from "../../shared/enum/roles";
import { getUserByEmailFromUserAnswers } from "../../shared/api/filter";
import { listPrognosUserAnswers } from "../../graphql/queries";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import {
  fetchcareGiverToPatientDetails,
  updateTableIndex,
} from "../../shared/utils";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [rowId, setRowId] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [chwName, setChwName] = useState("");
  const [assessmentDate, setAssessmentDate] = useState("");
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [chw, setChw] = useState(null);
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(null);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleEditClick = async (record) => {
    setRowId({ ...record });
    // Fetch UserAnswers from Database again user email
    setLoading(true);
    const userEmail = record?.email;
    const details = await getUserByEmailFromUserAnswers(
      userEmail,
      listPrognosUserAnswers,
    );
    setAnswerId(details?.data?.listPrognosUserAnswers?.items[0]?.id);
    setUserPhoneNumber(
      details?.data?.listPrognosUserAnswers?.items[0]?.userPhoneNumber,
    );
    const date = new Date(
      details?.data?.listPrognosUserAnswers?.items[0]?.createdAt,
    );
    setAssessmentDate(date.toLocaleDateString("en-US").replaceAll("/", "-"));
    // fetch all assigned chw
    const fetchchw = await fetchAllAssignedChw(record.key);
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
        (item) => item?.prognosPatientsId === record.key,
      )[0];
      response !== undefined ? setDisabled(false) : setDisabled(true);
    } else {
      setDisabled(false);
    }
    setVisible(true);
    setLoading(false);
  };
  const columns = [
    {
      title: "Patient FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Patient LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Patient Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Patient Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Caregiver FirstName",
      dataIndex: "caregiverFirstName",
      key: "caregiverFirstName",
    },
    {
      title: "Caregiver LastName",
      dataIndex: "caregiverLastName",
      key: "caregiverLastName",
    },
    {
      title: "Caregiver Phone Number",
      dataIndex: "caregiverPhoneNumber",
      key: "caregiverPhoneNumber",
    },
    {
      title: "Caregiver Status",
      dataIndex: "caregiverStatus",
      key: "caregiverStatus",
    },
    {
      title: t("Assigned CHW"),
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ color: "#1890ff", border: "solid 0px" }}
          onClick={() => handleEditClick(record)}
        >
          {loading && rowId.key === record.key ? (
            <LoadingOutlined />
          ) : (
            <EditOutlined />
          )}
        </Button>
      ),
    },
  ];
  // Fetching data from dynamo
  useEffect(() => {
    (async () => {
      await getUserDetails();
    })();
    // Find group for Action process
    setGroup(JSON.parse(localStorage.getItem("currentGroup")));
  }, []);

  const getUserDetails = async () => {
    const result = [];
    try {
      const response = await listCareGiverToPatients();
      // get all users from join table and store all assigned caregivers in patient object childrens
      response.forEach((item, index) => {
        if (!result[item.prognosPatientsId]) {
          result[item.prognosPatientsId] = fetchcareGiverToPatientDetails(item);
        } else {
          const respond = updateTableIndex(item, index);
          result[item.prognosPatientsId].children.push(respond);
        }
      });
      const data = Object.values(result).map((item) => ({
        ...item,
      }));
      // get all patients from patient table and fetch all patients those not assigned to any caregiver
      const patientData = await listPatients();
      const transformed = patientData.map((item) => ({
        key: item.id,
        ...item,
      }));
      data.forEach((item) => {
        const joinId = item.key;
        // removed all matched patients so only unqiue record shown in table
        const index = transformed.findIndex((el) => joinId === el?.key);
        if (index !== -1) transformed.splice(index, 1);
      });
      const newArray = transformed;
      const joinData = data.concat(newArray);
      setDataSource(joinData);
    } catch (err) {
      throw Error(err);
    }
  };
  return (
    <div className="flex gap-[32px] flex-column h-full">
      <div className="flex justify-end">
        <Button
          onClick={handleClick}
          className="text-white bg-primaryColor h-[38px]"
        >
          {t("inviteUser")}
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <TeamMemberModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Invite User"}
          options={UserSelectOptions.ROLE}
          createDynamoUserOnly={true}
          fetchUserDetails={getUserDetails}
        />
        {dataSource ? (
          <Table
            columns={columns}
            dataSource={dataSource}
            className="w-full shadow-sm"
            pagination={{ pageSize: 8 }}
            scroll={{
              scrollToFirstRowOnChange: true,
              x: "max-content",
            }}
          />
        ) : (
          <div className="flex items-center justify-center">
            <Spinner className={darkColorSpinner} />
          </div>
        )}
        <EditUserModal
          isModalOpen={visible}
          setIsModalOpen={setVisible}
          rowId={rowId}
          isEdit={true}
          fetchUserDetails={getUserDetails}
          options={chw}
          currentUserGroup={group}
          show={disabled}
          loading={loading}
          answerId={answerId}
          userPhoneNumber={userPhoneNumber}
          assessmentDate={assessmentDate}
          name={chwName}
        />
      </div>
    </div>
  );
};

export default UserManagement;
