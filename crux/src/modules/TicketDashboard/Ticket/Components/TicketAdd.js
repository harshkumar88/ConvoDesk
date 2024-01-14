import React, { useContext, useState, useEffect } from "react";
import styles from "../css/style.module.css";
import { AppContext } from "../../../../App";
function TicketAdd({ item, ticketData, setTicketData }) {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({});

  //effect for set data state with ticket item
  useEffect(() => {
    setData({ ...item });
  }, [item]);

  //handles form input values
  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  //handles new item added
  function handleSubmit(e) {
    e.preventDefault();
    let updatedData = ticketData?.map((info) => {
      if (info.uid == data?.uid) {
        return { ...data, isNew: false };
      }
      return info;
    });
    appContext.setAlert("Successfully Add", "alert_success");

    setTicketData([...updatedData]);
  }

  //handles the delete of ticket item
  function handleDelete() {
    let updatedData = ticketData?.filter((info) => {
      return info.uid != data?.uid;
    });

    setTicketData([...updatedData]);
  }

  return (
    <form className={styles.ticket_wrapper} onSubmit={handleSubmit}>
      <div className={styles.ticket_box}>
        <div className={styles.item_flex_box}>
          <span className={styles.icon_style}>{data?.label}</span>
          <span>New {data?.value}</span>
        </div>
        <div className={styles.ticket_item}>
          <div className={styles.item}>
            <label className={styles.item_label}>Label for agents</label>
            <input
              type="text"
              className={styles.item_input}
              required
              value={data?.label1}
              name="label1"
              onChange={handleChange}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.item_label}>Label for customer</label>
            <input
              type="text"
              className={styles.item_input}
              required
              value={data?.label2}
              name="label2"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.ticket_btns}>
          <button
            className={styles.cancel_btn}
            type="button"
            onClick={handleDelete}
          >
            Cancel
          </button>
          <button className={styles.submit_btn}>Save Field</button>
        </div>
      </div>
    </form>
  );
}

export default TicketAdd;
