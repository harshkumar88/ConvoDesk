import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import {
  get_data,
  post_data,
  put_data,
} from "../../../../ReactLib/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";

function CreateGroup({ data }) {
  let [allAgents, setAllAgents] = useState([]);
  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);
  let [allBusinessHours, setAllBusinessHours] = useState([]);
  let [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "1", label: "Crux Ticket" },
    { value: "2", label: "Chat Connect" },
  ];
  const handleChange = (option) => {
    setSelectedOption(option);

    setChange({
      ...change,
      ecosystem: parseInt(option.value),
    });
  };
  const appContext = useContext(AppContext);
  useEffect(function () {
    setClose(false);
  }, []);
  function get_details() {
    get_data(`${API_URL}/crux/all/agent/v1/`, {}, appContext, false).then(
      function (data) {
        if (data) {
          setAllAgents(data.data);
        }
      }
    );
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
    post_data(`${API_URL}/crux/group/v1/`, change, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }

  return (
    <PopUp
      handleOpen={get_details}
      btnName={"Create Group"}
      btnStyling="btn"
      closeState={close}
    >
      <h1 className={styles.heading}>Modify Agents</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={change.name}
            className={styles.input}
            required
            onChange={function (e) {
              setChange({ ...change, group_name: e.target.value });
            }}
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
                bussiness_hours: parseInt(e.target.value),
              });
            }}
          >
            <option disabled>Select Business Hour</option>
            {allBusinessHours.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
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
              if (change?.agent_ids?.includes(item.id))
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
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Group Ecosystem</label>
          <Select
            className={`${styles.select} ${styles.multiselect}`}
            closeMenuOnSelect={true}
            options={options}
            value={selectedOption}
            onChange={handleChange}
          />
        </div>
        {/* <div className={styles.input_container}></div> */}
        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className={styles.submit} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default CreateGroup;
