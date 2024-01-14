import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { get_data } from "../../networkHandler";
import { API_URL } from "../../config";
import Navbar from "./components/Navbar";
import styles from "./css/style.module.css";
import Ticket from "./components/Ticket";
import TicketTrendsMetrics from "./components/TicketsTrendsMetrics";
import PercentageDateGraph from "./components/Graphs/PercentageDateChart";
import ChatTimeGraph from "./components/Graphs/ChatTimeChart";
import ConversationMetrics from "../RTM/components/ConversationMetrics";
import DatePicker from "../../utils/DatePicker";
import PendingTickets from "./components/PendingTickets";
import FRT from "./components/FRT";

function RTM() {
  const appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [tickets, setTickets] = useState([]);
  let [time, setTime] = useState([]);
  let [group, setGroup] = useState(1);
  const [info, setInfo] = useState({});
  let [allGroups, setAllGroups] = useState([]);
  const [chatTimeGraph, setChatTimeGraph] = useState({});
  let [pendingTickets, setPendingTickets] = useState([]);
  const [trends, setTrends] = useState({
    resolution: {
      "Chat Connect": {
        "<1 min": [],
        "<5 min": [],
        "<10 min": [],
      },
      Bot: {
        "<1 min": [],
        "<5 min": [],
        "<10 min": [],
      },
      "CX Support": {
        "<1 min": [],
        "<5 min": [],
        "<10 min": [],
        "<20 min": [],
      },
    },
    wait: {
      "Chat Connect": {
        "<1 min": [],
        "<5 min": [],
        "<10 min": [],
      },
    },
  });

  useEffect(
    function () {
      appContext.setTitle("RTM Dashboard");
      getPendingTickets();
      get_group_details();
      get_conversation_metrics();
      get_ticket_details();
      get_conversation_details();
      get_ticket_metrics();
    },
    [appContext.reload]
  );

  function get_ticket_metrics() {
    get_data(`${API_URL}/crux/ticket/trends/v1/`, appContext).then(function (
      data
    ) {
      if (data) {
        setTrends(data?.data?.trend_dict);
        setLoader(false);
      }
    });
  }
  function get_conversation_metrics() {
    get_data(`${API_URL}/neon/conversation/metrics/v1/`, appContext).then(
      function (data) {
        if (data) {
          setInfo({
            pendingData: data?.data?.ct_dict["1"],
            assignedData: data?.data?.ct_dict["2"],
            resolvedData: data?.data?.ct_dict["4"],
            botData: data?.data?.ct_dict["5"],
          });
        }
      }
    );
  }

  function get_ticket_details() {
    get_data(`${API_URL}/crux/ticket/dashboard/v1/`, appContext).then(function (
      data
    ) {
      if (data) {
        setTickets({
          total_tickets: data?.data?.total_ticket_count,
          pending_tickets: data?.data?.pending_ticket_count,
          resolved_tickets: data?.data?.resolve_ticket_count,
          due_tickets: data?.data?.due_today,
          overdue_tickets: data?.data?.over_due_tickets,
        });
        setTime([
          {
            label: "Average first response time",
            value: data.data.avg_first_response_time,
          },
          {
            label: "Average ticket resolve time",
            value: data.data.avg_ticket_resolve_time,
          },
        ]);
      }
    });
  }
  function get_group_details() {
    get_data(`${API_URL}/crux/group/v1/`, appContext).then(function (data) {
      if (data) {
        setAllGroups(data?.data);
      }
    });
  }

  function get_conversation_details() {
    get_data(`${API_URL}/neon/conversation/dashboard/v1/`, appContext).then(
      function (data) {
        if (data) {
          setChatTimeGraph(data?.data);
        }
      }
    );
  }

  function getPendingTickets() {
    get_data(`${API_URL}/crux/pending/tickets/v1/`, appContext).then(function (
      data
    ) {
      if (data) {
        setPendingTickets(data?.data);
      }
    });
  }

  return (
    <div className={styles.home}>
      <Navbar group={group} setGroup={setGroup} allGroups={allGroups} />

      <div className={styles.rtm_container}>
        <PendingTickets pendingTickets={pendingTickets} />
        {/* <FRT /> */}
        {loader ? (
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className={styles.metrics_container}>
              <div className={styles.metrics_div}>
                <TicketTrendsMetrics data={tickets} />
              </div>
              <div className={styles.metrics_div}>
                <ConversationMetrics info={info} />
              </div>
            </div>

            <div className={styles.outer_container}>
              <div className={styles.chartGraphs}>
                <PercentageDateGraph
                  data={trends["resolution"]}
                  title="Resolution Percentage VS Date"
                />
                <PercentageDateGraph
                  data={trends["wait"]}
                  title="Wait Percentage VS Date"
                />
              </div>
              <div className={styles.chartGraphs}>
                <ChatTimeGraph data={chatTimeGraph} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RTM;
