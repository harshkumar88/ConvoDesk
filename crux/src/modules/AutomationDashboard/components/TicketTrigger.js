import React from "react";
import styles from "../css/ticket.module.css";
import List from "./List";
import { TicketTrigger as data } from "./seed";
function TicketTrigger({ searchType }) {
  return (
    <>
      {data?.map((item, idx) => {
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
