import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import { ReactComponent as TicketIcon } from "../../../../assets/Automation/ticketicon.svg";
import { IoMdTrash } from "react-icons/io";
function TicketEdit({ item, ticketData, setTicketData }) {
  const [data, setData] = useState({});
  const [isActive, setActive] = useState(false); //toggle state

  //handles the change of form input
  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  //handles the add of new ticket item
  function handleSubmit(e) {
    e.preventDefault();
    let updatedData = ticketData?.map((info) => {
      if (info.uid == data?.uid) {
        return { ...data };
      }
      return info;
    });

    setTicketData([...updatedData]);
  }

  //handles the deletion of ticket item
  function handleDelete() {
    let updatedData = ticketData?.filter((info) => {
      return info.uid != data?.uid;
    });

    setTicketData([...updatedData]);
  }

  //handles the active state toggle
  function handleClick() {
    setActive(false);
  }

  //effect for set data state with ticket item on item change
  useEffect(() => {
    setData({ ...item });
  }, [item]);

  //effect for toggle the  active state on ticket change
  useEffect(() => {
    setActive(false);
  }, [ticketData]);

  return (
    <form className={styles.ticket_wrapper} onSubmit={handleSubmit}>
      <div className={styles.ticket_box}>
        <div
          className={`${styles.item_flex} pointer`}
          onClick={() => setActive(!isActive)}
        >
          <div className={styles.item_flex_box}>
            <span className={styles.ticket_icon}>
              <TicketIcon />
            </span>
            <span className={styles.icon_style}>{data?.label}</span>
            <span className={styles.label_length}>{data?.label1}</span>
          </div>
          <span className={styles.delete_btn} onClick={handleDelete}>
            <IoMdTrash />
          </span>
        </div>

        {isActive && (
          <>
            <div className={styles.ticket_item}>
              <div className={styles.item}>
                <label className={styles.item_label}>Label for agents</label>
                <input
                  type="text"
                  className={styles.item_input}
                  value={data?.label1}
                  name="label1"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.item}>
                <label className={styles.item_label}>Label for customer</label>
                <input
                  type="text"
                  className={styles.item_input}
                  value={data?.label2}
                  name="label2"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.ticket_btns}>
              <button
                className={styles.cancel_btn}
                type="button"
                onClick={handleClick}
              >
                Cancel
              </button>
              <button className={styles.submit_btn}>Save Field</button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

export default TicketEdit;
