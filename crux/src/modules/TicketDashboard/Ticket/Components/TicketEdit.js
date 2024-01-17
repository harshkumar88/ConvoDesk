import React, { useEffect, useState, useContext } from "react";
import styles from "../css/style.module.css";
import { ReactComponent as TicketIcon } from "../../../../assets/Automation/ticketicon.svg";
import { IoMdTrash } from "react-icons/io";
import { AppContext } from "../../../../App";
import IssueContainer from "../../Components/IssueContainer";
function TicketEdit({ item, payload, setPayload, idx }) {
  const appContext = useContext(AppContext);
  const [data, setData] = useState({});
  const [isActive, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    setData(item);
    checkChoices();
  }, [item]);

  function checkChoices() {
    const choice_data = payload.choices_data;
    const data = choice_data?.find((info) => info.key == item.label);
    if (data) {
      setChoices(data?.data);
    }
  }

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

    const fields_data = payload.fields;
    fields_data[idx] = data;
    let ticket_payload = {
      fields: fields_data,
      choices_data: payload.choices_data,
    };

    let choice_updated_data = payload.choices_data;
    choice_updated_data = choice_updated_data?.map((info) => {
      if (info.key == item.label) {
        return { key: data?.label, data: choices };
      }
      return info;
    });
    if (data?.field_type == "dependent") {
      ticket_payload.choices_data = choice_updated_data;
    }

    setPayload({ ...ticket_payload });
    setOpen(false);
  }

  //handles the delete of ticket item
  function handleDelete() {
    // let updatedData = ticketData?.filter((info) => {
    //   return info.uid != data?.uid;
    // });
    // setTicketData([...updatedData]);
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
            <span className={styles.icon_style}>{data?.label?.[0]}</span>
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
