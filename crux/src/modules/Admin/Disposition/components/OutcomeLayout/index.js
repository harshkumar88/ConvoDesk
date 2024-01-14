import React from "react";
import styles from "../../css/style.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import Outcome from "./Outcome";
export default function OutcomeLayout(props) {
  const {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    newOutcome,
    setNewOutcome,
    newBtn,
    handleAdd,
    addNewHandler,
  } = props.outcomeContext;
  return (
    <div className={styles.outcomeContainer}>
      <li className={styles.list_container}>
        <h1 className={styles.list_heading}>Outcome</h1>
        <ul className={styles.list}>
          {dispositionDict.ticket_outcome?.map(function (item, idx) {
            return (
              <Outcome
                key={idx}
                label={item?.label}
                value={item?.value}
                type="ticket_outcome"
                clickHandler={(type, value) => handler(type, value)}
                changeHandler={(data, type, value, prevLabel) =>
                  putDataHandler(data, type, value, prevLabel)
                }
                deleteHandler={(type, value) => deleteDataHandler(type, value)}
                activeValue={active.ticket_outcome}
              />
            );
          })}
          {newBtn.outcome ? (
            <li className={styles.list_item}>
              <input
                type="text"
                placeholder="Enter new Outcome"
                value={newOutcome}
                className={styles.new_issue}
                onChange={function (e) {
                  setNewOutcome(e.target.value);
                }}
              />
              <span
                className={styles.list_icon}
                onClick={() => handleAdd("ticket_outcome")}
              >
                <MdCreateNewFolder />
              </span>
            </li>
          ) : (
            <button
              className={styles.add_btn}
              onClick={() => addNewHandler("outcome")}
            >
              <AiFillPlusCircle />
            </button>
          )}
        </ul>
      </li>
    </div>
  );
}
