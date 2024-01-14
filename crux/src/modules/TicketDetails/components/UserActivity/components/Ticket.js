import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../style.module.css";
function Ticket({ data }) {
  return (
    <div className={styles.ticket}>
      <NavLink to={`/ticket/details/${data.id}`}>{data.subject}</NavLink>
      <p>#{data.id}</p>
      <p>Created on: {data.created_at}</p>
    </div>
  );
}

export default Ticket;
