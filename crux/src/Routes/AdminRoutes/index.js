import React, { Suspense, useContext, useEffect } from "react";
import Alert from "../../components/Alert";
import { AppContext } from "../../App";
import { isAgentLoggedIn } from "../../ReactLib/auth";
import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader/Header";
import Drawer from "../../components/Drawer";
import { get_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";

function AdminRoutes() {
  const appContext = useContext(AppContext);
  useEffect(function () {
    appContext.setPage("admin");
    delete localStorage["partner-id"];
    get_filters();
  }, []);

  function get_filters() {
    get_data(`${API_URL}/crux/ticket/filters/v1/`, appContext).then(function (
      data
    ) {
      let tempData = {};
      let filterData = data.data;
      filterData.map(function (item, idx) {
        if (item["key"] == "issue") {
          let temp = {};
          item.choices.map(function (issue, index) {
            temp[issue.label] = issue.value;
          });
          appContext.setRef(temp, "issue");
        }
        tempData[item["key"]] = item;
      });
      appContext.setFilters(tempData);
    });
  }

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
