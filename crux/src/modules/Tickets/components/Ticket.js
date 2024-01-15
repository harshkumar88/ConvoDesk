import React, { useContext } from "react";
import { BsTelephoneOutbound } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { put_data } from "../../../ReactLib/networkhandler";

import styles from "../css/ticket.module.css";
function Ticket({
  item,
  shortHandFilters,
  select,
  tickets,
  setTickets,
  setAllSelected,
  setSelect,
}) {
  const appContext = useContext(AppContext);
  function handleCheck(e) {
    let allSelected = true;
    let anySelect = false;
    tickets.map(function (ticket, idx) {
      if (ticket.id == item.id) {
        if (!e.target.checked) {
          allSelected = false;
        }
      } else {
        if (!ticket.isChecked) {
          allSelected = false;
        }
      }
      if (!ticket.isChecked && ticket.id != item.id) {
        allSelected = false;
      }
      if (ticket.isChecked || (ticket.id == item.id && e.target.checked)) {
        anySelect = true;
      }
    });
    setSelect(anySelect);
    setAllSelected(allSelected);
    setTickets(
      tickets.map(function (ticket, idx) {
        if (item.id == ticket.id) {
          return { ...ticket, isChecked: e.target.checked };
        } else {
          return ticket;
        }
      })
    );
  }
  return (
    <div
      className={
        item.status == "R" || item.status == "C"
          ? `${styles.ticket} ${styles.disabled}`
          : `${styles.ticket}`
      }
    >
      <div className={styles.ticket_details}>
        <input
          type="checkbox"
          checked={item?.isChecked}
          className={styles.checkbox}
          onChange={handleCheck}
        />
        <div className={styles.avatar}>
          <span>A</span>
        </div>
        <NavLink
          to={`/ticket/details/${item.id}`}
          className={styles.ticket_info}
        >
          <div className={styles.tags}>
            {item?.tags.map(function (tag, idx) {
              return (
                <span
                  className={styles.tag}
                  key={idx}
                  style={{
                    backgroundColor: `${tag.bg_color}`,
                    color: `${tag.color}`,
                  }}
                >
                  {tag.name}
                </span>
              );
            })}
            {/* {item?.tags.length > 0 ? (
              item?.tags.map(function (tag, idx) {
                return (
                  <span
                    className={styles.tag}
                    key={idx}
                    style={{
                      backgroundColor: `${tag.bg_color}`,
                      color: `${tag.color}`,
                    }}
                  >
                    {tag.name}
                  </span>
                );
              })
            ) : (
              <></>
              // <span className={`${styles.tag} ${styles.newtag}`}>New</span>
            )} */}
          </div>
          <div className={styles.subject}>
            <b>{item?.subject}</b>&nbsp;
            <span className={styles.muted}>#{item?.id}</span>
          </div>
          <span className={`${styles.muted} ${styles.info}`}>
            <BsTelephoneOutbound /> {item.phone} Created&nbsp;
            {item.created_at}
            {/* • First
            response due in: 2 days */}
          </span>
          <span className={`${styles.muted} ${styles.small}`}>
            {item.agent}&nbsp;
          </span>
        </NavLink>
      </div>
      <div className={styles.ticket_cta}>
        {shortHandFilters.map(function (filter, idx) {
          return (
            <select
              className={styles.select}
              value={item[filter.key]}
              onChange={function (e) {
                let payload = {};
                payload[filter.key] = e.target.value;
                put_data(
                  `${API_URL}/crux/update/ticket/v1/`,
                  { ticket_id: item.id, data: payload },
                  appContext
                );
              }}
            >
              <option disabled>Select {filter.label}</option>
              {filter.choices.map(function (element, index) {
                return <option value={element.value}>{element.label}</option>;
              })}
            </select>
          );
        })}
      </div>
    </div>
  );
}

export default Ticket;
