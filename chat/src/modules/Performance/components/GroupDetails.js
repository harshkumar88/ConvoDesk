import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import AgentDetails from "../components/AgentDetails";

function TicketDetails({ item, filters, tab, nslotId, supervisorId }) {
  const [agentName, setAgentName] = useState();
  let [isActive, setActive] = useState(false);
  useEffect(() => {
    let agentName = filters.agent.choices.find((data) => {
      return data.value == item.agent_id;
    });
    if (item.agent_id == 0) {
      setAgentName("---");
    } else {
      setAgentName(agentName.label);
    }
  }, [filters, item]);

  function handleClick() {
    setActive(!isActive);
  }

  return (
    <div className={styles.group_details} onClick={handleClick}>
      <div
        className={`${styles.group_label} ${styles.cursor_pointer}`}
        style={{
          backgroundColor: item?.warning ? "rgb(243 51 51 / 76%)" : "",
          color: item?.warning ? "#fff" : "",
          borderRadius: "10px",
        }}
      >
        <div className={styles.group_label_info}>
          <span>{agentName}</span>
        </div>
        <div className={styles.group_label_info}>
          <span>{item?.avg_resolution_time}</span>
        </div>

        <div className={styles.group_label_info}>
          <span>{item?.count}</span>
        </div>
        <div className={styles.group_label_info}>
          <span>{item?.less_than_five_min_per} </span>
        </div>
        <div className={styles.group_label_info}>
          <span>{item.less_than_ten_min_per} </span>
        </div>
        <div className={styles.group_label_info}>
          <span>{item?.greater_than_ten_min_per} </span>
        </div>

        <div className={styles.detail_icon}>
          {isActive ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      {isActive && (
        <AgentDetails
          agent_id={item.agent_id}
          agentName={agentName}
          tab={tab}
          nslotId={nslotId}
          supervisorId={supervisorId}
        />
      )}
    </div>
  );
}

export default TicketDetails;
