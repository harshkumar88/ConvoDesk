import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { get_data } from "../../networkHandler";
import { API_URL } from "../../config";
import Agent from "./components/Agent";
import Navbar from "./components/Navbar";

function SmartAssign() {
  const [agents, setAgents] = useState([]);
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [query, setQuery] = useState("");
  const context = { query, setQuery, agents };
  useEffect(
    function () {
      appContext.setTitle(`Smart Assign`);
      get_data(`${API_URL}/crux/users/smart/assign/v1/`, appContext, 1).then(
        function (data) {
          if (data) {
            setAgents(data.data);
            setLoader(false);
            appContext.setTitle(`Smart Assign (${data.active_agents})`);
          }
        }
      );

      appContext.setPage("smart assign");
    },
    [appContext.reload]
  );
  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div>
      {" "}
      <Navbar context={context} />
      {agents.length > 0 ? (
        query ? (
          agents
            .filter(
              (item) =>
                item?.name.toLowerCase().includes(query.toLowerCase()) ||
                item?.email.toLowerCase().includes(query.toLowerCase())
            )
            .map((item, idx) => <Agent item={item} key={idx} />)
        ) : (
          agents.map((item, idx) => <Agent item={item} key={idx} />)
        )
      ) : (
        <h1 style={{ textAlign: "center", margin: "1vh auto" }}>
          No Agents found in last
        </h1>
      )}
    </div>
  );
}

export default SmartAssign;
