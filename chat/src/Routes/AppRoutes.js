import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import HeaderRoutes from "./HeaderRoutes";
import Login from "../modules/Login/index";
import PrivateRoutes from "./PrivateRoutes";
import Validate from "../modules/Validate";
import Logout from "../modules/Logout";
import Home from "../modules/Home";
import HeaderRoutes from "./HeaderRoutes";
import SmartAssign from "../modules/SmartAssign";
import Chat from "../modules/Home/components/Chat";
import ChatDetails from "../modules/Home/components/ChatDetails";
import EmptyChat from "../modules/Home/components/EmptyChat";
import RTM from "../modules/RTM";
import WhatsappTemplates from "../modules/WhatsappTemplates";
import Performance from "../modules/Performance";
// import Trial from "../modules/Trial";
// import AdminRoutes from "./AdminRoutes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/validate" element={<Validate />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<HeaderRoutes />}>
          <Route path="/home" element={<Navigate to={"/"} replace={true} />} />
          <Route
            path="/"
            element={<Navigate to={"/conversation/details"} replace={true} />}
          />

          <Route path="/conversation/details" element={<Home />}>
            <Route path="/conversation/details/" element={<EmptyChat />} />

            <Route
              path="/conversation/details/:conversation_id"
              element={<ChatDetails />}
            />
          </Route>
          <Route path="/whatsapp/templates" element={<WhatsappTemplates />} />
          <Route path="/rtm" element={<RTM />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/smart-assign" element={<SmartAssign />} />

          {/* <Route path="/group" element={<Group />} /> */}
          <Route path="/*" element={<Navigate to={"/home"} replace={true} />} />
        </Route>
      </Route>

      {/* <Route path="/" element={<AdminRoutes />}>
        <Route
          path="/admin"
          element={<Navigate to={"/agents"} replace={true} />}
        />
      </Route> */}
    </Routes>
  );
}

export default AppRoutes;
