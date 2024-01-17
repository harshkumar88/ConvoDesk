import React, { useContext, useState, useEffect } from "react";
import styles from "../css/style.module.css";
import { AppContext } from "../../../../App";
import IssueContainer from "../../Components/IssueContainer";
function TicketAdd({
  item,
  ticketData,
  setTicketData,
  ticketEditData,
  setTicketEditData,
}) {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({
    field_type: item?.type,
    parent_field: "",
  });
  const [isActive, setActive] = useState(false);
  const [choices, setChoices] = useState([]);

  function handleActive() {
    setActive(!isActive);
  }
  //handles form input values
  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }

  //handles new item added
  function handleSubmit(e) {
    e.preventDefault();

    for (let i = 0; i < ticketEditData?.length; i++) {
      let ticket_info = ticketEditData[i];
      if (ticket_info.label == data.label) {
        appContext.setAlert(
          "Ticket Feild with same label is present",
          "alert_error"
        );
        return;
      }
    }

    let updatedData = ticketData?.map((info) => {
      if (info.uid == item?.uid) {
        return { ...item, isNew: false };
      }
      return info;
    });

    let ticket_data = [];
    ticketEditData?.map((info, index) => {
      let { choices, ...fieldData } = info;
      ticket_data.push(fieldData);
    });

    ticket_data.push(data);

    let ticket_payload = {
      fields: ticket_data,
    };

    if (isActive) {
      ticket_payload.choices_data = { key: data.label, data: choices };
    }

    console.log(ticket_payload, "finalData");
    setTicketEditData([...ticketEditData, { ...data, choices: choices }]);
    appContext.setAlert("Successfully Add", "alert_success");
    setTicketData([...updatedData]);
  }

  //handles the delete of ticket item
  function handleDelete() {
    let updatedData = ticketData?.filter((info) => {
      return info.uid != item?.uid;
    });

    setTicketData([...updatedData]);
  }

  return (
    <form className={styles.ticket_wrapper} onSubmit={handleSubmit}>
      <div className={styles.ticket_box}>
        <div className={styles.item_flex_box}>
          <span className={styles.icon_style}>{item?.title[0]}</span>
          <span>New {item?.type} Field</span>
        </div>
        <div className={styles.ticket_container}>
          <div className={styles.ticket_item}>
            <div className={styles.item}>
              <label className={styles.item_label}>Label</label>
              <input
                type="text"
                className={styles.item_input}
                required
                value={data?.label}
                name="label"
                onChange={handleChange}
              />
            </div>
            <div className={styles.item}>
              <label className={styles.item_label}>Key</label>
              <input
                type="text"
                className={styles.item_input}
                required
                value={data?.key}
                name="key"
                onChange={handleChange}
              />
            </div>{" "}
          </div>
          {item?.type == "dependent" && !isActive && (
            <div className={styles.choices_container}>
              <button
                className={styles.choice_btn}
                onClick={handleActive}
                type="button"
              >
                Add Choices
              </button>
            </div>
          )}

          {isActive && (
            <IssueContainer choices={choices} setChoices={setChoices} />
          )}
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
