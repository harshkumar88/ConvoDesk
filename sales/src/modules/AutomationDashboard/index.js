import React, { useContext, useEffect, useState } from "react";
import styles from "./css/style.module.css";
import TabBar from "../../components/TabBar";
import { useNavigate } from "react-router-dom";
import TicketCreation from "./components/TicketCreation";
import TicketTrigger from "./components/TicketTrigger";
import TicketUpdate from "./components/TicketUpdate";
import { AppContext } from "../../App";
import { get_data } from "../../ReactLib/networkhandler";
function AutomationDashboard() {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  let [searchType, setSearchType] = useState("creation");
  const [automationData, setAutomationData] = useState([]);

  //handle redirect to create rule page
  function handleAddRule() {
    navigate(`/automation/newrule/${searchType}`);
  }

  useEffect(() => {
    setLoader(true);
    fetchAutomationData(searchType);
  }, [appContext.reload, searchType]);

  async function fetchAutomationData(type) {
    const data = await get_data(
      `https://qa1.crofarm.com/convo/automation/all/v1/?automation_type=${type}`,
      appContext
    );

    setAutomationData(data?.data);
    setLoader(false);
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
            // {
            //   title: "Time Triggers",
            //   execute: { func: setSearchType, value: "trigger" },
            // },
            {
              title: "Ticket Updates",
              execute: { func: setSearchType, value: "updation" },
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

      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {searchType == "creation" ? (
            <TicketCreation
              searchType={searchType}
              automationData={automationData}
            />
          ) : searchType == "trigger" ? (
            <TicketTrigger
              searchType={searchType}
              automationData={automationData}
            />
          ) : (
            <TicketUpdate
              searchType={searchType}
              automationData={automationData}
            />
          )}
        </>
      )}
    </div>
  );
}

export default AutomationDashboard;
