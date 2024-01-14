import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { get_data } from "../../../networkHandler";
import Agent from "./components/Agent";
import Navbar from "./components/Navbar";

function AgentRoles(props) {
  const appContext = useContext(AppContext);
  let [data, setData] = useState({});
  let [loader, setLoader] = useState(true);
  let [groups, setGroups] = useState([]);
  useEffect(
    function () {
      appContext.setTitle("Agents");
      get_data(`${API_URL}/crux/users/agent/role/v1/`, appContext).then(
        function (data) {
          setData(data);
          setLoader(false);
        }
      );
      get_data(`${API_URL}/crux/group/v1/`, appContext).then(function (data) {
        setGroups(data.data);
      });
    },
    [appContext.reload]
  );
  return loader ? (
    <></>
  ) : (
    <>
      <Navbar groups={groups} roles={data.roles} allAgents={data.agents} />
      <div className="item-row-container">
        {data.agents.map(function (item, idx) {
          return <Agent data={item} allRoles={data.roles} key={idx} />;
        })}
      </div>
    </>
  );
}

export default AgentRoles;
