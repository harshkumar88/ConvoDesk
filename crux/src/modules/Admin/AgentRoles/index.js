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
  let [query, setQuery] = useState("");
  const context = { query, setQuery, data };
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
      <Navbar
        groups={groups}
        roles={data.roles}
        allAgents={data.agents}
        context={context}
      />

      <div className="item-row-container">
        {data.agents.length > 0 ? (
          query ? (
            data.agents
              .filter((item) =>
                item?.name.toLowerCase().includes(query.toLowerCase())
              )
              .map((item, idx) => (
                <Agent
                  data={item}
                  allRoles={data.roles}
                  key={idx}
                  supervisorData={data.agents}
                />
              ))
          ) : (
            data.agents.map((item, idx) => (
              <Agent
                data={item}
                allRoles={data.roles}
                key={idx}
                supervisorData={data.agents}
              />
            ))
          )
        ) : (
          <h1 style={{ textAlign: "center", margin: "1vh auto" }}>
            No Agents found in last
          </h1>
        )}
        {/* {data.agents.map(function (item, idx) {
          return <Agent data={item} allRoles={data.roles} key={idx} />;
        })} */}
      </div>
    </>
  );
}

export default AgentRoles;
