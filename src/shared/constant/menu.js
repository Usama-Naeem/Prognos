import React from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChatIcon from "@mui/icons-material/Chat";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import "./Menu.css";
import {
  TEAM_MANAGEMENT,
  CHAT,
  MY_PROFILE,
  STRAPI_CONTENT,
} from "./DashboardRoutes";
import { userManagementItems } from "../utils";

export const SIDEBARMENU = [
  {
    key: 1,
    label: "Team Management",
    route: TEAM_MANAGEMENT,
    icon: <GroupsIcon className="sidebarIcons" />,
    id: "sidebar",
  },
  {
    key: 2,
    label: "User Management",
    children: userManagementItems,
    icon: <PersonIcon className="sidebarIcons" />,
    id: "sidebar",
  },
  {
    key: 3,
    label: "Assessment",
    children: [],
    icon: <BarChartIcon className="sidebarIcons" />,
    id: "sidebar",
  },
  {
    key: 4,
    label: "Chat",
    route: CHAT,
    icon: <ChatIcon className="sidebarIcons" />,
  },
  {
    key: 5,
    label: (
      <a
        href={process.env.REACT_APP_STRAPI_ADMIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        Content Management
      </a>
    ),
    icon: <OpenInNewIcon className="sidebarIcons" />,
    id: "sidebar",
  },
  {
    key: 6,
    label: "View Content",
    route: STRAPI_CONTENT,
    icon: <SubscriptionsIcon className="sidebarIcons" />,
  },
  {
    key: 7,
    label: "My Profile",
    route: MY_PROFILE,
    icon: <PersonPinIcon className="sidebarIcons" />,
    id: "sidebar",
  },
];
