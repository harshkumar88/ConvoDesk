import React, { Suspense, useContext } from "react";
import Alert from "../../../components/Alert";
import { AppContext } from "../../../App";
import { isAgentLoggedIn } from "../../../ReactLib/auth";
import { Navigate, Outlet } from "react-router-dom";
import TeamsHeader from "../../../components/TeamsHeader";

function TeamsRoute() {
  const appContext = useContext(AppContext);

  return isAgentLoggedIn() ? (
    <div className="teams_height">
      <TeamsHeader />
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

export default TeamsRoute;
