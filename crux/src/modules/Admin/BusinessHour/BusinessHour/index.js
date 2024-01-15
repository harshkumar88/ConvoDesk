import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";

import BusinessHour from "./components/BusinessHour";
import { get_data, post_data } from "../../../../ReactLib/networkhandler";
import { NavLink } from "react-router-dom";

function BusinessHours(props) {
  const appContext = useContext(AppContext);
  let [data, setData] = useState([]);
  useEffect(
    function () {
      appContext.setTitle("Business Hour");
      get_data(`${API_URL}/crux/business/hours/v1/`).then(function (data) {
        if (data) {
          setData(data.data);
        }
      });
    },
    [appContext.reload]
  );
  return (
    <>
      <div className="btn-container">
        <NavLink className="btn" to="/create/business-hour">
          Create Business Hour
        </NavLink>
      </div>
      <div className="item-row-container">
        {data.map(function (item, idx) {
          return <BusinessHour data={item} />;
        })}
      </div>
    </>
  );
}

export default BusinessHours;
