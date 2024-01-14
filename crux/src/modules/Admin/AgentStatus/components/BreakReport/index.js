import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { get_data } from "../../../../../networkHandler";
import PopUp from "../../../../../utils/Popup";
import { API_URL } from "../../../../../config";
import styles from "./style.module.css";
import { ReactComponent as SvgDownload } from "../../../../../assets/download_4.svg";

function BreakReport({ options, data }) {
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
    a.setAttribute("download", "break_report.csv");
    a.click();
  };

  const csvmaker = function (data) {
    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    data.map(function (item, idx) {
      const values = Object.values(item).join(",");
      csvRows.push(values);
    });

    return csvRows.join("\n");
  };

  function handleGet(e) {
    e.preventDefault();
    console.log(startSlot, endSlot);
    setClose(true);
    get_data(
      `${API_URL}/crux/users/agent/break/history/v1/?from_slot=${startSlot}&to_slot=${endSlot}`,
      appContext
    ).then(function (data) {
      if (data) {
        const csvdata = csvmaker(
          data.data.map(function (item, idx) {
            let label = options.find(function (opt) {
              return opt.value === item.break_id;
            })?.label;
            return {
              Agent: item.agent,
              Status: label,
              "Break Start Time": item.created_at,
              "Break End Time": item.break_end_time,
              "Time Elapsed": item.time_elapsed,
            };
          })
        );
        download(csvdata);
      }
    });
  }
  return (
    <PopUp
      btnName={
        <>
          <SvgDownload /> Break Report
        </>
      }
      btnStyling="btn"
      closeState={close}
    >
      <h1 className={styles.heading}>Break Report</h1>
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

export default BreakReport;
