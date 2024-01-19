import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { put_data, patch_data } from "../../../../ReactLib/networkhandler";
import styles from "../../AgentRoles/components/Navbar/components/style.module.css";
import PopUp from "../../../../utils/Popup";
import { customStyles } from "./Navbar/components/CustomStyles";
function Agent({ data, allRoles, supervisorData }) {
  const appContext = useContext(AppContext);
  let [roles, setRoles] = useState([]);
  let [close, setClose] = useState(false);
  let [updateAgent, setUpdateAgent] = useState({
    name: "",
    chat_concurrency: "",
    supervisor_id: "",
  });

  useEffect(
    function () {
      setClose(false);
    },
    [close]
  );
  useEffect(
    function () {
      setUpdateAgent({
        name: data.name,
        chat_concurrency: data.chat_concurrency,
        supervisor_id: data.supervisor_id,
      });
      setRoles(data.roles);
    },
    [data, supervisorData]
  );
  function handleSubmit(e) {
    e.preventDefault();
    console.log(roles, data.roles);
    if (roles == data.roles) {
      return;
    }
    let role_ids = roles.map(function (item, idx) {
      return item.role_id;
    });
    let payload = { agent_id: data.id, role_ids: role_ids };
    put_data(`${API_URL}/crux/users/agent/role/v1/`, payload, appContext, true);
  }

  function handleChange(e) {
    setUpdateAgent({
      ...updateAgent,
      [e.target.name]: e.target.value,
    });
  }

  function handleUpdate(e) {
    e.preventDefault();

    let payload = {
      agent_id: data.id,
      data: updateAgent,
    };
    console.log(payload);
    patch_data(
      `${API_URL}/crux/users/agent/v1/`,
      payload,
      appContext,
      true
    ).then((data) => {
      if (data) {
        setClose(true);
      }
    });
  }
  return (
    <div className="item-row">
      <div className="item-col flex-06">
        <span className="item-heading">Agent</span>
        <span className="item-value">{data.name}</span>
      </div>
      <div className="item-col flex-09 ">
        <span className="item-heading">Email</span>
        <span className="item-value">{data.email}</span>
      </div>

      <div className="item-col flex-06">
        <span className="item-heading">Chat Concurrency</span>
        <span className="item-value">{data.chat_concurrency}</span>
      </div>

      <div className="item-col">
        <label className="item-heading">Roles</label>
        <Select
          //   className="select"
          closeMenuOnSelect={false}
          isMulti
          options={allRoles?.map(function (item, idx) {
            return { label: item.name, value: item.id };
          })}
          value={roles?.map(function (item, idx) {
            return { label: item.role_name, value: item.role_id };
          })}
          onBlur={handleSubmit}
          onChange={function (e) {
            setRoles(
              e.map(function (item, idx) {
                return { role_name: item.label, role_id: item.value };
              })
            );
          }}
        />
      </div>

      <div className="item-col flex-03">
        <PopUp
          btnName={"Update"}
          btnStyling={styles.popup_btn}
          closeState={close}
        >
          <h1 className={styles.heading}>Update Agent</h1>
          <form className={styles.form} onSubmit={handleUpdate}>
            <div className={styles.input_container}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className={styles.input}
                name="name"
                value={updateAgent.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.input_container}>
              <label className={styles.label}>Concurency</label>
              <input
                type="number"
                placeholder="Enter no."
                name="chat_concurrency"
                value={updateAgent.chat_concurrency}
                className={styles.input}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue === "" || (newValue >= 0 && newValue <= 20)) {
                    handleChange(e);
                  }
                }}
              />
            </div>

            <div className={styles.input_container}>
              <label className={styles.label}>Supervisor Name </label>
              <Select
                styles={customStyles}
                className={styles.dropdown_input}
                options={supervisorData?.map((item) => {
                  return { label: item.name, value: item.id };
                })}
                value={supervisorData?.map((item) => {
                  if (item.id == updateAgent.supervisor_id)
                    return { label: item.name, value: item.id };
                })}
                onChange={(e) => {
                  setUpdateAgent({ ...updateAgent, supervisor_id: e.value });
                }}
              />
            </div>

            <div
              className={styles.input_container}
              style={{ visibility: "hidden" }}
            >
              <label className={styles.label}>Concurency</label>
            </div>

            <div
              className={`${styles.input_container} ${styles.submit_container}`}
              style={{ zIndex: 0 }}
            >
              <input className="dark-btn" type="submit" />
            </div>
          </form>
        </PopUp>
      </div>
      {/* <div className="item-col">
        <div className="btn-container">
          <button className="dark-btn" onClick={handleSubmit}>
            Save Role
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Agent;
