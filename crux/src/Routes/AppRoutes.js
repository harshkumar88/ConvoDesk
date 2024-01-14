import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HeaderRoutes from "./HeaderRoutes";
import Login from "../modules/Login/index";
import PrivateRoutes from "./PrivateRoutes";
import Validate from "../modules/Validate";
import Logout from "../modules/Logout";
import TicketDetails from "../modules/TicketDetails";
import Automation from "../modules/Admin/Automation";
import Group from "../modules/Admin/Group";
import RTM from "../modules/RTM";
import Articles from "../modules/Articles/Articles";
import ArticleDetails from "../modules/Articles/ArticleDetails";
import NewArticle from "../modules/Articles/NewArticle";
import EditArticle from "../modules/Articles/EditArticle";
import CannedResponses from "../modules/CannedResponses/CannedResponses";
import EditCannedResponse from "../modules/CannedResponses/EditCannedResponse";
import NewCannedResponse from "../modules/CannedResponses/NewCannedResponse";
import BusinessHour from "../modules/Admin/BusinessHour/BusinessHour";
import CreateTicket from "../modules/CreateTicket";
import SmartAssign from "../modules/SmartAssign";
import EditBusinessHour from "../modules/Admin/BusinessHour/EditBusinessHour";
import NewBusinessHour from "../modules/Admin/BusinessHour/NewBusinessHour";
import AgentRoles from "../modules/Admin/AgentRoles";
import User from "../modules/Admin/User/User";
import UserDetails from "../modules/Admin/User/UserDetails";
import AdminRoutes from "./AdminRoutes";
import Disposition from "../modules/Admin/Disposition";
import Merge from "../modules/TicketDetails/components/Merge";
import AgentStatus from "../modules/Admin/AgentStatus";

import SupervisorDashboard from "../modules/SupervisorDashboard";
import AgentDashboard from "../modules/AgentDashboard";
import AgentTicketDetails from "../modules/AgentTicketDetails";
import RiskDashboard from "../modules/RiskDashboard";
import AutomationDashboard from "../modules/AutomationDashboard";
import NewRule from "../modules/AutomationDashboard/NewRule";
import EditRule from "../modules/AutomationDashboard/EditRule";
import TicketDashboard from "../modules/TicketDashboard";
import AIResponse from "../modules/AIResponses";

const Home = lazy(() => import("../modules/Tickets"));

// import Payment from "../modules/Payment";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/validate" element={<Validate />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<HeaderRoutes />}>
          <Route path="/" element={<Navigate to={"/home"} replace={true} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/group" element={<Group />} />
          <Route path="/rtm" element={<RTM />} />
          <Route
            path="/agent/dashboard/:agent_id"
            element={<AgentDashboard />}
          />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          <Route
            path="/agent/ticket/details/:a_id"
            element={<AgentTicketDetails />}
          />
          <Route path="/risk/dashboard" element={<RiskDashboard />} />
          <Route
            path="/automation/dashboard"
            element={<AutomationDashboard />}
          />{" "}
          <Route path="/ticket/dashboard" element={<TicketDashboard />} />{" "}
          <Route path="/automation/newrule/:type" element={<NewRule />} />
          <Route path="/automation/editrule/:id/:type" element={<EditRule />} />
          <Route
            path="/supervisor/dashboard"
            element={<SupervisorDashboard />}
          />
          <Route path="/articles" element={<Articles />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route
            path="/article/details/:article_id"
            element={<ArticleDetails />}
          />
          <Route path="/article/edit/:article_id" element={<EditArticle />} />
          <Route path="/article/new" element={<NewArticle />} />
          <Route path="/canned/response" element={<CannedResponses />} />
          <Route
            path="/canned/response/edit/:canned_response_id"
            element={<EditCannedResponse />}
          />
          <Route path="/canned/response/new" element={<NewCannedResponse />} />
          <Route path="/ai/response" element={<AIResponse />} />
          <Route path="/smart-assign" element={<SmartAssign />} />
          <Route
            path="/ticket/details/:ticket_id"
            element={<TicketDetails />}
          />
          <Route path="/*" element={<Navigate to={"/home"} replace={true} />} />
        </Route>
      </Route>

      <Route path="/" element={<AdminRoutes />}>
        <Route
          path="/admin"
          element={<Navigate to={"/agents"} replace={true} />}
        />
        <Route path="/business-hour" element={<BusinessHour />} />
        <Route path="create/business-hour/" element={<NewBusinessHour />} />
        <Route
          path="/business-hour/:business_hour_id"
          element={<EditBusinessHour />}
        />
        <Route path="/users" element={<User />} />
        <Route path="/user/details/:user_id" element={<UserDetails />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/agents" element={<AgentRoles />} />
        <Route path="/disposition" element={<Disposition />} />
        <Route path="/agents/status" element={<AgentStatus />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;