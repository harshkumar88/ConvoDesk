import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { get_data, post_data } from "../../../../../ReactLib/networkhandler";
import PopUp from "../../../../../utils/Popup";
import Select from "react-select";
import styles from "./style.module.css";
import { API_URL } from "../../../../../config";

function Export({ groups, supervisors }) {
  let [close, setClose] = useState(false);
  let [startSlot, setStartSlot] = useState();
  let [endSlot, setEndSlot] = useState();
  const appContext = useContext(AppContext);

  useEffect(
    function () {
      setClose(false);
    },
    [appContext.reload]
  );

  const download = function (data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    a.click();
  };

  const csvmaker = function (data) {
    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    console.log("daata", data);
    data.map(function (item, idx) {
      const values = Object.values(item).join(",");
      console.log("value", values);
      csvRows.push(values);
    });

    return csvRows.join("\n");
  };
  function handleGet(e) {
    e.preventDefault();
    console.log(startSlot, endSlot);
    setClose(true);
    get_data(
      `${API_URL}/crux/ticket/export/v1/?start_slot=${startSlot}&end_slot=${endSlot}`,
      appContext
    ).then(function (data) {
      if (data) {
        const csvdata = csvmaker(
          data.data.map(function (item, idx) {
            return {
              "Created At": item.created_at,
              "Ticket ID": item.id,
              Status: item.status,
              "Order ID": item.order_id,
              "Refund Amount": item.refund_amount,
              Phone: item.phone,
              Subject: item.subject.split(",").join(" "),
              Issue: item.issue,
              "Sub Issue": item.sub_issue,
              "Further Breakup": item.further_breakup,
              "Ticket Type": item.ticket_type,
              "Ticket Outcome": item.ticket_outcome,
              Agent: item.agent,
              Group: item.group_name,
              Source: item.source,
              "First Response Time": item.first_response_time,
              "Resoltion Time": item.resolution_time,
              "Agent Assign Time": item.agent_assign_time,
              "Group Assign Time": item.group_assign_time,
              "Chat Resolve Time": item.chat_resolve_time,
              "Created Time": item.cf_created_time,
              Segment: item.cf_segment,
              "Zone Name": item.cf_zone_name,
              "Conversation ID": item.conversation_id,
              "Chat Created Time": item.chat_created_time,
            };
          })
        );
        download(csvdata);
      }
    });
  }
  return (
    <PopUp btnName={"Export"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Add Agent</h1>
      <form className={styles.form} onSubmit={handleGet}>
        <div className={styles.input_container}>
          <label className={styles.label}>Start Slot</label>
          <input
            type="date"
            className={styles.input}
            onChange={function (e) {
              let date = e.target.value;
              setStartSlot(date.split("-").join("").substr(2));
            }}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>End Slot</label>
          <input
            type="date"
            className={styles.input}
            onChange={function (e) {
              let date = e.target.value;
              setEndSlot(date.split("-").join("").substr(2));
            }}
            required
          />
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default Export;
