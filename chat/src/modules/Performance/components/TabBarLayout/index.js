import React from "react";
import TabBar from "../../../Home/components/TabBar";
import styles from "../../css/style.module.css";
function TabBarLayout(props) {
  const { setTab } = props.tabBarContext;
  return (
    <TabBar
      tabs={[
        {
          title: "Resolved",
          execute: {
            func: setTab,
            value: false,
          },
        },
        {
          title: "Open Chat",
          execute: {
            func: setTab,
            value: true,
          },
        },
      ]}
      styles={styles}
    />
  );
}

export default TabBarLayout;
