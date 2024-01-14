import React, { useContext } from "react";
import { BsTelephoneOutbound } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { put_data } from "../../../networkHandler";

import styles from "../css/ticket.module.css";
function User({
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
    <NavLink to={`/lead/details/${item.id}`} className={styles.ticket}>
      <span className={styles.name}>
        <b className={styles.avatar}>
          {item?.name?.substr(0, 1)?.toUpperCase()}
        </b>
        <b className={styles.usr_name}>{item?.name}</b>
      </span>
      <span>{item?.job_title_name}</span>
      <span>{item?.status_name}</span>

      <span>{item?.agent}</span>

      <span>{item?.retention_slot_id}</span>
      <span>{item?.retention_order_count}</span>
      <span>{item?.coupon_code ? item?.coupon_code : "-"}</span>
      <span>{item?.balance}</span>
      <span>{item?.order_count}</span>
      <span>{item?.recharge_sold}</span>
      <span>{item?.recharge_sold_slot ? item?.recharge_sold_slot : "-"}</span>
      <span>
        {item?.reward_wallet_share} ({item?.reward_wallet_percentage_used}%)
      </span>
      <span>{item?.n_slot_id}</span>
      <span>{item?.updated_at}</span>
    </NavLink>
  );
}

export default User;
