import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import styles from "../../css/Flow.module.css";
import FlowDialogue from "./FlowDialogue";

function Accordion({ item, dialogues, activeFlow, setActiveFlow }) {
  function flowHandler() {
    setActiveFlow(item);
  }

  return (
    <div className={styles.faq_wrapper}>
      <div className={styles.faq_details} onClick={flowHandler}>
        <span className={styles.faq_heading}>{item.name}</span>
        <span>
          {activeFlow.id == item.id ? (
            <RiArrowUpSLine className={styles.arrow_icon} />
          ) : (
            <RiArrowDownSLine className={styles.arrow_icon} />
          )}
        </span>
      </div>
      {activeFlow.id == item.id ? (
        dialogues.length > 0 ? (
          activeFlow?.id == item.id ? (
            dialogues?.map(function (element, idx) {
              return <FlowDialogue key={idx} dialogue={element} />;
            })
          ) : (
            <></>
          )
        ) : (
          <div className={styles.extra_details}>
            <div className={styles.payment_info}>
              <div className={styles.heading}>No Dialogues available</div>
            </div>
          </div>
        )
      ) : (
        <></>
      )}
    </div>
    // </div>
  );
}

export default Accordion;
