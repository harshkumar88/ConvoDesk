import React, { useContext } from "react";
import styles from "./style.module.css";
import { AppContext } from "../../../../App";
import AddNote from "../AddNote";
import { delete_data } from "../../../../networkHandler";
import { API_URL } from "../../../../config";
import { useNavigate } from "react-router-dom";

function Navbar({ lead_id, show, setShow, showActivity, setShowActivity }) {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  function handleDelete() {
    delete_data(
      `${API_URL}/crux/sales/lead/v1/?lead_id=${lead_id}`,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate("/home");
      }
    });
  }
  function toggle() {
    setShowActivity(!showActivity);
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <button
          className="btn"
          onClick={function () {
            setShow(show == "note" ? "activity" : "note");
          }}
        >
          {show == "note" ? "Hide " : "Show "}Note
        </button>
        <button
          className="btn"
          onClick={function () {
            setShow(show == "field" ? "activity" : "field");
          }}
        >
          {show == "field" ? "Hide " : "Show "}Field
        </button>
        <button
          className="btn"
          onClick={function () {
            setShow(show == "activity" ? "field" : "activity");
          }}
        >
          {show == "activity" ? "Hide " : "Show "}Activity
        </button>
        <AddNote lead_id={lead_id} />
        <button className="btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
