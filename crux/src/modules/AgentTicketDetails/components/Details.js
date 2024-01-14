import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/style.module.css";

function Details({ item, idx, issueDict, subiIssueDict }) {
  function get_nps_value() {
    if (item?.nps === 1) {
      return { label: "Satisfied", color: "#090" };
    } else if (item?.nps === 2) {
      return { label: "Neutral", color: "#EBBA17" };
    } else if (item?.nps === 3) {
      return { label: "Not Satisfied", color: "#EB1717" };
    } else {
      return { label: "---", color: "black" };
    }
  }

  const npsInfo = get_nps_value();

  return (
    <NavLink
      to={`/ticket/details/${item?.id}`}
      className={styles.ticket_details_wrapper}
      key={idx}
    >
      <div className={styles.text}>{item?.id}</div>
      <div className={styles.text}>{item?.n_slot_id}</div>
      <div className={styles.text}>
        {item?.issue === 0 ? "---" : <>{issueDict?.[item?.issue]}</>}
      </div>
      <div className={styles.text}>
        {item?.sub_issue === 0 ? (
          "---"
        ) : (
          <>{subiIssueDict?.[item?.sub_issue]}</>
        )}
      </div>
      <div className={styles.text} style={{ fontSize: "1.5rem", flex: ".5" }}>
        {item?.sla === true ? "😄" : item?.sla === false ? "😡" : "---"}
      </div>
      <div className={styles.text} style={{ color: npsInfo.color }}>
        {npsInfo.label}
      </div>
    </NavLink>
  );
}

export default Details;
