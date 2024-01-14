import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";
export default function List({ item }) {
  const getMethodClass = `${styles.status} ${styles.getMethod}`;
  const postMethodClass = `${styles.status} ${styles.postMethod}`;

  let methodClass = getMethodClass;
  if (item?.status === "O") {
    methodClass = getMethodClass;
  } else methodClass = postMethodClass;

  return (
    <NavLink
      to={`/conversation/activity/${item?.id}`}
      className={styles.list_wrapper}
    >
      <div className={styles.list}>
        <b>{item?.id}</b>
      </div>
      <div className={styles.list}>{item?.name}</div>
      <div className={styles.list}>{item?.created_at}</div>
      <div className={styles.list}>
        <p className={methodClass}>
          {item?.status === "O" ? "Open" : "Resolved"}
        </p>
      </div>
    </NavLink>
  );
}
