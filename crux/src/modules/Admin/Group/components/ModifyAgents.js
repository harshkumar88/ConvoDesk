import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { get_data, post_data, put_data } from "../../../../networkHandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";

function ModifyAgent({ data }) {
  let [allAgents, setAllAgents] = useState([]);
  let [change, setChange] = useState({ agent_ids: [1, 2] });
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      overflowY: "scroll",
      maxHeight: "25vh",
    }),
  };

  useEffect(
    function () {
      setChange({
        name: data.name,
        agent_ids: data.agents,
        group_id: data.id,
      });
      setClose(false);
    },
    [data]
  );
  function get_group_details() {
    get_data(`${API_URL}/crux/all/agent/v1/`, {}, appContext, false).then(
      function (data) {
        if (data) {
          setAllAgents(data.data);
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
      btnName={"Modify Group"}
      btnStyling={styles.popup_btn}
      closeState={close}
    >
      <h1 className={styles.heading}>Modify Group</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={change.name}
            className={styles.input}
            disabled
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Agents</label>
          <Select
            className={`${styles.select} ${styles.multiselect}`}
            closeMenuOnSelect={false}
            isMulti
            options={allAgents.map(function (item, idx) {
              return { label: item.name, value: item.id };
            })}
            value={allAgents.map(function (item, idx) {
              if (change.agent_ids.includes(item.id))
                return { label: item.name, value: item.id };
            })}
            onChange={function (e) {
              setChange({
                ...change,
                agent_ids: e.map(function (item, idx) {
                  return item.value;
                }),
              });
            }}
            styles={customStyles}
          />
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className={styles.submit} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default ModifyAgent;
