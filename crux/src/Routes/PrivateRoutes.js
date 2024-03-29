import React, { useContext } from "react";
import Alert from "../components/Alert";
import Drawer from "../components/Drawer";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../App";
import { isAgentLoggedIn, isPartnerLoggedIn } from "../ReactLib/auth";
import { Suspense } from "react";
import Header from "../ReactLib/SwitchHeader";

function PrivateRoutes() {
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
export default PrivateRoutes;
