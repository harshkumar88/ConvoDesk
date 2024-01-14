import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { get_data, post_data } from "../../../../React-lib/src/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";

function AddAutomation() {
  let [allGroups, setAllGroups] = useState([]);
  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  useEffect(
    function () {
      setClose(false);
    },
    [appContext.reload]
  );

  function get_group_details() {
    setChange([]);
    get_data(`${API_URL}/crux/group/v1/`, {}, appContext, false).then(function (
      data
    ) {
      if (data) {
        setAllGroups(data.data);
      }
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (change && !change.group_name) {
      appContext.setAlert("Please select group", "alert_error");
      return;
    }
    post_data(`${API_URL}/crux/subject/v1/`, change, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }

  return (
    <PopUp
      handleOpen={get_group_details}
      btnName={"Add Automation"}
      btnStyling="btn"
      closeState={close}
    >
      <h1 className={styles.heading}>Add Automation</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={change.name}
            className={styles.input}
            onChange={function (e) {
              setChange({ ...change, subject: e.target.value });
            }}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Group</label>
          <select
            required
            value={change.group_id}
            className={`${styles.input} ${styles.select}`}
            onChange={function (e) {
              let group_name = allGroups.filter(function (item, idx) {
                return item.id == e.target.value;
              })[0]["name"];
              setChange({
                ...change,
                group_id: parseInt(e.target.value),
                group_name: group_name,
              });
            }}
          >
            <option value={null}>Select Group</option>
            {allGroups.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input
            className={styles.submit}
            type="submit"
            style={{ cursor: "pointer" }}
          />
        </div>
      </form>
    </PopUp>
  );
}

export default AddAutomation;
