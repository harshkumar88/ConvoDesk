import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { post_data } from "../../../ReactLib/networkhandler";
import styles from "../css/agent.module.css";
import Agent from "./Agent";
import { ReactComponent as Descending } from "../../../assets/performance/Descending.svg";
import { ReactComponent as Asscending } from "../../../assets/performance/Asscending.svg";

import AgentCsvDownload from "./AgentCsvDownload";
function AgentDetails({ agent_id, tab, nslotId, agentName, supervisorId }) {
  const appContext = useContext(AppContext);
  const [loader, setLoader] = useState(true);
  const [details, setDetails] = useState([]);
  let [isActive, setisActive] = useState({});
  let [clickCount, setClickCount] = useState();

  useEffect(() => {
    get_details();
  }, [agent_id, tab, nslotId, supervisorId]);

  function get_details(group_id) {
    let resolved_body = {
      agent_id: agent_id,
      n_slot_id: parseInt(nslotId),
      supervisor_id: supervisorId,
    };
    let open_chat_body = {
      agent_id: agent_id,
      supervisor_id: supervisorId,
      n_slot_id: parseInt(nslotId),
      status: "O",
      stage: 2,
      agent_id__gt: 0,
    };
    let body = tab ? open_chat_body : resolved_body;
    post_data(
      `${API_URL}/neon/conversation/performance/v1/`,
      body,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setDetails(data.data);
        setLoader(false);
      }
    });
  }

  function handleAsscendingSort(item) {
    let sortedData = details.sort((p1, p2) =>
      p1[item] > p2[item] ? 1 : p1[item] < p2[item] ? -1 : 0
    );
    setDetails([...sortedData]);
    let label = `${item}_assc`;
    setisActive({ [label]: true });
  }
  function handleDescendingSort(item) {
    let sortedData = details.sort((p1, p2) =>
      p1[item] < p2[item] ? 1 : p1[item] > p2[item] ? -1 : 0
    );
    setDetails([...sortedData]);
    let label = `${item}_desc`;
    setisActive({ [label]: true });
  }

  function handleSort(label, type) {
    if (type) {
      if (type == "desc") {
        handleDescendingSort(label);
        setClickCount();
      } else {
        handleAsscendingSort(label);
        setClickCount({ [label]: 1 });
      }
    } else {
      if (!clickCount) {
        handleAsscendingSort(label);
        setClickCount({ [label]: 1 });
      } else {
        handleDescendingSort(label);
        setClickCount();
      }
    }
  }

  function handleChildClick(event) {
    event.stopPropagation();
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className={styles.agent_details_container} onClick={handleChildClick}>
      <div className={styles.agent_details}>
        {details.length > 0 ? (
          <>
            <div className={styles.agent_details_label}>
              <span className={`${styles.text} ${styles.labelField} `}>
                Name
              </span>

              <span
                className={`${styles.text} ${styles.labelField}  ${styles.cursor_pointer}`}
              >
                <span
                  className={styles.cursor_pointer}
                  onClick={() => handleSort("agent_assign_time")}
                >
                  Agent Assign Time{" "}
                </span>

                <div className={styles.icons_flex}>
                  <Descending
                    onClick={() => handleSort("agent_assign_time", "desc")}
                    className={
                      isActive?.agent_assign_time_desc
                        ? styles.active_icon
                        : styles.sort_icons
                    }
                  />
                  <Asscending
                    onClick={() => handleSort("agent_assign_time", "assc")}
                    className={
                      isActive?.agent_assign_time_assc
                        ? styles.active_icon
                        : styles.sort_icons
                    }
                  />
                </div>
              </span>
              <span
                className={`${styles.text} ${styles.labelField}  ${styles.cursor_pointer}`}
              >
                <span
                  className={styles.cursor_pointer}
                  onClick={() => handleSort("chat_resolve_time")}
                >
                  Chat Resolve Time{" "}
                </span>

                <div className={styles.icons_flex}>
                  <Descending
                    onClick={() => handleSort("chat_resolve_time", "desc")}
                    className={
                      isActive?.chat_resolve_time_desc
                        ? styles.active_icon
                        : styles.sort_icons
                    }
                  />
                  <Asscending
                    onClick={() => handleSort("chat_resolve_time", "assc")}
                    className={
                      isActive?.chat_resolve_time_assc
                        ? styles.active_icon
                        : styles.sort_icons
                    }
                  />
                </div>
              </span>
              <span
                className={`${styles.text} ${styles.labelField}  ${styles.cursor_pointer}`}
              >
                <span
                  className={styles.cursor_pointer}
                  onClick={() => handleSort("resolution_time")}
                >
                  Resolution Time (min){" "}
                </span>

                <div className={styles.icons_flex}>
                  <Descending
                    onClick={() => handleSort("resolution_time", "desc")}
                    className={
                      isActive?.resolution_time_desc
                        ? styles.active_icon
                        : styles.sort_icons
                    }
                  />
                  <Asscending
                    onClick={() => handleSort("resolution_time", "assc")}
                    className={
                      isActive?.resolution_time_assc
                        ? styles.active_icon
                        : styles.sort_icons
                    }
                  />
                </div>
              </span>

              <span
                className={`${styles.text} ${styles.labelField}  ${styles.cursor_pointer} ${styles.flex}`}
              >
                <AgentCsvDownload
                  details={details}
                  agentName={agentName}
                  date={nslotId}
                />
              </span>
            </div>
            {details.map(function (item, idx) {
              return <Agent item={item} key={idx} />;
            })}
          </>
        ) : (
          <span className={styles.strip}>No orders found !!</span>
        )}
      </div>
    </div>
  );
}

export default AgentDetails;
