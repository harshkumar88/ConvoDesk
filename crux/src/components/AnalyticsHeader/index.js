import React, { useEffect, useState } from "react";
import TabBar from "../TabBar";
import styles from "./css/style.module.css";
import { useNavigate } from "react-router-dom";
import { ICON_URL } from "../../config";
function AnalyticsHeader() {
  const [searchType, setSearchType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setSearchType("supervisor_dashboard");
  }, []);

  useEffect(() => {
    routeNavigation(searchType);
  }, [searchType]);

  function routeNavigation(type) {
    if (type == "supervisor_dashboard") {
      navigate("/analytics/supervisor/dashboard");
    } else if (type == "agent_dashboard") {
      navigate("/analytics/agent/dashboard");
    } else if (type == "risk_dashboard") {
      navigate("/analytics/risk/dashboard");
    }
  }

  return (
    <div className={styles.team_container}>
      <p className={styles.team_label}>Analytics</p>
      <TabBar
        tabs={[
          {
            title: "Supervisor Dashboard",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/ticket-fields-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Customize your ticket type to categorize, prioritize, and route tickets efficiently.",
            execute: { func: setSearchType, value: "supervisor_dashboard" },
            callbackfn: routeNavigation,
          },
          {
            title: "Agent Dashboard",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/automations-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Eliminate repetitive tasks such as categorization and routing by creating rules",
            execute: { func: setSearchType, value: "agent_dashboard" },
            callbackfn: routeNavigation,
          },

          {
            title: "Risk Dashboard",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/activity-export-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Eliminate repetitive tasks such as categorization and routing by creating rules",

            execute: { func: setSearchType, value: "risk_dashboard" },
            callbackfn: routeNavigation,
          },
          // {
          //   title: "Canned Response",
          //   hidden: true,
          //   icon: `${ICON_URL}/production/a/assets/images/new-admin/helpdesk-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
          //   sub_title:
          //     "Eliminate repetitive tasks such as categorization and routing by creating rules",

          //   execute: { func: setSearchType, value: "canned_response" },
          //   callbackfn: routeNavigation,
          // },
        ]}
        sub_title={true}
        styles={styles}
      />
    </div>
  );
}

export default AnalyticsHeader;
