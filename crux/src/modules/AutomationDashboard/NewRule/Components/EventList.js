import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import Events from "./Events";
function EventList({
  handleEventData,
  event,
  setEvent,
  handleAddEvent,
  countIndex,
  error,
  automationData,
}) {
  const [selectedOption, setSelectedOption] = useState("any");
  useEffect(() => {
    setSelectedOption(event?.match_type);
  }, [event]);

  return (
    <div className={styles.condition_container}>
      <div className={styles.condition_item1}>
        <div className={styles.radio_item}>
          <input
            type="radio"
            value="any"
            checked={selectedOption == "any"}
            onChange={() => {
              setSelectedOption("any");
              handleEventData("any", countIndex);
            }}
            className={styles.pointer}
            id="or"
          />
          <label htmlFor="or" className={styles.pointer}>
            Match ANY of the below
          </label>
        </div>
        <div className={styles.radio_item}>
          <input
            type="radio"
            value="all"
            checked={selectedOption == "all"}
            onChange={() => {
              setSelectedOption("all");
              handleEventData("all", countIndex);
            }}
            className={styles.pointer}
            id="and"
          />
          <label htmlFor="and" className={styles.pointer}>
            Match ALL of the below
          </label>
        </div>
      </div>
      <div className={styles.w_full}>
        {event?.properties?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Events
                index={countIndex}
                item={item}
                event={event}
                idx={idx}
                selectedOption={selectedOption}
                setEvent={setEvent}
                automationData={automationData}
              />
            </React.Fragment>
          );
        })}
      </div>
      <div
        className={
          error
            ? `${styles.condition_item3} ${styles.error_condition}`
            : styles.condition_item3
        }
      >
        <button
          className={styles.new_condition_add}
          onClick={() => handleAddEvent(countIndex, selectedOption)}
          type="button"
        >
          <span className={styles.plus_icon}>+</span>
          Add new Event
        </button>
      </div>
    </div>
  );
}

export default EventList;
