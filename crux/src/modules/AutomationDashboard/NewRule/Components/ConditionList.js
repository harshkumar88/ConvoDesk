import React, { useEffect, useState } from "react";
import Conditions from "./Conditions";
import styles from "../css/style.module.css";
function ConditionList({
  handleConditionData,
  conditions,
  setConditions,
  handleAddCondition,
  countIndex,
  error,
  automationData,
}) {
  const [selectedOption, setSelectedOption] = useState("any");

  useEffect(() => {
    setSelectedOption(conditions?.match_type);
  }, [conditions, automationData]);

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
              handleConditionData("any", countIndex);
            }}
            className={styles.pointer}
            id="orr"
          />
          <label htmlFor="orr" className={styles.pointer}>
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
              handleConditionData("all", countIndex);
            }}
            className={styles.pointer}
            id="andd"
          />
          <label htmlFor="andd" className={styles.pointer}>
            Match ALL of the below
          </label>
        </div>
      </div>
      <div className={styles.w_full}>
        {conditions?.properties?.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Conditions
                index={countIndex}
                item={item}
                conditions={conditions}
                idx={idx}
                selectedOption={selectedOption}
                setConditions={setConditions}
                automationData={automationData}
                handleAddCondition={handleAddCondition}
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
          onClick={() => handleAddCondition(countIndex, selectedOption)}
          type="button"
        >
          <span className={styles.plus_icon}>+</span>
          Add new condition
        </button>
      </div>
    </div>
  );
}

export default ConditionList;
