import React, { useContext, useEffect, useState } from "react";
import styles from "../css/daily.module.css";
import { ReactComponent as BarGraph } from "../../../assets/Dashboard/BarGraph.svg";
import { ReactComponent as Chat } from "../../../assets/Dashboard/Chat.svg";
import { ReactComponent as Call } from "../../../assets/Dashboard/Call.svg";
import { list } from "../components/seed";
import Card from "./components/Card";
import Calendar from "../components/Calendar";
import { AppContext } from "../../../App";
import { get_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import { format } from "date-fns";

function DailyDetails({ overallData, chatData, callData }) {
  let appContext = useContext(AppContext);

  return (
    <div className={styles.container}>
      <div className={styles.header_label}>
        {/* <span>Daily details</span> */}
        {/* <Calendar dateRange={dateRange} setDateRange={setDateRange} /> */}
      </div>
      {/* <div className={styles.performance_container}>
        <label>🎉 Best performance 🎉</label>
        <label className={styles.performance_keys}>
          <span>Chats: </span>
          <span>79</span>
        </label>
        <label className={styles.performance_keys}>
          <span>Calls: </span>
          <span>54</span>
        </label>
        <label className={styles.performance_keys}>
          <span>Total tickets: </span>
          <span>133</span>
        </label>
      </div> */}
      <div className={styles.overview_container}>
        <Card svg={<BarGraph />} headerText="Overall" data={overallData} />
        <Card svg={<Chat />} headerText="Chat Overview" data={chatData} />
        <Card svg={<Call />} headerText="Call Overview" data={callData} />
      </div>
    </div>
  );
}

export default DailyDetails;
