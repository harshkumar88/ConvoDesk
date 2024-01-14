import React from "react";
import styles from "../../css/Flow.module.css";
import { Link } from "react-scroll";
import { scroller } from "react-scroll";

function FlowDialouge({ dialogue }) {
  function scroll(dialogue_id) {
    console.log("scrolling", dialogue_id);
    scroller.scrollTo(`bot_${dialogue_id}`, {
      containerId: "crofarm_bot",
      duration: 800,
      offset: -50,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }
  function text() {
    switch (dialogue?.type) {
      case "T":
        return `${
          dialogue && dialogue.text && dialogue.text.content
            ? dialogue.text.content
            : "-"
        }`;
      case "B":
        return `${
          dialogue && dialogue.button && dialogue.button.content
            ? dialogue.button.content
            : "-"
        }`;
      case "L":
        return `${
          dialogue && dialogue.list && dialogue.list.content
            ? dialogue.list.content
            : "-"
        }`;
      case "C":
        return `Carousel`;
      case "F":
        return `Image`;
    }
  }
  return (
    <div
      className={styles.extra_details}
      onClick={function () {
        scroll(dialogue.id);
      }}
    >
      <div className={styles.payment_info}>
        <div className={styles.heading}>
          <span className={styles.flow_number}>{`${
            dialogue && dialogue.id ? dialogue.id : ""
          } `}</span>
          {text()}
        </div>
      </div>
    </div>
  );
}

export default FlowDialouge;
