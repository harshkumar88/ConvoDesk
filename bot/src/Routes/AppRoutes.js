import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../modules/Home";
import Webhook from "../modules/Webhook";
import PrivateRoutes from "./PrivateRoutes";
import Create from "../modules/Webhook/pages/Create";
import Update from "../modules/Webhook/pages/Update";
import Login from "../modules/Login";
import Validate from "../modules/Validate";
import Logout from "../modules/Logout";
import Conversation from "../modules/Conversation/Listing";
import ConversationDetails from "../modules/Conversation/Activity";
import ConversationRoutes from "./ConversationRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/validate" element={<Validate />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to={"/home"} replace={true} />} />
        <Route path="/home" element={<Home />} />{" "}
        <Route path="/webhook" element={<Webhook />} />
        <Route path="/webhook/create" element={<Create />} />
        <Route path="/webhook/update/:webhookId" element={<Update />} />
      </Route>
      <Route path="/" element={<ConversationRoutes />}>
        <Route path="/conversation" element={<Conversation />} />
        <Route
          path="/conversation/activity/:id"
          element={<ConversationDetails />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
