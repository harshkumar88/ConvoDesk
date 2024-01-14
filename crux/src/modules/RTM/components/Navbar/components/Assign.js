import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { get_data, post_data, put_data } from "../../../../../networkHandler";
import PopUp from "../../../../../utils/Popup";
import styles from "./style.module.css";

function Assign({ ticket_ids }) {
  let [change, setChange] = useState({});
  let [allAgents, setAllAgents] = useState([]);
  let [allGroups, setAllGroups] = useState([]);
  let [groupAgents, setGroupAgents] = useState([]);
  let [close, setClose] = useState(false);

  useEffect(function () {
    setClose(false);
  }, []);
  const appContext = useContext(AppContext);
  function get_details() {
    get_data(`${API_URL}/crux/group/v1/`, {}, appContext, false).then(function (
      data
    ) {
      if (data) {
        setAllGroups(data.data);
      }
    });
    get_data(`${API_URL}/crux/all/agent/v1/`, {}, appContext, false).then(
      function (data) {
        if (data) {
          setAllAgents(data.data);
        }
      }
    );
  }
  function handleSubmit(e) {
    console.log(change);
    e.preventDefault();
    put_data(
      `${API_URL}/crux/ticket/bulk/update/v1/`,
      { ticket_ids: ticket_ids, data: change },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }
  return (
    <PopUp
      handleOpen={get_details}
      btnName={"Assign"}
      btnStyling="btn"
      closeState={close}
    >
      <h1 className={styles.heading}>Assign Tickets</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Group</label>
          <select
            value={change.group_id}
            className={`${styles.input} ${styles.select}`}
            onChange={function (e) {
              setGroupAgents(
                allGroups.filter(function (item, idx) {
                  return item.id == e.target.value;
                })[0]["agents"]
              );
              setChange({ ...change, group_id: parseInt(e.target.value) });
            }}
          >
            <option disabled>Select Group</option>
            {allGroups.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Agent</label>
          <select
            className={`${styles.input} ${styles.select}`}
            value={change.agent_id}
            onChange={function (e) {
              setChange({ ...change, agent_id: parseInt(e.target.value) });
            }}
          >
            <option disabled>Select Agent</option>
            {allAgents.map(function (item, idx) {
              if (groupAgents.includes(item.id)) {
                return <option value={item.id}>{item.name}</option>;
              }
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

export default Assign;
