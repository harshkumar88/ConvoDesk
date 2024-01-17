import React, { useState } from "react";
import styles from "./css/style.module.css";
import TicketAdd from "./Components/TicketAdd";
import TicketEdit from "./Components/TicketEdit";
function Ticket({ ticketData, setTicketData }) {
  // const [fields, setFields] = useState([]);
  // const [choiceData, setChoiceData] = useState([]);
  const [payload, setPayload] = useState({ fields: [], choices_data: [] });
  return (
    <div className={styles.container}>
      <div className={styles.header}>Ticket Fields</div>
      {ticketData?.length == 0 && <h1>No Ticket Found</h1>}
      {payload?.fields?.map((item, idx) => {
        return (
          <TicketEdit
            item={item}
            setPayload={setPayload}
            payload={payload}
            idx={idx}
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
                setPayload={setPayload}
                payload={payload}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Ticket;
