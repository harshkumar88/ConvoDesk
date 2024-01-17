import React, { useState } from "react";
import styles from "./css/style.module.css";
import TicketAdd from "./Components/TicketAdd";
import TicketEdit from "./Components/TicketEdit";
import { data } from "../Components/seed";
function Ticket({ ticketData, setTicketData }) {
  const [ticketEditData, setTicketEditData] = useState(data);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Ticket Fields</div>
      {ticketData?.length == 0 && ticketEditData?.length == 0 && (
        <h1>No Ticket Found</h1>
      )}
      {ticketEditData?.map((item, idx) => {
        return (
          <TicketEdit
            item={item}
            idx={idx}
            ticketEditData={ticketEditData}
            setTicketEditData={setTicketEditData}
          />
        );
      })}
      {ticketData?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            {item?.isNew ? (
              <TicketAdd
                item={item}
                ticketData={ticketData}
                setTicketData={setTicketData}
                ticketEditData={ticketEditData}
                setTicketEditData={setTicketEditData}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Ticket;
