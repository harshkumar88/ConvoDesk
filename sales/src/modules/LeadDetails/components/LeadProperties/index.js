import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import styles from "./css/style.module.css";
import { API_URL } from "../../../../config";
import PopUp from "../../../../utils/Popup";
import Select from "react-select";
import { put_data } from "../../../../React-lib/src/networkhandler";
function LeadProperties({ context }) {
  let { lead_id, filters, data } = context;
  const appContext = useContext(AppContext);
  let [close, setClose] = useState(false);
  let [lead, setLead] = useState({});
  useEffect(function () {
    setClose(false);
    handleLead();
  }, []);

  useEffect(() => {
    setClose(false);
  }, [close]);

  function handleLead() {
    setLead({
      job_title: data.job_title,
      agent_id: data.agent_id,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setClose(true);
    put_data(
      `${API_URL}/crux/sales/lead/property/v1/`,
      { lead_id: lead_id, data: lead },
      appContext,
      true
    );
  }

  return (
    <PopUp btnName={"Lead Properties"} btnStyling="btn" closeState={close}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Lead Properties</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formBody}>
          <div className={styles.input_container}>
            <label className={styles.label}>Job Title</label>
            <Select
              placeholder="-"
              options={filters[3].choices}
              value={filters[3]?.choices?.filter(function (item, idx) {
                return item.value == lead?.job_title;
              })}
              onChange={function (e) {
                setLead({
                  ...lead,
                  job_title: e.value,
                });
              }}
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label}>Sales Owner</label>
            <Select
              placeholder="-"
              options={filters[1].choices}
              value={filters[1]?.choices.filter(function (item, idx) {
                return item.value == lead?.agent_id;
              })}
              onChange={function (e) {
                setLead({
                  ...lead,
                  agent_id: e.value,
                });
              }}
            />
          </div>
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input
            className={styles.submit}
            style={{ cursor: "pointer" }}
            type="submit"
          />
        </div>
      </form>
    </PopUp>
  );
}

export default LeadProperties;
