import React, { useContext, useEffect } from "react";
import styles from "../css/style.module.css";
import { PerformanceContext } from "../index";
function AgentCsvDownload({ details, agentName, date }) {
  const download = function (data, group_name) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${date}_${agentName}_performance.csv`);
    a.click();
  };

  const csvmaker = function (data) {
    if (!data.length) {
      return [
        " name",
        "agent_assign_time",
        "chat_resolve_time",
        "resolution_time",
      ];
    }
    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    data.map(function (item, idx) {
      const values = Object.values(item).join(",");
      csvRows.push(values);
    });

    return csvRows.join("\n");
  };

  function handleDownload() {
    let data = details;

    let csv_data = [];
    data.filter((item) => {
      let { name, agent_assign_time, chat_resolve_time, resolution_time } =
        item;
      csv_data.push({
        name,
        agent_assign_time,
        chat_resolve_time,
        resolution_time,
      });
    });
    console.log(csv_data);
    const csvdata = csvmaker(csv_data);
    download(csvdata);
  }
  return (
    <>
      <button className={styles.btn} onClick={handleDownload}>
        <h4>Download</h4>
      </button>
    </>
  );
}

export default AgentCsvDownload;
