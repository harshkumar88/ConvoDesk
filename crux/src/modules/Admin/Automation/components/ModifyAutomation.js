import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { get_data, put_data } from "../../../../React-lib/src/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";

function ModifyAutomation({ data }) {
  let [allGroups, setAllGroups] = useState([]);
  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  useEffect(
    function () {
      setChange({ ...change, ...data });
      setClose(false);
    },
    [data]
  );
  function get_group_details() {
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
    put_data(`${API_URL}/crux/subject/v1/`, change, appContext, true).then(
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
      btnName={"Modify Automation"}
      btnStyling={styles.popup_btn}
      closeState={close}
    >
      <h1 className={styles.heading}>Modify Automation</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={change.name}
            className={styles.input}
            onChange={function (e) {
              setChange({ ...change, name: e.target.value });
            }}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Group</label>
          <select
            value={change.group_id}
            className={`${styles.input} ${styles.select}`}
            onChange={function (e) {
              let group_name = allGroups.filter(function (item, idx) {
                return item.id == e.target.value;
              })[0]["name"];
              console.log(group_name);
              setChange({
                ...change,
                group_id: parseInt(e.target.value),
                group_name: group_name,
              });
            }}
          >
            <option disabled>Select Group</option>
            {allGroups.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className={styles.submit} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default ModifyAutomation;
