import React, { useEffect, useState } from "react";
import styles from "./css/style.module.css";
import TicketAdd from "./Components/TicketAdd";
import TicketEdit from "./Components/TicketEdit";
import { get_data } from "../../../ReactLib/networkhandler";
function Ticket({ ticketData, setTicketData, appContext }) {
  const [ticketEditData, setTicketEditData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    getTicketData();
  }, [appContext.reload]);

  async function getTicketData() {
    const data = await get_data(
      `https://qa1.crofarm.com/convo/config/v1/`,
      appContext
    );

    setTicketEditData(data?.config?.ticket_fields);
    setLoader(false);
  }

  return (
    <div className={styles.container}>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className={styles.header}>Ticket Fields</div>
          {!ticketData?.isNew && ticketEditData?.length == 0 && (
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
        </>
      )}
    </div>
  );
}

export default Ticket;
