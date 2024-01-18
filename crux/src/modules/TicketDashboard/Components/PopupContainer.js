import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import PopUp from "../../../utils/Popup";
import Select from "react-select";
import styles from "../css/style.module.css";
import { post_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
function PopupContainer({
  item,
  setTicketData,
  ticketData,
  label,
  idx,
  edit,
  btnstyle,
}) {
  const [close, setClose] = useState(false);
  const appContext = useContext(AppContext);
  const [ticketPayload, setTicketPayload] = useState({});
  const ticketType = [
    { label: "type1", value: "type1" },
    { label: "type2", value: "type2" },
    { label: "type3", value: "type3" },
  ];
  function handleChange(e) {
    setTicketPayload({ ...ticketPayload, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (ticketPayload?.required === "") {
      appContext.setAlert("please check required option", "alert_error");
      return;
    }
    setClose(true);
    if (edit) {
      let updatedPayload = ticketData?.map((info, index) => {
        if (index == idx) {
          return { ...ticketPayload };
        }
        return info;
      });
      setTicketData([...updatedPayload]);
    } else {
      setTicketData([...ticketData, ticketPayload]);
    }

    setTicketPayload({
      type: "",
      key: "",
      value: "",
      required: "",
    });
  }

  function handleAddTicket() {
    post_data(`${API_URL}/`, ticketPayload, appContext, true);
  }

  function handleEditTicket() {
    post_data(`${API_URL}/`, ticketPayload, appContext, true);
  }

  function getTicketConstants() {
    // get_data(`${API_URL}/`, {}, appContext, false).then(
    //   function (data) {
    //     if (data) {
    //     setTicketType(data?.data);
    //     }
    //   }
    // );
  }
  useEffect(() => {
    // getTicketConstants();
    if (edit) {
      // get_data(`${API_URL}/`, {}, appContext, false).then(
      //   function (data) {
      //     if (data) {
      //      setTicketPayload({...item});
      //     }
      //   }
      // );
      setTicketPayload({ ...item });
    } else {
      setTicketPayload({
        type: "",
        key: "",
        value: "",
        required: "",
      });
    }
  }, [edit, item]);

  useEffect(() => {
    setClose(false);
  }, [close]);

  return (
    <PopUp
      btnName={label}
      btnStyling={btnstyle && btnstyle != undefined ? btnstyle : "btn"}
      closeState={close}
    >
      <form className={styles.popup_body} onSubmit={handleSubmit}>
        <p className={styles.popup_label}>Ticket</p>
        <div className={styles.popup_container}>
          <div className={styles.popup_item}>
            <div className={styles.flex1}>
              <label>Type</label>
              <Select
                className={styles.select_item}
                options={ticketType}
                value={ticketType?.filter(
                  (item) => item.value == ticketPayload?.type
                )}
                required
                onChange={(e) =>
                  setTicketPayload({ ...ticketPayload, type: e.value })
                }
              />
            </div>
            <div className={styles.flex1}>
              <label>key</label>
              <input
                className={styles.input_item}
                value={ticketPayload?.key}
                name="key"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.popup_item}>
            <div className={styles.flex1}>
              <label>Value</label>
              <input
                className={styles.input_item}
                value={ticketPayload?.value}
                name="value"
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.flex1}>
              <label>Required</label>
              <div className={styles.radio_btns}>
                <div className={styles.radio_item}>
                  <input
                    className={styles.radio_input}
                    type="radio"
                    id="yes"
                    checked={ticketPayload?.required}
                    onChange={() =>
                      setTicketPayload({
                        ...ticketPayload,
                        required: true,
                      })
                    }
                  />
                  <label htmlFor="yes" className={styles.radio_label}>
                    Yes
                  </label>
                </div>
                <div className={styles.radio_item}>
                  <input
                    className={styles.radio_input}
                    type="radio"
                    id="no"
                    checked={ticketPayload?.required === false}
                    onChange={() =>
                      setTicketPayload({
                        ...ticketPayload,
                        required: false,
                      })
                    }
                  />
                  <label htmlFor="no" className={styles.radio_label}>
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.popup_btns}>
            <button
              className={styles.cancel_btn}
              type="button"
              onClick={() => setClose(true)}
            >
              Cancel
            </button>
            <button className={styles.submit_btn}>Submit</button>
          </div>
        </div>
      </form>
    </PopUp>
  );
}

export default PopupContainer;
