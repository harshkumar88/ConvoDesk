import React, { useContext } from "react";
import { AppContext } from "../../../App";

import styles from "../css/ticket.module.css";
function Ticket({ data }) {
  const appContext = useContext(AppContext);

  return (
    <div className={styles.ticket}>
      <b>{data?.label}</b>
      <b className={styles.muted}>{data?.value}</b>
    </div>
  );
}

export default Ticket;
