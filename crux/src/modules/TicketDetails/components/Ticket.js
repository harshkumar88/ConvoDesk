import React from "react";
import styles from "../css/merge.module.css";
import { ReactComponent as Subtract } from "../../../assets/TicketDetails/Subtract.svg";
import { ReactComponent as Add } from "../../../assets/TicketDetails/Add.svg";

function Ticket({ item, idx, handleClick, isClicked }) {
  return (
    <div className={styles.merge_wrapper} key={idx}>
      <div className={styles.details}>
        <p>
          <span className={styles.id}>#{item.id}&nbsp;</span>
          <span className={styles.ticket}>{item.subject}</span>
        </p>
        <p>
          <span>
            Group: <span className={styles.bold}>{item.group_name}</span>
          </span>
          <span>
            Agent: <span className={styles.bold}>{item.agent}</span>
          </span>
        </p>
        <p>Created:{item.created_at}</p>
      </div>
      <div className={styles.icon_div}>
        {isClicked ? (
          <Subtract onClick={() => handleClick(item.id)} />
        ) : (
          <Add onClick={() => handleClick(item.id)} />
        )}
      </div>
    </div>
  );
}
export default Ticket;
