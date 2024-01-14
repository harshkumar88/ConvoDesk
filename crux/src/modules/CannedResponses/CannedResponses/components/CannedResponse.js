import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { delete_data } from "../../../../React-lib/src/networkhandler";
import styles from "../css/style.module.css";

function CannedResponse({ data }) {
  const appContext = useContext(AppContext);
  function handleDelete(e) {
    delete_data(
      `${API_URL}/crux/canned/response/v1/?canned_response_id=${data.id}`,
      appContext,
      true
    );
  }
  return (
    <div className="item-row">
      <NavLink className={styles.row} to={`/canned/response/edit/${data.id}`}>
        <div className="item-col">
          <span className="item-heading">Title</span>
          <span className="item-value">{data.title}</span>
        </div>
        <div className="item-col">
          <span className="item-heading">Date</span>
          <span className="item-value">{data.n_slot_id}</span>
        </div>
        <div className="item-col">
          <span className="item-heading">Shortcut</span>
          <span className="item-value">{data.shortcut}</span>
        </div>
        <div className="item-col">
          <span className="item-heading">Ecosystem</span>
          <span className="item-value">
            {data.ecosystem == 2 ? "Chat Connect" : "Crux"}
          </span>
        </div>
      </NavLink>
      <div className="cta">
        <button className="btn" onClick={handleDelete}>
          Delete Canned Response
        </button>
      </div>
    </div>
  );
}

export default CannedResponse;
