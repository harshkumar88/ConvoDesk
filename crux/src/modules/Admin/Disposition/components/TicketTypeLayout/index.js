import React from "react";
import styles from "../../css/style.module.css";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdCreateNewFolder } from "react-icons/md";
import TicketType from "./TicketType";

function TicketTypeLayout(props) {
  const {
    dispositionDict,
    handler,
    putDataHandler,
    deleteDataHandler,
    active,
    newTicketType,
    setnewTicketType,
    newBtn,
    handleAdd,
    addNewHandler,
  } = props.ticketContext;
  return (
    <div className={styles.outcomeContainer}>
      <li className={styles.list_container}>
        <h1 className={styles.list_heading}>Type</h1>
        <ul className={styles.list}>
          {dispositionDict.ticket_type?.map(function (item, idx) {
            return (
              <TicketType
                key={idx}
                label={item?.label}
                value={item?.value}
                type="ticket_type"
                clickHandler={(type, value) => handler(type, value)}
                changeHandler={(data, type, value, prevLabel) =>
                  putDataHandler(data, type, value, prevLabel)
                }
                deleteHandler={(type, value) => deleteDataHandler(type, value)}
                activeValue={active.ticket_type}
              />
            );
          })}

          {newBtn.ticket_type ? (
            <li className={styles.list_item}>
              <input
                type="text"
                placeholder="Enter new Ticket_type"
                value={newTicketType}
                className={styles.new_issue}
                onChange={function (e) {
                  setnewTicketType(e.target.value);
                }}
              />
              <span
                className={styles.list_icon}
                onClick={() => handleAdd("ticket_type")}
              >
                <MdCreateNewFolder />
              </span>
            </li>
          ) : (
            <button
              className={styles.add_btn}
              onClick={() => addNewHandler("ticket_type")}
            >
              <AiFillPlusCircle />
            </button>
          )}
        </ul>
      </li>
    </div>
  );
}

export default TicketTypeLayout;
