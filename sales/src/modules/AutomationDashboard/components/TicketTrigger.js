import React from "react";
import styles from "../css/ticket.module.css";
import List from "./List";
function TicketTrigger({ searchType, automationData }) {
  return (
    <>
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

export default TicketTrigger;
