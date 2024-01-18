import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../App";
import Header from "../components/Header/Header";
import { API_URL } from "../config";
import { get_data } from "../ReactLib/networkhandler";
import SwitchHeader from "../ReactLib/SwitchHeader";

function HeaderRoutes(props) {
  const appContext = useContext(AppContext);

  useEffect(function () {
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

  return (
    <>
      <SwitchHeader />
      <Header />
      <Outlet />
    </>
  );
}

export default HeaderRoutes;
