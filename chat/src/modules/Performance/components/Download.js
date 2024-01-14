import React, { useContext, useEffect } from "react";
import styles from "../css/style.module.css";
import { PerformanceContext } from "../index";
function Download({ date }) {
  const performanceContext = useContext(PerformanceContext);
  // useEffect(() => {
  //   console.log(performanceContext.groupDetails, "ji");
  // }, [performanceContext]);

  const download = function (data, group_name) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${date}_${group_name}_performance.csv`);
    a.click();
  };

  const csvmaker = function (data) {
    if (!data.length) {
      return [
        "Agent Name",
        "Avg Resolution",
        "Chat Count",
        "less_than_five_min_per",
        "less_than_ten_min_per",
        "greater_than_ten_min_per",
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
    let data = performanceContext.groupDetails[0];
    let group_name = performanceContext.groupDetails[1].group_name;
    let csv_data = [];
    data.filter((item) => {
      let { data, agent_id, ...info } = item;
      csv_data.push(info);
    });

    const csvdata = csvmaker(csv_data);
    download(csvdata, group_name);
  }
  return (
    <>
      <button className={styles.btn} onClick={handleDownload}>
        <h4>Download</h4>
      </button>
    </>
  );
}

export default Download;
