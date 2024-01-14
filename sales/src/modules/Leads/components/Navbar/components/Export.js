import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../App";
import { get_data, post_data } from "../../../../../networkHandler";
import PopUp from "../../../../../utils/Popup";
import Select from "react-select";
import styles from "./style.module.css";
import { API_URL } from "../../../../../config";
import TabBar from "../../../../../components/TabBar";

function Export({ groups, supervisors }) {
  let [close, setClose] = useState(false);
  let [startSlot, setStartSlot] = useState();
  let [endSlot, setEndSlot] = useState();
  const [filter, setFilter] = useState("");
  const [filterTabs, setFilterTabs] = useState([]);
  const appContext = useContext(AppContext);

  useEffect(
    function () {
      setClose(false);
      setFilter("n_slot_id");
      setFilterTabs([
        {
          title: "Created Slot",
          execute: { func: setFilter, value: "n_slot_id" },
        },
        {
          title: "Retention Slot",
          execute: { func: setFilter, value: "retention_slot_id" },
        },
      ]);
    },
    [appContext.reload]
  );
  const download = function (data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
    a.click();
  };

  const csvmaker = function (data) {
    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    data.map(function (item, idx) {
      const values = Object.values(item).join(",");
      csvRows.push(values);
    });

    return csvRows.join("\n");
  };
  function handleGet(e) {
    e.preventDefault();
    console.log(startSlot, endSlot);
    setClose(true);
    get_data(
      `${API_URL}/crux/sales/export/v1/?start_slot=${startSlot}&end_slot=${endSlot}&filter_type=${filter}`,
      appContext
    ).then(function (data) {
      if (data) {
        console.clear();
        console.log(data);
        const csvdata = csvmaker(
          data.data.map(function (item, idx) {
            return {
              "Created At": item.n_slot_id,
              "Lead ID": item.id,
              Phone: item.phone,
              "Job Title": item.job_title,
              Status: item.status,
              // Outcome: item.outcome ? item.outcome : "-",
              "Sales Owner": item.agent,
              Issue: item.issue ? item.issue : "-",
              "Sub Issue": item.sub_issue ? item.sub_issue : "-",
              "Further Breakup": item.further_breakup
                ? item.further_breakup
                : "-",
              "Retention Date": item.retention_slot_id
                ? item.retention_slot_id
                : "-",
              "Retention Order Count": item.retention_order_count,
              "Last Order Slot": item.last_order_slot
                ? item.last_order_slot
                : "-",
              "Coupon Code": item?.coupon_code ? item?.coupon_code : "-",
              Balance: item.balance,
              "Wallet Share": item.wallet_share,
              "Reward wallet Share": `${item.reward_wallet_percentage_used} %`,
              "Recharge Sold": item.recharge_sold,
              "Recharge Sold Slot": item?.recharge_sold_slot
                ? item?.recharge_sold_slot
                : "-",
              "Refund Amount": item.refund_amount,
              "Order ID": item.order_id,
            };
          })
        );
        download(csvdata);
      }
    });
  }
  return (
    <PopUp btnName={"Export"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Export Leads</h1>
      <TabBar
        tabs={filterTabs}
        styles={{
          tab_container: styles.delivery_tab_container,
          tab: styles.delivery_tab,
          active: styles.delivery_active_tab,
        }}
      />
      <form className={styles.form} onSubmit={handleGet}>
        <div className={styles.input_container}>
          <label className={styles.label}>From</label>
          <input
            type="date"
            className={styles.input}
            onChange={function (e) {
              let date = e.target.value;
              setStartSlot(date.split("-").join("").substr(2));
            }}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>To</label>
          <input
            type="date"
            className={styles.input}
            onChange={function (e) {
              let date = e.target.value;
              setEndSlot(date.split("-").join("").substr(2));
            }}
            required
          />
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default Export;
