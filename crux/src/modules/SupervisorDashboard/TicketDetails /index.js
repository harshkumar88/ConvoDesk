import React, { useState, useEffect, useContext } from "react";
import styles from "../css/ticket.module.css";
import { ticket_list } from "../components/seed";
import { ReactComponent as Arrow } from "../../../assets/Dashboard/Arrow.svg";
import Select from "react-select";
import { customStyles } from "../components/seed";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";

function TicketDetails({
  dateRange,
  selectedSupervisor,
  setSelectedSupervisor,
  supervisorData,
  ticketDetails,
}) {
  let navigate = useNavigate();
  let chartData = ["all", "chat", "ticket"];
  let appContext = useContext(AppContext);
  let [selectValue, setSelectValue] = useState(chartData[0]);
  let [ticketDataList, setTicketDataList] = useState({
    all: ["ticket_ct", "avg_resolution_time", "resolve_within_sla", "nps"],
    chat: ["chat_ct", "avg_resolution_time", "resolve_within_sla", "nps"],
    ticket: ["ticket_ct", "avg_resolution_time", "resolve_within_sla", "nps"],
  });

  function getAgentName(id) {
    let agent_data = appContext?.filters?.agent?.choices || [];

    for (let i of agent_data) {
      if (i.value == id) return i.label;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header_label}>
        Agent Details
        <div className={styles.header_dropdown}>
          <Select
            options={supervisorData.map((item) => {
              return { label: item.name, value: item.id };
            })}
            className={styles.chart_dropdown2}
            styles={customStyles}
            placeholder="Supervisor"
            value={supervisorData.map((item) => {
              if (item.id == selectedSupervisor)
                return { label: item.name, value: item.value };
            })} // Find the option with the selected value
            onChange={(e) => setSelectedSupervisor(e.value)}
          />
          <Select
            options={chartData.map((item) => {
              if (item == "ticket") {
                return { label: "calls", value: item };
              } else return { label: item, value: item };
            })}
            className={styles.chart_dropdown}
            styles={customStyles}
            placeholder="Chats"
            value={chartData.map((item) => {
              if (item == selectValue && selectValue == "ticket") {
                return { label: "calls", value: item };
              } else if (item == selectValue) {
                return { label: item, value: item };
              }
            })} // Find the option with the selected value
            onChange={(e) => {
              setSelectValue(e.value);
            }}
          />
        </div>
      </div>
      <div className={styles.list_container}>
        <label>Agent name</label> <label>Total tickets</label>
        <label className={styles.flex}>Avg. Resolution Time</label>
        <label>Resolve Within SLA</label>
        <label>NPS</label>
        <label className={styles.hidden}>Arrow</label>
      </div>
      <div className={styles.list_item}>
        {ticketDetails.map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() =>
                navigate(`/analytics/agent/dashboard/${item.agent_id}`)
              }
              className={styles.cursor_pointer}
            >
              <div className={styles.list_info}>
                <span>{getAgentName(item.agent_id)}</span>
                <span>
                  {selectValue == "all"
                    ? item[ticketDataList[selectValue][0]]
                    : item[selectValue][ticketDataList[selectValue][0]]}
                </span>
                <span>
                  {selectValue == "all"
                    ? item[ticketDataList[selectValue][1]]
                    : item[selectValue][ticketDataList[selectValue][1]]}
                </span>
                <span>
                  {selectValue == "all"
                    ? item[ticketDataList[selectValue][2]]
                    : item[selectValue][ticketDataList[selectValue][2]]}
                </span>
                <span>
                  {selectValue == "all"
                    ? item[ticketDataList[selectValue][3]]
                    : item[ticketDataList[selectValue][3]]}
                </span>
                <span className={styles.flex_02}>
                  <Arrow />
                </span>
              </div>
              {ticketDetails.length - 1 != idx && (
                <div className={styles.line}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TicketDetails;
