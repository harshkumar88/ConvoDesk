import React, { useContext, useState, useEffect } from "react";
import styles from "./css/styles.module.css";
import { AppContext } from "../../App";
import WeeklyDetails from "./WeeklyDetails";
import DailyDetails from "./DailyDetails";
import { get_data } from "../../React-lib/src/networkhandler";
import { API_URL } from "../../config";
import { useParams } from "react-router-dom";
import { formatDate, convertSlot } from "../../utils/utility";
import DatePicker from "../../utils/DatePicker";
function AgentDashboard() {
  let { agent_id } = useParams();
  let appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [selectedDate, setSelectedDate] = useState({
    from_slot: formatDate(
      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    ),
    to_slot: formatDate(new Date()),
  });
  let [chartData, setChartData] = useState({});
  let [overallData, setOverallData] = useState({});
  let [chatData, setChatData] = useState({});
  let [callData, setCallData] = useState({});
  let [agentData, setAgentData] = useState({});
  let [agentId, setAgentId] = useState(agent_id);

  function handleOverallData(data) {
    setOverallData({
      "Total Tickets": data.ticket_ct,
      "Avg Resolution Time": data.avg_resolution_time,
      "Resolve Within Sla": data.resolve_within_sla,
      NPS: data.nps,
      "Average Working Time": data.break_summary.avg_working_time,
      "Average Break Time": data.break_summary.avg_break_time,
      "Working Days": data.break_summary.working_days,
    });
  }

  function handleCallData(data) {
    setCallData({
      "Total Calls": data.ticket_ct,
      "Avg Resolution Time": data.avg_resolution_time,
      "Resolution Time": data.resolution_time,
      "Resolve Within Sla": data.resolve_within_sla,
    });
  }

  function handleChatData(data) {
    setChatData({
      "Chat Count": data.chat_ct,
      "Avg Resolution Time": data.avg_resolution_time,
      "Resolution Time": data.resolution_time,
      "Resolve Within Sla": data.resolve_within_sla,
    });
  }

  useEffect(() => {
    setLoader(true);
    if (!agent_id) {
      agent_id = localStorage.getItem("agent-id");
    }
    setAgentId(agent_id);
    get_data(`${API_URL}/crux/agent/v1/?agent_id=${agent_id}`, appContext).then(
      function (data) {
        if (data) {
          setAgentData(data);
        }
      }
    );
  }, [agent_id]);

  useEffect(
    function () {
      setLoader(true);
      appContext.setTitle("Agent Dashboard");
      if (!agent_id) {
        agent_id = localStorage.getItem("agent-id");
      }
      setAgentId(agent_id);
      get_data(
        `${API_URL}/crux/agent/metrics/details/v1/?from_slot=${selectedDate.from_slot}&to_slot=${selectedDate.to_slot}&agent_id=${agent_id}`,
        appContext
      ).then(function (data) {
        if (data) {
          setChartData(data?.data);
          handleOverallData(data?.data);
          handleChatData(data?.data?.chat);
          handleCallData(data?.data?.ticket);
          setLoader(false);
        }
      });
    },
    [appContext.reload, selectedDate]
  );

  function handleDate(from_slot, to_slot) {
    setSelectedDate({ from_slot: from_slot, to_slot: to_slot });
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <div className={styles.round}>{agentData.name?.charAt(0)}</div>
          <div className={styles.agent_details}>
            <span className={styles.name}>{agentData.name}</span>
            <span>{agentData.email}</span>
            {/* <span>Login time 08:12 AM</span> */}
          </div>
        </div>
        <div className={styles.date_picker_container}>
          <DatePicker callBackfn={handleDate} />
        </div>
      </div>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <WeeklyDetails chartData={chartData} />
          <DailyDetails
            overallData={overallData}
            chatData={chatData}
            callData={callData}
            agent_id={agentId}
          />
        </>
      )}
      {/* <TicketDetails selectedDate={selectedDate} /> */}
    </div>
  );
}

export default AgentDashboard;
