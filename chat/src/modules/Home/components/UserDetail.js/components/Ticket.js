import React from "react";
import styles from "../style.module.css";
function Ticket({ data }) {
  return (
    <div
      className={styles.ticket}
      onClick={function () {
        window.open(`https://crux.crofarm.com/ticket/details/${data.id}`);
      }}
    >
      <p className={styles.first_p}>{data?.subject}</p>
      <p>#{data?.id}</p>
      <p>Created on {data?.created_at}</p>
      <p className={styles.agent}>
        <img
          className={styles.agent_img}
          src="https://assetscdn-web.freshchat.com/agent/static/assets/images/fd-assigned-to-f58b4f51411772a4f622a05b15c72840.svg"
        />
        {data?.agent}
      </p>
    </div>
  );
}

export default Ticket;
