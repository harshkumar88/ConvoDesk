import React, { Suspense, useContext, useEffect } from "react";
import Alert from "../components/Alert";
import { AppContext } from "../App";
import { isAgentLoggedIn } from "../ReactLib/auth";
import AdminDrawer from "../components/AdminDrawer";
import { Navigate, Outlet } from "react-router-dom";
import styles from "../ReactLib/common.module.css";

function AdminPanelRoutes() {
  const appContext = useContext(AppContext);

  return isAgentLoggedIn() ? (
    <div className={styles.admin_panel_flex}>
      {/* <Drawer className="col_1" /> */}
      <AdminDrawer className={styles.admin_col_1} />
      <div className={styles.admin_col_4}>
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
    </div>
  ) : (
    <Navigate to="/validate" replace={true} />
  );
}

export default AdminPanelRoutes;
