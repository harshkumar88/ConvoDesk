import React from "react";
import styles from "../css/agent.module.css";
import { useNavigate } from "react-router-dom";

function Agent({ item }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/conversation/details/${item.id}`);
  }
  return (
    <div
      className={styles.agent_info}
      onClick={handleClick}
      style={{
        color: item?.warning ? "rgb(243 51 51 / 76%)" : "",
        borderRadius: "10px",
      }}
    >
      <span className={styles.text}>
        {item.name} ({item.phone})
      </span>
      <span className={styles.text}>{item.agent_assign_time}</span>
      <span className={styles.text}>{item.chat_resolve_time}</span>
      <span className={styles.text}>{item.resolution_time}</span>
      <span className={`${styles.text} ${styles.hidden}`}>
        {item.resolution_time}
      </span>
    </div>
  );
}

export default Agent;
