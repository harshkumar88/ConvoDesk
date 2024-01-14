import React from "react";
import styles from "../css/ticket.module.css";
import { ticket_list } from "../components/seed";
import { ReactComponent as Arrow } from "../../../assets/Dashboard/Arrow.svg";

function TicketDetails({ dateRange }) {
  return (
    <div className={styles.container}>
      <label className={styles.header_label}>Agent Details</label>
      <div className={styles.list_container}>
        <label>Agent name</label> <label>Pending tickets</label>
        <label className={styles.flex}>Total tickets</label>
        <label>Within SLA</label>
        <label>NPS</label>
        <label className={styles.hidden}>Arrow</label>
      </div>
      <div className={styles.list_item}>
        {ticket_list.map((item, idx) => {
          return (
            <div key={idx}>
              <div className={styles.list_info}>
                <span>{item.issue_type}</span>
                <span>{item.total_tickets}</span>
                <span>{item.tickets_within_sla}</span>
                <span>{item.calls}</span>
                <span>{item.calls_within_sla}</span>
                <span className={styles.flex_02}>
                  <Arrow />
                </span>
              </div>
              {ticket_list.length - 1 != idx && (
                <div className={styles.line}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TicketDetails;
