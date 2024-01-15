import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HeaderRoutes from "./HeaderRoutes";
import Login from "../modules/Login/index";
import PrivateRoutes from "./PrivateRoutes";
import Validate from "../modules/Validate";
import Logout from "../modules/Logout";
import AgentRoles from "../modules/Admin/AgentRoles";
import AdminRoutes from "./AdminRoutes";
import LeadDetails from "../modules/LeadDetails";
import Disposition from "../modules/Admin/Disposition";

const Home = lazy(() => import("../modules/Leads"));
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/validate" element={<Validate />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<HeaderRoutes />}>
          <Route path="/home" element={<Navigate to={"/"} replace={true} />} />
          <Route path="/" element={<Home />} />
          <Route path="/lead/details/:lead_id" element={<LeadDetails />} />
          <Route path="/*" element={<Navigate to={"/home"} replace={true} />} />
        </Route>
      </Route>

      <Route path="/" element={<AdminRoutes />}>
        <Route
          path="/admin"
          element={<Navigate to={"/agents"} replace={true} />}
        />
        <Route path="/disposition" element={<Disposition />} />
        <Route path="/agents" element={<AgentRoles />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
