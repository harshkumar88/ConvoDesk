import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { API_URL } from "../../../../../config";
import { delete_data } from "../../../../../React-lib/src/networkhandler";
import PopUp from "../../../../../utils/Popup";
import styles from "../style.module.css";
function DeleteBusinessHour({ business_hour_id }) {
  let [close, setClose] = useState(false);

  useEffect(function () {
    setClose(false);
  }, []);
  const appContext = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    delete_data(
      `${API_URL}/crux/business/hours/v1/?business_hour_id=${business_hour_id}`,
      appContext,
      true
    );
  }
  return (
    <PopUp btnName={"Delete Business Hour"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Delete Business Hour</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className="center">Are you sure to delete this business hour ?</h3>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className={styles.input_container}>&nbsp;</div>
        <div className="btn-container">
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default DeleteBusinessHour;
