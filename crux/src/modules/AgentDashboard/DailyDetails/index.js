import React, { useContext, useEffect, useState } from "react";
import styles from "../css/daily.module.css";
import { ReactComponent as BarGraph } from "../../../assets/Dashboard/BarGraph.svg";
import { ReactComponent as Chat } from "../../../assets/Dashboard/Chat.svg";
import { ReactComponent as Call } from "../../../assets/Dashboard/Call.svg";
import Card from "./components/Card";
import { AppContext } from "../../../App";

function DailyDetails({ overallData, chatData, callData, agent_id }) {
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
        <Card
          svg={<BarGraph />}
          headerText="Overall"
          data={overallData}
          isOverall={true}
          agent_id={agent_id}
        />
        <Card svg={<Chat />} headerText="Chat Overview" data={chatData} />
        <Card svg={<Call />} headerText="Call Overview" data={callData} />
      </div>
    </div>
  );
}

export default DailyDetails;
