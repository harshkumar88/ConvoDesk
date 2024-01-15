import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { AppContext } from "../../../App";
import {
  get_data,
  post_data,
  put_data,
} from "../../../ReactLib/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../utils/Popup";
import JoditEditor from "jodit-react";
import { API_URL } from "../../../config";
import { get_agent_email, get_agent_id } from "../../../ReactLib/auth";
function FollowUp({ ticket_id, cannedResponses, group_id }) {
  let [note, setNote] = useState({});
  let [close, setClose] = useState(false);
  let [followUp, setFollowUp] = useState({ str: "", phone: "" });

  const appContext = useContext(AppContext);
  const customStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      zIndex: 5,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 5,
    }),
  };

  useEffect(
    function () {
      setNote({ ticket_id: parseInt(ticket_id), is_private: true });
      setClose(false);
    },
    [appContext.reload, ticket_id]
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log("follow", followUp);
    let payload = {
      ...followUp,
      name: ticket_id,
      email: get_agent_email(),
      follow_date: followUp?.date + " " + followUp?.time,
      group_id: group_id,
    };
    console.log(payload);
    post_data(
      `${API_URL}/crux/ticket/follow/up/v1/`,
      payload,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }

  return (
    <PopUp btnName={"Follow Up"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Follow Up</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Phone</label>
          <input
            type="text"
            className={styles.input}
            value={followUp?.phone}
            required
            placeholder="Phone"
            onChange={function (e) {
              if (e.target.value.length > 10 || isNaN(e.target.value)) {
                return;
              }
              setFollowUp({ ...followUp, phone: e.target.value });
            }}
          />
        </div>

        <div className={styles.input_container}>
          <label className={styles.label}>Follow Up Date</label>
          <input
            type="datetime-local"
            className={styles.input}
            step="1"
            required
            value={followUp.str}
            min={new Date().toISOString().split("T")[0] + "T00:00:00"}
            onChange={function (e) {
              let t = e.target.value.split("T");
              let date = t[0];
              let time = t[1];
              setFollowUp({
                ...followUp,
                str: e.target.value,
                date: date,
                time: time,
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

export default FollowUp;
