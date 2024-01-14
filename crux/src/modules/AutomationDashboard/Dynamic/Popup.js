import React, { useState } from "react";
import styles from "./popup.module.css";
import PopupList from "./PopupList";
import { ReactComponent as Close } from "../../../assets/close.svg";
import { ReactComponent as Search } from "../../../assets/Automation/search.svg";
const ticketData = [
  { label: "id", value: "id" },
  { label: "name", value: "name" },
  { label: "value", value: "value" },
];

const popupData = [
  { label: "ticket.id", value: "ticket.id" },
  { label: "ticket.name", value: "ticket.name" },
  { label: "ticket.value", value: "ticket.value" },
  { label: "ticket.key", value: "ticket.key" },
  { label: "ticket.label", value: "ticket.label" },
  { label: "ticket.start", value: "ticket.start" },
  { label: "ticket.end", value: "ticket.end" },
  { label: "ticket.done", value: "ticket.done" },
  { label: "ticket.it", value: "ticket.it" },
  { label: "ticket.again", value: "ticket.again" },
];

const Popup = ({ handleAppend, setShow }) => {
  let [query, setQuery] = useState("");

  function handleClick(item) {
    handleAppend(`{{${item}}}`);
  }
  return (
    <div className={styles.popup_container}>
      <h3 className={styles.popup_header}>
        Placeholder{" "}
        <span style={{ cursor: "pointer" }} onClick={() => setShow(false)}>
          <Close />
        </span>
      </h3>

      <div className={styles.search_box}>
        <span className={styles.search_icon}>
          <Search />
        </span>
        <input
          type="text"
          className={styles.placeholder_input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.popup_body}>
        {query !== ""
          ? popupData
              ?.filter((item) =>
                item?.label?.toLowerCase()?.includes(query?.toLowerCase())
              )
              ?.map((item, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <PopupList
                      ticketData={ticketData}
                      popupData={popupData}
                      item={item}
                      handleClick={handleClick}
                    />
                  </React.Fragment>
                );
              })
          : popupData?.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <PopupList
                    ticketData={ticketData}
                    popupData={popupData}
                    item={item}
                    handleClick={handleClick}
                  />
                </React.Fragment>
              );
            })}
      </div>
    </div>
  );
};

export default Popup;
