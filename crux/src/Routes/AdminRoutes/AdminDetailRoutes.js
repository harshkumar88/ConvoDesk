import React, { Suspense, useContext } from "react";
import Alert from "../../components/Alert";
import { AppContext } from "../../App";
import { isAgentLoggedIn } from "../../ReactLib/auth";
import { Navigate, Outlet } from "react-router-dom";

function AdminDetailRoutes() {
  const appContext = useContext(AppContext);

  return isAgentLoggedIn() ? (
    <div>
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
  ) : (
    <Navigate to="/validate" replace={true} />
  );
}

export default AdminDetailRoutes;
