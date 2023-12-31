import React, { useEffect, useState, useRef } from "react";
import {
  EditOutlined,
  LoadingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useTranslation } from "react-i18next";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import TeamMemberModal from "../../components/TeamMemberModal/TeamMemberModal";
import { listCommunityHealthWorkers } from "../../shared/api/communityHealthWorker";
import PrognosTable from "../../shared/components/Table/PrognosTable";
import { AdminSelectOptions } from "../../shared/enum/selectOptions";
import { listAdmins } from "../../shared/api/admin";
import Spinner from "../../shared/components/Spinner/Spinner";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import { checkUserStatus } from "../../shared/utils";

const TeamManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [rowId, setRowId] = useState("");
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = (record) => {
    setLoading(true);
    setRowId({ ...record });
    setVisible(true);
    setLoading(false);
  };
  const Columns = [
    {
      title: t("firstName"),
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      width: 150,
      ...getColumnSearchProps("firstName"),
    },
    {
      title: t("lastName"),
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      width: 150,
      ...getColumnSearchProps("lastName"),
    },
    {
      title: t("email"),
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: t("phoneNumber"),
      dataIndex: "phoneNumber",
    },
    {
      title: t("role"),
      dataIndex: "role",
    },
    {
      title: t("status"),
      dataIndex: "status",
    },
    {
      title:
        group?.includes("Admin") || group?.includes("SuperAdmin")
          ? t("action")
          : null,
      key: "action",
      render: (_, record) =>
        group?.includes("Admin") || group?.includes("SuperAdmin") ? (
          <Button
            style={{ color: "#1890ff", border: "solid 0px" }}
            onClick={() => handleEditClick(record)}
          >
            {loading && rowId.key === record.id ? (
              <LoadingOutlined />
            ) : (
              <EditOutlined />
            )}
          </Button>
        ) : null,
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
      // if one of the call fails, fail everything.
      const response = await Promise.all([
        await listAdmins(),
        await listCommunityHealthWorkers(),
      ]);

      // Merge two arrays
      const data = [...response[0], ...response[1]].map((res) => ({
        ...res,
        key: res.id,
      }));

      // Sorting merged arrays
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setDataSource(sortedData);
    } catch (err) {
      throw Error(err.errors[0].message);
    }
  };

  return (
    <div className="flex gap-[32px] flex-column h-full">
      {group?.includes("Admin") || group?.includes("SuperAdmin") ? (
        <div className="flex justify-end">
          <Button
            onClick={handleClick}
            className="text-white bg-primaryColor h-[38px]"
          >
            {t("teamMemberInvite")}
          </Button>
        </div>
      ) : null}
      <div className="flex items-center justify-center">
        <TeamMemberModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Invite Team Member"}
          options={AdminSelectOptions.ROLE}
          createDynamoUserOnly={false}
          fetchUserDetails={getUserDetails}
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
        />
      </div>
    </div>
  );
};

export default TeamManagement;
