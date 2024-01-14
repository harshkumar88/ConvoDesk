import React, { useState } from "react";
import styles from "./css/style.module.css";
import TicketAdd from "./Components/TicketAdd";
import TicketEdit from "./Components/TicketEdit";
function Ticket({ ticketData, setTicketData }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Ticket Fields</div>
      {ticketData?.length == 0 && <h1>No Ticket Found</h1>}
      {ticketData?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            {item?.isNew ? (
              <TicketAdd
                item={item}
                ticketData={ticketData}
                setTicketData={setTicketData}
              />
            ) : (
              <TicketEdit
                item={item}
                ticketData={ticketData}
                setTicketData={setTicketData}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Ticket;
