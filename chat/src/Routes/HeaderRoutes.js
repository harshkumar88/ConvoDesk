import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../App";
// import Header from "../components/Header/Header";
import { API_URL } from "../config";
import { get_data } from "../networkHandler";

function HeaderRoutes(props) {
  const appContext = useContext(AppContext);

  useEffect(function () {
    getCannedResponses();
    getFilters();
  }, []);
  function getCannedResponses() {
    get_data(
      `${API_URL}/crux/canned/response/v1/?ecosystem=2`,
      appContext
    ).then(function (data) {
      if (data) {
        appContext.setCannedResponses(data.data);
      }
    });
  }

  function getFilters() {
    get_data(`${API_URL}/crux/ticket/filters/v1/`, appContext).then(function (
      data
    ) {
      if (data) {
        let tempData = {};
        data.data.map(function (item, idx) {
          tempData[item["key"]] = item;
        });
        const agentArray = data.data[1].choices;
        const agentDict = agentArray.reduce((dict, item) => {
          dict[item.value] = item.label;
          return dict;
        }, {});
        appContext.setAgentDict(agentDict);
        appContext.setFilters(tempData);
      }
    });
  }
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
}

export default HeaderRoutes;
