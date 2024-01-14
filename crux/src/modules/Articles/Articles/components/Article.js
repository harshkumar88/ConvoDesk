import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { delete_data } from "../../../../networkHandler";
import styles from "../css/style.module.css";

function Article({ data }) {
  const appContext = useContext(AppContext);
  function handleDelete(e) {
    delete_data(
      `${API_URL}/crux/article/v1/?article_id=${data.id}`,
      appContext,
      true
    );
  }
  return (
    <div className="item-row">
      <NavLink className={styles.row} to={`/article/details/${data.id}`}>
        <div className="item-col">
          <span className="item-heading">Article</span>
          <span className="item-value">{data.title}</span>
        </div>
        <div className="item-col">
          <span className="item-heading">Date</span>
          <span className="item-value">{data.n_slot_id}</span>
        </div>
        <div className="item-col">
          <span className="item-heading">Created By</span>
          <span className="item-value">Harshit</span>
        </div>
      </NavLink>
      <div className="cta">
        <NavLink to={`/article/edit/${data.id}`} className="btn">
          Edit Article
        </NavLink>

        <button className="btn" onClick={handleDelete}>
          Delete Article
        </button>
      </div>
    </div>
  );
}

export default Article;
