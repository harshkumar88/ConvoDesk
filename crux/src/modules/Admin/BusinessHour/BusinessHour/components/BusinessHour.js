import React from "react";
import { NavLink } from "react-router-dom";
import DeleteBusinessHour from "./DeleteBusinessHour";
import styles from "../style.module.css";

function BusinessHour({ data }) {
  return (
    <div className="item-row">
      <NavLink to={`/business-hour/${data.id}`} className={styles.item_row}>
        <div className="item-col">
          <div className="item-heading">ID</div>
          <div className="item-value">{data.id}</div>
        </div>
        <div className="item-col">
          <div className="item-heading">Name</div>
          <div className="item-value">{data.name}</div>
        </div>
      </NavLink>
      <div className="cta">
        <div className="btn-container">
          <DeleteBusinessHour business_hour_id={data.id} />
        </div>
      </div>
    </div>
  );
}

export default BusinessHour;
