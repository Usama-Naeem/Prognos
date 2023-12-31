import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  TEAM_MANAGEMENT,
  ASSESSMENT,
  CHAT,
  CHAT_GROUP,
  MY_PROFILE,
  QUESTIONNAIRE,
  STRAPI_CONTENT,
  STRAPI_CONTENT_DETAILS,
  PATIENTS,
  CAREGIVERS,
  PATIENT_CAREGIVER_ASSOCIATION,
  FREQUENCY,
} from "../shared/constant/DashboardRoutes";
import TeamManagement from "../pages/TeamManagement/TeamManagement";
import Assessment from "../pages/Assessment/Assessment";
import Chat from "../pages/Chat/Chat";
import MyProfile from "../pages/MyProfile/MyProfile";
import Questionnaire from "../pages/Questionnaire/Questionnaire";
import StrapiContent from "../pages/StrapiContent/StrapiContent";
import StrapiContentDetails from "../pages/StrapiContentDetails/StrapiContentDetails";
import Conversation from "../pages/Chat/Conversation";
import PatientManagement from "../pages/PatientManagement/PatientManagement";
import CaregiverManagement from "../pages/CaregiverManagement/CaregiverManagement";
import PatientCaregiverAssociationManagement from "../pages/PatientCaregiverAssociationManagement/PatientCaregiverAssociationManagement";
import Page404 from "../pages/Page404/Page404";
import { NOT_EXIST } from "../shared/constant/pageRoutes";
import StagingFrequency from "../components/StagingFrequency/StagingFrequency";

const DashboardRouter = () => (
  <Routes>
    {/* Protected Routes */}
    <Route path={TEAM_MANAGEMENT} element={<TeamManagement />} />
    <Route path={PATIENTS} element={<PatientManagement />} />
    <Route path={CAREGIVERS} element={<CaregiverManagement />} />
    {/* <Route
      path={PATIENT_CAREGIVER_ASSOCIATION}
      element={<PatientCaregiverAssociationManagement />}
    /> */}

    <Route path={ASSESSMENT} element={<Assessment />} />
    <Route path={QUESTIONNAIRE} element={<Questionnaire />} />
    <Route path={CHAT} element={<Chat />} />
    <Route path={FREQUENCY} element={<StagingFrequency />} />
    <Route path={CHAT_GROUP} element={<Conversation />} />
    <Route path={MY_PROFILE} element={<MyProfile />} />
    <Route path={STRAPI_CONTENT} element={<StrapiContent />} />
    <Route path={STRAPI_CONTENT_DETAILS} element={<StrapiContentDetails />} />
    <Route index element={<Navigate to={TEAM_MANAGEMENT} replace={true} />} />
    <Route path={NOT_EXIST} element={<Page404 />} />
  </Routes>
);

export default DashboardRouter;
