import React, { useContext, useState, useEffect } from "react";
import styles from "./css/style.module.css";
import { AppContext } from "../../App";
import {
  get_data,
  post_data_without_reload,
} from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import { formatDate } from "../../utils/utility";
import TicketView from "./components/TicketView";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";

function AgentTicketDetails() {
  let { a_id } = useParams();
  let appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [ticketFilter, setTicketFilter] = useState({
    agent_id: [a_id],
    n_slot_id: [
      formatDate(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)),
      formatDate(new Date()),
    ],
  });
  let [agentData, setAgentData] = useState({});
  let [details, setDetails] = useState({});
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
      appContext.setTitle("Agent Ticket Details");
      appContext.setPage("Agent Ticket Details");
      if (a_id) {
        get_user_tickets();
      }
    },
    [appContext.reload, ticketFilter]
  );

  useEffect(
    function () {
      if (a_id) {
        get_data(`${API_URL}/crux/agent/v1/?agent_id=${a_id}`, appContext).then(
          function (data) {
            if (data) {
              setAgentData(data);
            }
          }
        );
      }
    },
    [a_id]
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

  function handleDate(from_slot, to_slot) {
    setTicketFilter((current) => {
      return { ...current, n_slot_id: [from_slot, to_slot] };
    });
  }

  return (
    <div className={styles.container}>
      <Navbar agentData={agentData} handleDate={handleDate} />
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

export default AgentTicketDetails;
