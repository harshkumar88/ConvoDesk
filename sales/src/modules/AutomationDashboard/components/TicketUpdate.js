import React from "react";
import List from "./List";
import styles from "../css/ticket.module.css";
function TicketUpdate({ searchType, automationData }) {
  return (
    <>
      {automationData?.length == 0 && (
        <div className={styles.no_data}>No data found</div>
      )}
      {automationData?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <List item={item} idx={idx} searchType={searchType} />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default TicketUpdate;
