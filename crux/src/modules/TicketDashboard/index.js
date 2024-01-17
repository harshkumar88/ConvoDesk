import React, { useContext, useEffect, useState } from "react";
import styles from "./css/dashboard.module.css";
import { AppContext } from "../../App";
import SideBar from "./SideBar/index";
import Ticket from "./Ticket/index";
function TicketDashboard() {
  const appContext = useContext(AppContext);
  const [ticketData, setTicketData] = useState([]); //store ticket data
  const [key, setKey] = useState(0); //unique index state
  const [loader, setLoader] = useState(true);

  //effect on reload
  useEffect(() => {
    appContext.setTitle("Ticket Fields");
    setLoader(false);
  }, [appContext.reload]);

  //handle add new ticket
  function handleTicketItem(item) {
    const data = ticketData?.find((item) => {
      return item?.isNew;
    });
    if (data) {
      return;
    }

    let id = key;
    setTicketData([
      ...ticketData,
      {
        uid: id,
        isNew: true,
        title: item.value,
        icon: item.name,
        type: item.value,
      },
    ]);
    id++;
    setKey(id);
  }

  return (
    <div className={styles.ticket_container}>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <SideBar callbackfn={handleTicketItem} />
          <Ticket
            ticketData={ticketData}
            setTicketData={setTicketData}
            callbackfn={handleTicketItem}
          />
        </>
      )}
    </div>
  );
}

export default TicketDashboard;
