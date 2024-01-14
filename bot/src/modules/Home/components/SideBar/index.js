import React from "react";
import styles from "../../css/Flow.module.css";
import Accordion from "./Accordion";
import CreateFlow from "./CreateFlow";
import CreateProperty from "./CreateProperty";

function SideBar({ activeFlow, setActiveFlow, flows, dialogues, setFlow }) {
  return (
    <div className={styles.flows_container}>
      <div className={styles.faq_div_wrapper}>
        <div className={styles.flow_header}>
          <div className={styles.flow_subheading}>Dialogue Flow</div>
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <CreateFlow />
            <CreateProperty />
          </div>
        </div>
        {flows?.map(function (item, idx) {
          return (
            <Accordion
              item={item}
              dialogues={dialogues}
              key={idx}
              activeFlow={activeFlow}
              setActiveFlow={setActiveFlow}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
