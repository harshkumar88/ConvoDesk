import React from "react";
import styles from "../../css/style.module.css";
import TabBar from "../../../../../components/TabBar";
function TabBarLayout(props) {
  const { setSearchType } = props.tabBarContext;
  return (
    <TabBar
      tabs={[
        {
          title: "Issues",
          execute: { func: setSearchType, value: "Issues" },
        },
        {
          title: "Outcome",
          execute: { func: setSearchType, value: "Outcome" },
        },
        { title: "Type", execute: { func: setSearchType, value: "Type" } },
      ]}
      styles={styles}
    />
  );
}

export default TabBarLayout;
