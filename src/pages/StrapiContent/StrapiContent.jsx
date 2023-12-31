import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  getContentList,
  getGenderList,
  getLanguageList,
  getRaceData,
  getStageList,
} from "../../shared/api/strapi";
import StrapiContentTable from "./StrapiContentTable";
import ContentFilterModal from "../../components/ContentFilterModal/ContentFilterModal";
import { darkColorSpinner } from "../../shared/constant/tailwindConstants";
import Spinner from "../../shared/components/Spinner/Spinner";
import { filterContent } from "../../shared/utils/strapi";
import { checkUserStatus } from "../../shared/utils";

const StrapiContent = () => {
  const [content, setContent] = useState(null);
  const [stages, setStages] = useState([]);
  const [gender, setGender] = useState([]);
  const [language, setLanguage] = useState([]);
  const [race, setRace] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 100,
      showSizeChanger: false,
    },
  });
  const [modalValues, setModalValues] = useState({
    stage: null,
    language: null,
    race: null,
    gender: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await checkUserStatus();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // Check if local storage has filter values
      const filteredData = JSON.parse(localStorage.getItem("filterValues"));
      setModalValues(filteredData);
      if (filteredData) {
        const { contentData, pagination } = await filterContent(
          filteredData,
          tableParams.pagination,
        );
        setTableParams({
          pagination: {
            ...tableParams.pagination,
            total: pagination.total,
          },
        });
        setContent(contentData);
        setFilterApplied(true);
      } else {
        const { contentData, pagination } = await getContentList(
          tableParams.pagination,
        );

        setTableParams({
          pagination: {
            ...tableParams.pagination,
            total: pagination.total,
          },
        });
        setContent(contentData);
      }
      const stageList = await getStageList();
      const genderList = await getGenderList();
      const languageList = await getLanguageList();
      const raceData = await getRaceData();
      setStages(stageList);
      setGender(genderList);
      setLanguage(languageList);
      setRace(raceData);
    })();
  }, [JSON.stringify(tableParams)]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleViewClick = (record) => {
    navigate(`/strapi-content-details/${record.id}`);
  };

  const onClickHandler = async () => {
    setModalValues({
      stage: null,
      language: null,
      race: null,
      gender: null,
    });
    const { contentData, pagination } = await getContentList(
      tableParams.pagination,
    );
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: pagination.total,
      },
    });
    setContent(contentData);
    // Store clear filter values in local storage
    window.localStorage.setItem("filterValues", JSON.stringify(null));
    setFilterApplied(false);
  };

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setContent([]);
    }
  };

  const getRowNumber = (index) =>
    (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
    index +
    1;

  const columns = [
    {
      title: "Sr. No.",
      width: 100,
      render: (text, record, index) => getRowNumber(index),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      render: (stage) => {
        const tagColor = "cyan";
        if (stage?.length > 2) {
          const menu = [];
          stage.slice(2).forEach((element, index) => {
            menu.push({
              key: index,
              label: (
                <Tag color={tagColor} key={element}>
                  {element}
                </Tag>
              ),
            });
          });
          return (
            <>
              <Tag color={tagColor} key={stage[0]}>
                {stage[0]}
              </Tag>
              <Tag color={tagColor} key={stage[1]}>
                {stage[1]}
              </Tag>
              <Dropdown menu={{ items: menu }}>
                <a>
                  More <DownOutlined />
                </a>
              </Dropdown>
            </>
          );
        }
        if (stage?.length <= 2) {
          return (
            <>
              {stage.map((val) => (
                <Tag color={tagColor} key={val}>
                  {val}
                </Tag>
              ))}
            </>
          );
        }
      },
    },
    {
      title: "Race/Ethnicity",
      dataIndex: "race",
    },
    {
      title: "Language",
      dataIndex: "language",
      width: 150,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ color: "white", background: "#777777", borderRadius: 100 }}
          onClick={() => handleViewClick(record)}
        >
          View
        </Button>
      ),
    },
  ];
  return (
    <div className="flex gap-[32px] flex-column">
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleClick}
          className="text-white bg-primaryColor h-[38px]"
        >
          Filter Content
        </Button>
        {filterApplied && (
          <span
            onClick={onClickHandler}
            className="text-primaryColor cursor-pointer"
          >
            Clear X
          </span>
        )}
      </div>
      <ContentFilterModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        title={"Filter Content"}
        stages={stages}
        gender={gender}
        language={language}
        race={race}
        tableParams={tableParams}
        setTableParams={setTableParams}
        setContent={setContent}
        setFilterApplied={setFilterApplied}
        setModalValues={setModalValues}
        modalValues={modalValues}
      />
      {content ? (
        <StrapiContentTable
          columns={columns}
          dataSource={content}
          pagination={tableParams.pagination}
          changeHandler={handleTableChange}
        />
      ) : (
        <div className="flex items-center justify-center">
          <Spinner className={darkColorSpinner} />
        </div>
      )}
    </div>
  );
};

export default StrapiContent;
