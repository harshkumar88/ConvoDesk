import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { API_URL } from "../../../../../../config";
import PopUp from "../../../../../../utils/Popup";
import { post_data } from "../../../../../../networkHandler";
import { AppContext } from "../../../../../../App";

function AddAgent({ groups, allAgents, roles }) {
  let [close, setClose] = useState(false);

  let [agent, setAgent] = useState({
    name: "",
    phone: "",
    email: "",
    supervisor_id: 1,
    roles: [],
    groups: [],
  });
  const appContext = useContext(AppContext);
  useEffect(
    function () {
      setAgent({
        name: "",
        phone: "",
        email: "",
        supervisor_id: 1,
        roles: [],
        groups: [],
      });
      setClose(false);
    },
    [appContext.reload]
  );
  function handleSubmit(e) {
    e.preventDefault();
    post_data(`${API_URL}/crux/agent/v1/`, { ...agent }, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }
  return (
    <PopUp
      btnName={"Add Agent"}
      btnStyling={styles.popup_btn}
      closeState={close}
    >
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

          <Select
            className={`${styles.select} ${styles.multiselect}`}
            closeMenuOnSelect={false}
            isMulti
            options={groups.map(function (item, idx) {
              return { label: item.name, value: item.id };
            })}
            onChange={function (e) {
              setAgent({
                ...agent,
                groups: e.map(function (item, idx) {
                  return item.value;
                }),
              });
            }}
          />
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
            {allAgents.map(function (item, idx) {
              return (
                <option value={item.id} key={idx}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Roles</label>
          <Select
            className={`${styles.select} ${styles.multiselect}`}
            closeMenuOnSelect={false}
            isMulti
            options={roles.map(function (item, idx) {
              return { label: item.name, value: item.id };
            })}
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
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default AddAgent;
