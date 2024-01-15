import React, { useContext, useEffect } from "react";
import Alert from "../components/Alert";
import Drawer from "../components/Drawer";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../App";
import { isAgentLoggedIn } from "../ReactLib/auth";
import { Suspense } from "react";

function ConversationRoutes() {
  const appContext = useContext(AppContext);

  return isAgentLoggedIn() ? (
    <>
      <Drawer className="col_1" />
      <div className={"col_4"}>
        <Suspense
          fallback={
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
        <Alert
          className={appContext.alert_class}
          response={appContext.response}
          setClass={appContext.setClass}
        />
      </div>
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
export default ConversationRoutes;
