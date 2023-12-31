import React, { useState, useEffect } from "react";
import { Layout, Menu, Skeleton } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBARMENU } from "../../shared/constant/menu";
import "./Sidebar.css";
import {
  getAssessmentFormsList,
  getCurrentTabId,
  isMobileScreen,
  shouldSidebarOpen,
} from "../../shared/utils";
import { getQuestionnaireByOrder } from "../../shared/api/formBuilder";
import AssessmentModal from "../FormBuilder/AssessmentModal";
import { GroupType } from "../../shared/enum/roles";

const { Sider } = Layout;

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(shouldSidebarOpen());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarList, setSidebarList] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [isClose, setIsClose] = useState(true);
  // we need to hide sidebar on mobile by default
  // eslint-disable-next-line
  const [defaultSidebarOpen, setDefaultSidebarOpen] = useState(() =>
    isMobileScreen(),
  );
  const [prevAssessmentInfo, setPrevAssessmentInfo] = useState([]);
  const navigate = useNavigate();
  const group = JSON.parse(localStorage.getItem("currentGroup"));
  const location = useLocation();
  const selectedPath = location.pathname;
  let items;
  // let selectedMenu;
  // Remove Assesment and Content management from sidebar for community health worker
  if (group?.includes(GroupType.COMMUNITY_HEALTH_WORKER)) {
    items = SIDEBARMENU.filter((item) => item.key !== 3 && item.key !== 5) // remove items with key 3 and 5
      .map((item) => ({
        key: item.key,
        className: "py-2 ",
        icon: item.icon ? item.icon : "",
        label: item.label,
        route: item.route,
        children: item?.children,
      }));
  } else {
    items = SIDEBARMENU.map((item) => ({
      key: item.key,
      className: "py-2 ",
      icon: item.icon ? item.icon : "",
      label: item.label,
      route: item.route,
      children: item?.children,
    }));
  }
  const getSidebarItems = async () => {
    const questionnaireList = await getQuestionnaireByOrder();
    setPrevAssessmentInfo(questionnaireList);
    const assessmentFormsList = getAssessmentFormsList(
      questionnaireList,
      items,
    );
    setSidebarList(assessmentFormsList);
    setIsTrue(true);
  };

  useEffect(() => {}, [sidebarList]);
  useEffect(() => {
    getSidebarItems();
  }, []);
  const tabData = getCurrentTabId(selectedPath, sidebarList);
  const selectedTab = tabData;
  const selectedMenu = selectedTab?.key;
  // get the key for the selected path from items array
  const handleMenuClick = ({ item }) => {
    if (item?.props?.isNewForm) {
      setIsModalOpen(true);
    }
    isMobileScreen() ? setIsClose(true) : null;
    navigate(item.props.route);
  };

  const handleTrigger = () => {
    if (isMobileScreen()) {
      setIsClose(!isClose);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };
  return (
    <div>
      <AssessmentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        assessmentInfo={prevAssessmentInfo}
        id="item"
        items={items}
        setSidebarList={setSidebarList}
      />
      <Sider
        width={220}
        id="sidebar"
        collapsible
        collapsedWidth={isMobileScreen() ? 0 : 60}
        defaultCollapsed={defaultSidebarOpen}
        zeroWidthTriggerStyle={{
          color: "white",
          borderRadius: 0,
          background: "#09344D",
          top: "0",
          left: 0,
          // sidebar is closed on mobile by default
          // setting the width for mobile "50px" on close and "220px" on open
          // setting the reverse for screens bigger than 600px i.e(tabs and laptops etc.)
          width: sidebarOpen ? "220px" : "50px",
          borderTop: "1px solid white",
        }}
        onCollapse={handleTrigger}
        className="!h-[calc(100vh-60px)] absolute"
        collapsed={isMobileScreen() ? isClose : !sidebarOpen}
      >
        {isTrue ? (
          <Menu
            mode="inline"
            defaultSelectedKeys={[`${selectedMenu}`]}
            defaultOpenKeys={["sub1"]}
            className="h-full bg-darkColor py-[56px]"
            onClick={handleMenuClick}
            items={sidebarList}
          />
        ) : (
          <div className="mt-16 sidebar-skeleton">
            {Array(7)
              .fill()
              .map((_, i) => (
                <div className="pl-5 mt-3" key={i}>
                  <Skeleton
                    active
                    title={false}
                    paragraph={{
                      rows: 1,
                      width: "90%",
                    }}
                  />
                </div>
              ))}
          </div>
        )}
      </Sider>
    </div>
  );
};
export default Sidebar;
