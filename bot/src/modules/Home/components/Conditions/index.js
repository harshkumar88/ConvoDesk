import React from "react";
import styles from "./css/style.module.css";
import ChildCondition from "./components/ChildCondition";
import { ReactComponent as ConditionIcon } from "../../../../assets/Condition.svg";
import { put_data } from "../../../../networkHandler";
import { API_URL } from "../../../../config";

function Condition({
  setActive,
  conditions,
  setConditions,
  dialogues,
  activeDialogue,
  appContext,
}) {
  function saveHandler() {
    console.log("saving data ", activeDialogue.id, conditions);
    let payload = {
      dialogue_id: activeDialogue.id,
      data: { conditions: conditions },
    };

    put_data(`${API_URL}/neon/dialogue/v1/`, payload, appContext, true);

    setActive(false);
  }
  function cancelHandler() {
    setActive(false);
  }
  function addCondition() {
    let lastIdx = -1;
    if (conditions.length) {
      lastIdx = conditions[conditions.length - 1]["idx"];
    }
    const arr = [
      ...conditions,
      {
        lhs: "",
        rhs: "",
        operator: "",
        expressions: [],
        success: {},
        error: {},
        idx: lastIdx + 1,
      },
    ];
    setConditions(arr);
  }
  return (
    <>
      <div className={styles.condition_wrapper}>
        <div className={styles.conditions}>
          {conditions.length > 0 ? (
            <>
              <div className={styles.condition_header}>
                <h2>Conditions (Dialogue {activeDialogue.id})</h2>
                <button
                  className={styles.newCondition_btn}
                  onClick={addCondition}
                >
                  + New condition
                </button>
              </div>
              <p className={styles.text}>
                Conditions are used to interlink dialogues based on certain
                logic or values.
              </p>
              {conditions?.map(function (item, idx) {
                return (
                  <ChildCondition
                    data={item}
                    conditions={conditions}
                    setConditions={setConditions}
                    dialogues={dialogues}
                    key={idx}
                  />
                );
              })}
            </>
          ) : (
            <>
              <div className={styles.condition_header}>
                <h2>Conditions (Dialogue {activeDialogue.id})</h2>
              </div>
              <div className={styles.no_condition_container}>
                <div className={styles.no_condition_wrapper}>
                  <ConditionIcon />
                  <p className={styles.text} style={{ textAlign: "center" }}>
                    Conditions are used to interlink dialogues based on certain
                    logic or values.
                  </p>
                  <h3>No condition found.</h3>
                  <button
                    className={styles.newCondition_btn}
                    onClick={addCondition}
                  >
                    + New condition
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.btn_div}>
        <button onClick={saveHandler} className={styles.save_btn}>
          Save & Close
        </button>
        <button onClick={cancelHandler} className={styles.cancel_btn}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default Condition;
