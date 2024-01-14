import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import {
  get_data,
  post_data,
  put_data,
} from "../../../../React-lib/src/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";

function ModifyBusinessHour({ data }) {
  let [allBusinessHours, setAllBusinessHours] = useState([]);

  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  useEffect(
    function () {
      setChange({
        group_id: data.id,
        name: data.name,
        business_hour: data.business_hour,
      });
      setClose(false);
    },
    [data]
  );
  function get_group_details() {
    get_data(`${API_URL}/crux/business/hours/v1/`, {}, appContext, false).then(
      function (data) {
        if (data) {
          setAllBusinessHours(data.data);
        }
      }
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    put_data(`${API_URL}/crux/group/v1/`, change, appContext, true).then(
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
      btnName={"Modify Business Hour"}
      btnStyling={styles.popup_btn}
      closeState={close}
    >
      <h1 className={styles.heading}>Modify Business Hour</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            disabled
            value={change.name}
            className={styles.input}
            onChange={function (e) {
              setChange({ ...change, name: e.target.value });
            }}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Business Hours</label>
          <select
            value={change.business_hour}
            className={`${styles.input} ${styles.select}`}
            onChange={function (e) {
              setChange({
                ...change,
                business_hour: parseInt(e.target.value),
              });
            }}
          >
            <option disabled>Select Business Hour</option>
            {allBusinessHours.map(function (item, idx) {
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

export default ModifyBusinessHour;
