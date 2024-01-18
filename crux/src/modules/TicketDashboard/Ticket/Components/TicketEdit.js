import React, { useEffect, useState, useContext } from "react";
import styles from "../css/style.module.css";
import { ReactComponent as TicketIcon } from "../../../../assets/Automation/ticketicon.svg";
import { IoMdTrash } from "react-icons/io";
import { AppContext } from "../../../../App";
import IssueContainer from "../../Components/IssueContainer";
function TicketEdit({ item, idx, ticketEditData, setTicketEditData }) {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({});
  const [isActive, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    let { choices, ...info } = item;
    setData(info);
    setChoices(choices || []);
  }, [item]);

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
      if (i != idx) {
        if (ticket_info?.label == data.label || ticket_info?.key == data.key) {
          appContext.setAlert("Ticket Feild is also present", "alert_error");
          return;
        }
      }
    }

    let ticketData = [];
    ticketEditData?.map((info, index) => {
      if (index != idx) {
        let { choices, ...fieldData } = info;
        ticketData.push(fieldData);
      }
    });

    ticketData.push(data);

    let ticket_payload = {
      ticket_fields: ticketData,
    };

    if (data?.field_type == "dependent") {
      ticket_payload.options = { key: data.key, choices: choices };
    }
    appContext.setAlert("Ticket Feild Updated Successfully", "alert_success");
    console.log(ticket_payload, "j");
    setOpen(false);
  }

  //handles the delete of ticket item
  function handleDelete() {
    //send param to delete;
    let updatedData = ticketEditData?.filter((info, index) => {
      return index != idx;
    });
    setTicketEditData([...updatedData]);
  }

  return (
    <form className={styles.ticket_wrapper} onSubmit={handleSubmit}>
      <div className={styles.ticket_box}>
        <div
          className={`${styles.item_flex} pointer`}
          onClick={() => setOpen(!isOpen)}
        >
          <div className={styles.item_flex_box}>
            <span className={styles.ticket_icon}>
              <TicketIcon />
            </span>
            <span className={styles.icon_style}>{data?.field_type?.[0]}</span>
            <span className={styles.label_length}>{data?.label}</span>
          </div>
          <span className={styles.delete_btn} onClick={handleDelete}>
            <IoMdTrash />
          </span>
        </div>

        {isOpen && (
          <>
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
              {/* {data?.field_type == "dependent" && (
                <div className={styles.choices_container}>
                  <button
                    className={styles.choice_btn}
                    onClick={handleActive}
                    type="button"
                  >
                    Add Choices
                  </button>
                </div>
              )} */}

              {data?.field_type == "dependent" && (
                <IssueContainer choices={choices} setChoices={setChoices} />
              )}
            </div>

            <div className={styles.ticket_btns}>
              <button
                className={styles.cancel_btn}
                type="button"
                onClick={() => setOpen(false)}
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
