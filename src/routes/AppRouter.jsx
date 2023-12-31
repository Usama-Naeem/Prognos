import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ADMIN_SIGNIN,
  DASHBOARD,
  NOT_EXIST,
  FORM_BUILDER,
  SIGNUP,
  ASSESSMENT_FORM,
  INVITED_USER,
  ASSESSMENT_RESULT_ROUTE,
  STAGE_FORM,
  STAGE_RESULT,
  MOBILE_LINK_SIGNIN,
  STATIC_RESULT_ROUTE,
} from "../shared/constant/pageRoutes";
import Dashboard from "../pages/Dashboard/Dashboard";
import Page404 from "../pages/Page404/Page404";
import PrivateRoute from "./PrivateRoute";
import PersistedRoutes from "./PersistedRoute";
import CustomBuilder from "../components/FormBuilder/FormBuilder";
import AdminSignin from "../pages/AdminSignin/AdminSignin";
import HealthWorkerSignup from "../pages/CommunityHealthWorkerSignup/HealthWorkerSignup";
import Assessment from "../pages/Assessment/Assessment";
import Stage from "../pages/Stage/Stage";
import StageResult from "../pages/StageResult/StageResult";
import InvitedUser from "../pages/InvitedUser/InvitedUser";
import AssessmentResult from "../pages/AssessmentResult/AssessmentResult";
import MobileLinkSignin from "../pages/MobileLinkSignin/MobileLinkSignin";
import { chatStore } from "../shared/store/chatStore";
import StaticResultView from "../components/AssessmentResultView/StaticResultView";

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <Routes>
        {/* Persisted Routes  */}
        <Route element={<PersistedRoutes />}>
          <Route path={ADMIN_SIGNIN} element={<AdminSignin />} />
          <Route path={FORM_BUILDER} element={<CustomBuilder />} />
          <Route path={SIGNUP} element={<HealthWorkerSignup />} />
        </Route>

        {/* Protected Routes */}
        <Route
          path={DASHBOARD}
          element={
            <PrivateRoute>
              <Provider store={chatStore}>
                <Dashboard />
              </Provider>
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path={ASSESSMENT_FORM} element={<Assessment />} />
        <Route path={ASSESSMENT_RESULT_ROUTE} element={<AssessmentResult />} />
        <Route path={STATIC_RESULT_ROUTE} element={<StaticResultView />} />
        <Route path={STAGE_FORM} element={<Stage />} />
        <Route path={STAGE_RESULT} element={<StageResult />} />
        <Route path={MOBILE_LINK_SIGNIN} element={<MobileLinkSignin />} />
        <Route path={INVITED_USER} element={<InvitedUser />} />
        <Route path={NOT_EXIST} element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default AppRouter;
