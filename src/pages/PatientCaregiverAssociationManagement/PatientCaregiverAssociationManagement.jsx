import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useTranslation } from "react-i18next";
import {
  fetchAllAssignedCaregivers,
  listCareGiverToPatients,
} from "../../shared/api/patient";

import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import {
  fetchcareGiverToPatientDetails,
  updateTableIndex,
} from "../../shared/utils";
import DeleteUserModal from "../../components/DeleteUserModal/DeleteUserModal";
import { GroupType } from "../../shared/enum/roles";

const PatientCaregiverAssociationManagement = () => {
  const [dataSource, setDataSource] = useState(null);
  const [careGiversName, setCareGiversName] = useState(null);
  const [rowId, setRowId] = useState("");
  const [filteredArray, setFilteredArray] = useState("");
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [group, setGroup] = useState([]);
  const handleEditClick = async (record) => {
    setRowId({ ...record });
    // fetch all assigned caregivers
    const fetchCaregivers = await fetchAllAssignedCaregivers(
      record.key,
      filteredArray,
    );
    const options = [];
    fetchCaregivers.map((el) =>
      options.push({
        label: `${el.prognosCaregivers.firstName} ${el.prognosCaregivers.lastName}`,
        value: el.prognosCaregivers.id,
      }),
    );
    setCareGiversName(options);
    setVisible(true);
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
      title:
        group?.includes("Admin") || group?.includes("SuperAdmin")
          ? "Action"
          : null,
      key: "action",
      render: (_, record) =>
        record.role === GroupType.PATIENT &&
        (group?.includes("SuperAdmin") || group?.includes("Admin")) ? (
          <Button
            style={{ color: "#1890ff", border: "solid 0px" }}
            onClick={() => handleEditClick(record)}
          >
            <EditOutlined />
          </Button>
        ) : null,
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
      setFilteredArray(await listCareGiverToPatients());
      // get all users from join table and store all assigned caregivers in patient object childrens
      response.forEach((item, index) => {
        if (!result[item.prognosPatientsId]) {
          result[item.prognosPatientsId] = fetchcareGiverToPatientDetails(item);
        } else {
          const updatedTableIndex = updateTableIndex(item, index);
          result[item.prognosPatientsId].children.push(updatedTableIndex);
        }
      });
      const data = Object.values(result).map((item) => ({
        ...item,
      }));
      const sortedData = data
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDataSource(sortedData);
    } catch (err) {
      throw Error(err);
    }
  };
  return (
    <div className="flex gap-[32px] flex-column h-full">
      <div className="flex items-center justify-center">
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
        <DeleteUserModal
          isModalOpen={visible}
          setIsModalOpen={setVisible}
          rowId={rowId}
          isEdit={true}
          fetchUserDetails={getUserDetails}
          currentUserGroup={group}
          careGivers={careGiversName}
        />
      </div>
    </div>
  );
};
export default PatientCaregiverAssociationManagement;
