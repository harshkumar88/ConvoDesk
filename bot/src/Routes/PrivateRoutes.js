import React, { useContext, useEffect } from "react";
import Alert from "../components/Alert";
import Drawer from "../components/Drawer";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../App";
import { isAgentLoggedIn, isPartnerLoggedIn } from "../React-lib/src/auth";
import { Suspense } from "react";
import { get_data } from "../React-lib/src/networkhandler";
import { API_URL } from "../config";

function PrivateRoutes() {
  const appContext = useContext(AppContext);
  useEffect(
    function () {
      get_dialogues();
      get_properties();
      get_webhooks();
      get_flows();
      get_groups();
    },
    [appContext.reload]
  );
  function get_dialogues() {
    get_data(`${API_URL}/neon/dialogue/v1/`, appContext).then(function (data) {
      if (data) {
        appContext.setDialogues(data?.data);
      }
    });
  }
  function get_webhooks() {
    get_data(`${API_URL}/neon/webhook/v1/`, appContext).then(function (data) {
      if (data) {
        appContext.setWebhooks(data?.data);
      }
    });
  }
  function get_properties() {
    get_data(`${API_URL}/neon/property/v1/`, appContext).then(function (data) {
      if (data) {
        appContext.setProperties(data?.data);
      }
    });
  }
  function get_flows() {
    get_data(`${API_URL}/neon/flow/v1/?bot_id=1`, appContext).then(function (
      data
    ) {
      if (data) {
        appContext.setFlows(data?.data);
      }
    });
  }
  function get_groups() {
    get_data(`${API_URL}/crux/group/v1/?`, appContext).then(function (data) {
      if (data) {
        appContext.setGroups(data?.data);
      }
    });
  }
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
