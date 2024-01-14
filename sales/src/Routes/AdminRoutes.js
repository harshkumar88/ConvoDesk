import React, { Suspense, useContext, useEffect } from "react";
import Alert from "../components/Alert";
import { AppContext } from "../App";
import { isAgentLoggedIn } from "../auth";
import AdminDrawer from "../components/AdminDrawer";
import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader/Header";
import Drawer from "../components/Drawer";

function AdminRoutes() {
  const appContext = useContext(AppContext);
  useEffect(function () {
    delete localStorage["partner-id"];
  }, []);

  return isAgentLoggedIn() ? (
    <>
      <Drawer className="col_1" />
      <div className={appContext.drawer ? "col_4" : "col_2"}>
        <Suspense
          fallback={
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
        >
          <AdminHeader />
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
    <Navigate to="/validate" replace={true} />
  );
}

export default AdminRoutes;
