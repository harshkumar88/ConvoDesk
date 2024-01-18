import React, { useEffect, useState } from "react";
import styles from "./css/style.module.css";
import TicketAdd from "./Components/TicketAdd";
import TicketEdit from "./Components/TicketEdit";
import { data } from "../Components/seed";
function Ticket({ ticketData, setTicketData, appContext }) {
  const [ticketEditData, setTicketEditData] = useState([]);

  useEffect(() => {
    setTicketEditData(data);
  }, [appContext.reload]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Ticket Fields</div>
      {ticketData?.length == 0 && ticketEditData?.length == 0 && (
        <h1>No Ticket Found</h1>
      )}
      {ticketEditData?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <TicketEdit
              item={item}
              idx={idx}
              ticketEditData={ticketEditData}
              setTicketEditData={setTicketEditData}
            />
          </React.Fragment>
        );
      })}

      {ticketData?.isNew && (
        <TicketAdd
          item={ticketData}
          setTicketData={setTicketData}
          ticketEditData={ticketEditData}
          setTicketEditData={setTicketEditData}
        />
      )}
    </div>
  );
}

export default Ticket;
