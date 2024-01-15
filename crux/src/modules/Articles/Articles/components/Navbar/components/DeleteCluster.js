import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../../App";
import { API_URL } from "../../../../../../config";
import { delete_data } from "../../../../../../ReactLib/networkhandler";
import PopUp from "../../../../../../utils/Popup";
import styles from "../../../css/popup.module.css";

function DeleteCluster({ cluster }) {
  let [close, setClose] = useState(false);

  useEffect(function () {
    setClose(false);
  }, []);
  const appContext = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    delete_data(
      `${API_URL}/crux/cluster/v1/?cluster_id=${cluster}`,
      appContext,
      true
    );
  }
  return (
    <PopUp btnName={"Delete Cluster"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Delete Cluster</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className="center">Are you sure to delete this cluster ?</h3>
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

export default DeleteCluster;
