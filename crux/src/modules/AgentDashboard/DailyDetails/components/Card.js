import React from "react";
import styles from "../../css/daily.module.css";
import { ReactComponent as Arrow } from "../../../../assets/Dashboard/Arrow.svg";
import { NavLink } from "react-router-dom";

function Card({ svg, headerText, data, isOverall, agent_id }) {
  return (
    <div className={styles.cards}>
      <div className={styles.header}>
        <span className={styles.header_item}>
          {svg}
          {headerText}
        </span>
        <span>
          {isOverall === true ? (
            <NavLink to={`/analytics/agent/ticket/details/${agent_id}`}>
              <Arrow />
            </NavLink>
          ) : (
            <Arrow />
          )}
        </span>
      </div>
      <div className={styles.line}></div>
      <div className={styles.list_container}>
        {Object.keys(data).map((key, idx) => {
          return (
            <div key={idx} className={styles.list_item}>
              <span>{key}</span>
              <span>{data[key]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
