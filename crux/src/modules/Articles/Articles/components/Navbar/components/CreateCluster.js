import React, { useContext, useEffect, useState } from "react";
import {
  get_data,
  post_data,
  put_data,
} from "../../../../../../networkHandler";
import styles from "../../../css/popup.module.css";
import PopUp from "../../../../../../utils/Popup";
import { AppContext } from "../../../../../../App";
import { API_URL } from "../../../../../../config";

function CreateCluster({ data }) {
  let [allAgents, setAllAgents] = useState([]);
  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);
  let [allBusinessHours, setAllBusinessHours] = useState([]);

  const appContext = useContext(AppContext);
  useEffect(function () {
    setClose(false);
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    post_data(`${API_URL}/crux/cluster/v1/`, change, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }

  return (
    <PopUp btnName={"Create Cluster"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Create Cluster</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.input_container} ${styles.text_container}`}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter Cluster Name"
            value={change.title}
            className={styles.input}
            required
            onChange={function (e) {
              setChange({ ...change, title: e.target.value });
            }}
          />
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className={styles.submit} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default CreateCluster;
