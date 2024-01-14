import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { put_data } from "../../../../../networkHandler";
import PopUp from "../../../../../utils/Popup";
import styles from "./style.module.css";

function Delete({ ticket_ids }) {
  let [close, setClose] = useState(false);

  useEffect(function () {
    setClose(false);
  }, []);
  const appContext = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    put_data(
      `${API_URL}/crux/ticket/bulk/delete/v1/`,
      { ticket_ids: ticket_ids },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }
  return (
    <PopUp btnName={"Delete"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Delete Tickets</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className="center">Are you sure to delete these tickets ?</h3>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className={styles.submit} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default Delete;
