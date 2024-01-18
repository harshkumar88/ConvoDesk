import React, { useEffect, useState } from "react";
import TabBar from "../TabBar";
import styles from "./css/style.module.css";
import { useNavigate } from "react-router-dom";
import { ICON_URL } from "../../config";
function WorkFlowHeader() {
  const [searchType, setSearchType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setSearchType("ticket_fields");
  }, []);

  useEffect(() => {
    routeNavigation(searchType);
  }, [searchType]);

  function routeNavigation(type) {
    if (type == "ticket_fields") {
      navigate("/workflows/ticket/dashboard");
    } else if (type == "automation") {
      navigate("/workflows/automation/dashboard");
    } else if (type == "ai_response") {
      navigate("/workflows/ai/response");
    } else if (type == "canned_response") {
      navigate("/workflows/canned/response");
    }
  }

  return (
    <div className={styles.team_container}>
      <p className={styles.team_label}>Workflow</p>
      <TabBar
        tabs={[
          {
            title: "Ticket Fields",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/ticket-fields-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Customize your ticket type to categorize, prioritize, and route tickets efficiently.",
            execute: { func: setSearchType, value: "ticket_fields" },
            callbackfn: routeNavigation,
          },
          {
            title: "Automation",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/automations-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Eliminate repetitive tasks such as categorization and routing by creating rules",
            execute: { func: setSearchType, value: "automation" },
            callbackfn: routeNavigation,
          },

          {
            title: "AI Response",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/activity-export-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Eliminate repetitive tasks such as categorization and routing by creating rules",

            execute: { func: setSearchType, value: "ai_response" },
            callbackfn: routeNavigation,
          },
          {
            title: "Canned Response",
            icon: `${ICON_URL}/production/a/assets/images/new-admin/helpdesk-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg`,
            sub_title:
              "Eliminate repetitive tasks such as categorization and routing by creating rules",

            execute: { func: setSearchType, value: "canned_response" },
            callbackfn: routeNavigation,
          },
        ]}
        sub_title={true}
        styles={styles}
      />
    </div>
  );
}

export default WorkFlowHeader;
