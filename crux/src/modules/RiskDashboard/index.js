import React, { useContext, useState, useEffect } from "react";
import styles from "./css/style.module.css";
import { AppContext } from "../../App";
import { post_data_without_reload } from "../../networkHandler";
import { API_URL } from "../../config";
import { formatDate } from "../../utils/utility";
import TicketView from "./components/TicketView";

function RiskDashboard() {
  let appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [ticketFilter, setTicketFilter] = useState({
    n_slot_id: [formatDate(new Date()), formatDate(new Date())],
    source: [1, 2, 4, 5],
  });
  let [details, setDetails] = useState([]);

  const allFilters = appContext?.filters;

  const issueDict = allFilters?.issue?.choices?.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

  const subiIssueDict = allFilters?.sub_issue?.choices?.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

  useEffect(
    function () {
      setLoader(true);
      appContext.setTitle("Risk Dashboard");
      appContext.setPage("Risk Dashboard");
      get_user_tickets();
    },
    [appContext.reload, ticketFilter]
  );

  function get_user_tickets() {
    post_data_without_reload(
      `${API_URL}/crux/agent/tickets/v1/`,
      {
        filters: Object.entries(ticketFilter).map((item) => ({
          [item[0]]: item[1],
        })),
      },
      appContext
    ).then(function (data) {
      if (data) {
        setLoader(false);
        setDetails(data.data);
      }
    });
  }

  return (
    <div className={styles.container}>
      {/* <Navbar agentData={agentData} handleDate={handleDate} /> */}
      <TicketView
        loader={loader}
        allFilters={allFilters}
        issueDict={issueDict}
        subiIssueDict={subiIssueDict}
        ticketFilter={ticketFilter}
        setTicketFilter={setTicketFilter}
        details={details}
      />
    </div>
  );
}

export default RiskDashboard;
