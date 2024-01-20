import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import {
  get_data,
  get_data_Without_auth,
} from "../../../ReactLib/networkhandler";
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
      get_data(
        `https://qa1.crofarm.com/convo/users/agent/all/v1/`,
        appContext
      ).then(function (data) {
        if (data) {
          setData(data?.data);
          setLoader(false);
        }
      });
      get_data(
        `https://qa1.crofarm.com/convo/users/group/all/v1/`,
        appContext
      ).then(function (data) {
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
        allAgents={data}
        context={context}
      />

      <div className="item-row-container">
        {data?.length > 0 ? (
          query ? (
            data
              ?.filter((item) =>
                item?.name.toLowerCase().includes(query.toLowerCase())
              )
              .map((item, idx) => (
                <Agent
                  data={item}
                  allRoles={data.roles}
                  key={idx}
                  supervisorData={data}
                />
              ))
          ) : (
            data?.map((item, idx) => (
              <Agent
                data={item}
                allRoles={data.roles}
                key={idx}
                supervisorData={data}
              />
            ))
          )
        ) : (
          <h1 style={{ textAlign: "center", margin: "1vh auto" }}>
            No Agents found in last
          </h1>
        )}
      </div>
    </>
  );
}

export default AgentRoles;
