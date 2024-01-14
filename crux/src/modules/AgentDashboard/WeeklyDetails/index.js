import React, { useContext, useEffect, useState } from "react";
import styles from "../css/weekly.module.css";
import TotalTickets from "../components/TotalTickets";
import SlaTickets from "../components/SlaTickets";
import AvgResolutionTime from "../components/AvgResolutionTime";
import NPS from "../components/NPS";
import { AppContext } from "../../../App";
import { get_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
function WeeklyDetails({ chartData }) {
  let appContext = useContext(AppContext);

  return (
    <div className={styles.container}>
      {/* <label className={styles.header_label}>Weekly details</label> */}
      <div className={styles.weekly_details_box}>
        <div className={styles.chart_box}>
          <div className={styles.chart}>
            {/* <AvgResolutionTime
              chartData={chartData?.details.tickets}
              avg_resolution_time={chartData?.ticket_ct}
              title="Total Tickets"
              color="#18FB73"
              gradientToColors={["#18FB73", "#18FB73"]}
              label="Count"
              colors={["#00FF00", "#006600"]} // Define your gradient colors here
            /> */}
            <TotalTickets
              chartData={chartData?.details.tickets}
              tickets_ct={chartData?.ticket_ct}
              infoData={chartData}
            />
          </div>
          <div className={styles.chart}>
            {/* <AvgResolutionTime
              chartData={chartData?.details.resolve_within_sla}
              avg_resolution_time={chartData?.resolve_within_sla}
              title="Sla Tickets"
              color="#3399FF"
              gradientToColors={["#3399FF"]} // Set the gradient color to bluish
              label="Count"
              // colors={["#0000FF", "#000066"]} // Define your gradient colors here
            /> */}
            <SlaTickets
              chartData={chartData?.details.resolve_within_sla}
              resolve_within_sla={chartData?.resolve_within_sla}
              infoData={chartData}
            />
          </div>
        </div>
        <div className={styles.chart_box}>
          <div className={styles.chart}>
            <AvgResolutionTime
              infoData={chartData}
              chartData={chartData?.details.avg_resolution_time}
              avg_resolution_time={chartData?.avg_resolution_time}
              title="Avg. resolution "
              color="#18FB73"
              gradientToColors={["#18FB73", "#18FB73"]}

              // colors={["#FF0000", "#660000"]} // Define your gradient colors here
            />
          </div>
          <div className={styles.chart}>
            {/* <AvgResolutionTime
              chartData={chartData?.details.avg_resolution_time}
              avg_resolution_time={chartData?.avg_resolution_time}
              color="blue"
            /> */}
            <NPS
              chartData={chartData?.details.nps}
              nps_value={chartData?.nps}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyDetails;
