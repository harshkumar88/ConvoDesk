import React, { useEffect, useState } from "react";
import TabBar from "../TabBar";
import styles from "./css/style.module.css";
import { useNavigate } from "react-router-dom";

function TeamsHeader() {
  const [searchType, setSearchType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchType("agents");
  }, []);
  useEffect(() => {
    routeNavigation(searchType);
  }, [searchType]);

  function routeNavigation(type) {
    if (type == "agents") {
      navigate("/teams/agents");
    } else if (type == "group") {
      navigate("/teams/group");
    } else if (type == "business_hour") {
      navigate("/teams/business-hour");
    }
  }
  return (
    <div className={styles.team_container}>
      <p className={styles.team_label}>Team</p>
      <TabBar
        tabs={[
          {
            title: "Agents",
            icon: "https://fassets.freshdesk.com/production/a/assets/images/new-admin/agents-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg",
            sub_title:
              "Define agents' scope of work, type, language, and other details.",
            execute: { func: setSearchType, value: "agents" },
            callbackfn: routeNavigation,
          },
          {
            title: "Group",
            icon: "https://fassets.freshdesk.com/production/a/assets/images/new-admin/groups-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg",
            sub_title:
              "Organize agents and receive notifications on unattended tickets. ",
            execute: { func: setSearchType, value: "group" },
            callbackfn: routeNavigation,
          },
          {
            title: "Business Hour",
            icon: "https://fassets.freshdesk.com/production/a/assets/images/new-admin/business-hours-d57b27355779929be90613ee0065a89204701426b120b566450cfffc7c806394.svg",
            sub_title:
              "Define working hours and holidays to set expectations with customers",
            execute: { func: setSearchType, value: "business_hour" },
            callbackfn: routeNavigation,
          },
          {
            title: "Business Hour",
            hidden: true,
            sub_title:
              "Define working hours and holidays to set expectations with customers",
            execute: { func: setSearchType, value: "business" },
            callbackfn: routeNavigation,
          },
        ]}
        sub_title={true}
        styles={styles}
      />
    </div>
  );
}

export default TeamsHeader;
