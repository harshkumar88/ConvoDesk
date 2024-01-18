import React, { Suspense, useContext, useEffect } from "react";
import Alert from "../../../components/Alert";
import { AppContext } from "../../../App";
import { isAgentLoggedIn } from "../../../ReactLib/auth";
import { Navigate, Outlet } from "react-router-dom";
import WorkFlowHeader from "../../../components/WorkFlowHeader";

function WorkFlowRoute() {
  const appContext = useContext(AppContext);

  return isAgentLoggedIn() ? (
    <div className="teams_height">
      <WorkFlowHeader />
      <Suspense
        fallback={
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        }
      >
        <div className="route_height">
          <Outlet />
        </div>
      </Suspense>
      <Alert
        className={appContext.alert_class}
        response={appContext.response}
        setClass={appContext.setClass}
      />
    </div>
  ) : (
    <Navigate to="/validate" replace={true} />
  );
}

export default WorkFlowRoute;
