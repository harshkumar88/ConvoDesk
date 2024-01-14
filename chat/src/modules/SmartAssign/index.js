import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { get_data } from "../../networkHandler";
import { API_URL } from "../../config";
import Agent from "./components/Agent";
import styles from "./css/style.module.css";

function SmartAssign() {
  const [agents, setAgents] = useState([]);
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [query, setQuery] = useState("");

  useEffect(
    function () {
      appContext.setTitle("Smart Assign");
      get_data(`${API_URL}/neon/chat/smart/assign/v1/`, appContext, 1).then(
        function (data) {
          if (data) {
            setAgents(data?.data);
            setLoader(false);
          }
        }
      );
      appContext.setPage("smart assign");
    },
    [appContext.reload]
  );

  useEffect(
    function () {
      get_count();
    },
    [appContext.reload, agents]
  );
  function get_count() {
    let count = 0;
    agents.map(function (item, idx) {
      if (item.is_active === true) {
        count++;
      }
    });
    return count;
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <>
      <div className={styles.header}>
        <h2>Smart Assign </h2>
        <div className={styles.subdiv}>
          <h4>Active agents count: {get_count()}</h4>
          <input
            className={styles.search}
            type="text"
            value={query}
            onChange={function (e) {
              setQuery(e.target.value);
            }}
            placeholder="Search by Name / Email"
          />
        </div>
      </div>

      {agents.length > 0 ? (
        query ? (
          agents
            .filter(
              (item) =>
                item?.name.toLowerCase().includes(query) ||
                item?.email.toLowerCase().includes(query)
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
    </>
  );
}

export default SmartAssign;
