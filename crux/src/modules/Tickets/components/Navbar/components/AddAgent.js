import React, { useContext, useState } from "react";
import { AppContext } from "../../../../../App";
import { post_data } from "../../../../../React-lib/src/networkhandler";
import PopUp from "../../../../../utils/Popup";
import Select from "react-select";
import styles from "./style.module.css";
import { API_URL } from "../../../../../config";

function AddAgent({ groups, supervisors }) {
  const roles = [
    { value: 1, label: "Login" },
    { value: 2, label: "Admin" },
    { value: 3, label: "Ticket Creation" },
  ];

  let [agent, setAgent] = useState({
    name: "",
    phone: "",
    email: "",
    supervisor_id: 1,
    roles: [],
    group_id: 1,
  });
  const appContext = useContext(AppContext);
  function handleSubmit(e) {
    e.preventDefault();
    post_data(`${API_URL}/crux/agent/v1/`, { ...agent }, appContext, true);
  }
  return (
    <PopUp btnName={"Add Agent"} btnStyling="btn">
      <h1 className={styles.heading}>Add Agent</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={agent.name}
            className={styles.input}
            onChange={function (e) {
              setAgent({ ...agent, name: e.target.value });
            }}
            required
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Phone</label>
          <input
            type="tel"
            placeholder="Enter phone"
            value={agent.phone}
            className={styles.input}
            onChange={function (e) {
              if (e.target.value.length > 10) {
                return;
              }
              setAgent({ ...agent, phone: e.target.value });
            }}
            required
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className={styles.input}
            value={agent.email}
            onChange={function (e) {
              setAgent({ ...agent, email: e.target.value });
            }}
            required
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Group </label>
          <select
            value={agent.group_id}
            className={`${styles.input} ${styles.select}`}
            onChange={function (e) {
              setAgent({ ...agent, group_id: e.target.value });
            }}
          >
            <option disabled>Select Group</option>
            {groups.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Supervisor</label>
          <select
            className={`${styles.input} ${styles.select}`}
            value={agent.supervisor_id}
            onChange={function (e) {
              setAgent({ ...agent, supervisor_id: e.target.value });
            }}
          >
            <option disabled>Select Supervisor</option>
            {supervisors.map(function (item, idx) {
              return <option value={item.id}>{item.name}</option>;
            })}
          </select>
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Roles</label>
          <Select
            className={`${styles.select} ${styles.multiselect}`}
            closeMenuOnSelect={false}
            isMulti
            options={roles}
            onChange={function (e) {
              setAgent({
                ...agent,
                roles: e.map(function (item, idx) {
                  return item.value;
                }),
              });
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

export default AddAgent;
