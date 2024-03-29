import React, { useContext, useEffect, useState } from "react";
import styles from "./css/dashboard.module.css";
import { AppContext } from "../../App";
import SideBar from "./SideBar/index";
import Ticket from "./Ticket/index";
function TicketDashboard() {
  const appContext = useContext(AppContext);
  const [ticketData, setTicketData] = useState({}); //store ticket data
  const [key, setKey] = useState(0); //unique index state

  //effect on reload
  useEffect(() => {
    appContext.setTitle("Ticket Fields");
  }, [appContext.reload]);

  //handle add new ticket
  function handleTicketItem(item) {
    if (ticketData?.isNew) {
      return;
    }

    let id = key;
    setTicketData({
      uid: id,
      isNew: true,
      title: item.value,
      icon: item.name,
      type: item.value,
    });
    id++;
    setKey(id);
  }

  return (
    <div className={styles.ticket_container}>
      <SideBar callbackfn={handleTicketItem} />
      <Ticket
        ticketData={ticketData}
        setTicketData={setTicketData}
        callbackfn={handleTicketItem}
        appContext={appContext}
      />
    </div>
  );
}

export default TicketDashboard;
