import React, { useState } from "react";
import styles from "./css/style.module.css";
import TabBar from "../../components/TabBar";
import { useNavigate } from "react-router-dom";
import TicketCreation from "./components/TicketCreation";
import TicketTrigger from "./components/TicketTrigger";
import TicketUpdate from "./components/TicketUpdate";
function AutomationDashboard() {
  const navigate = useNavigate();
  let [searchType, setSearchType] = useState("creation");

  //handle redirect to create rule page
  function handleAddRule() {
    navigate(`/workflows/automation/newrule/${searchType}`);
  }
  return (
    <div className={styles.container}>
      <label className={styles.rules_label}>Rules that run on:</label>
      <div className={styles.tab_container}>
        {/* Tabbar for ticket type */}
        <TabBar
          tabs={[
            {
              title: "Ticket Creation",
              execute: { func: setSearchType, value: "creation" },
            },
            {
              title: "Time Triggers",
              execute: { func: setSearchType, value: "trigger" },
            },
            {
              title: "Ticket Updates",
              execute: { func: setSearchType, value: "update" },
            },
          ]}
          styles={styles}
        />
      </div>
      <div className={styles.rule_add_container}>
        <span>Excecuting all matching rules</span>
        <div className={styles.btn_container}>
          <button className={styles.new_rule_btn} onClick={handleAddRule}>
            New Rule
          </button>
        </div>
      </div>
      {/* searchType component handler */}
      {searchType == "creation" ? (
        <TicketCreation searchType={searchType} />
      ) : searchType == "trigger" ? (
        <TicketTrigger searchType={searchType} />
      ) : (
        <TicketUpdate searchType={searchType} />
      )}
    </div>
  );
}

export default AutomationDashboard;
