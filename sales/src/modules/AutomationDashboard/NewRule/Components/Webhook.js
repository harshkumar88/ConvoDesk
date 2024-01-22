import React, { useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import DynamicPayload from "../../Dynamic/DynamicPayload";

function Webhook({ ticketOptions, item, actions, setActions }) {
  let [showHeader, setShowHeader] = useState(false);
  let [showBody, setShowBody] = useState(false);
  let [showParams, setShowParams] = useState(false);
  function handleTicketChange(label, value) {
    let actionList = actions?.map((data) => {
      if (item.uid == data.uid) {
        return { ...data, webhook: { ...data?.webhook, [label]: value } };
      }
      return data;
    });
    setActions([...actionList]);
  }

  return (
    <div className={styles.webhook_wrapper}>
      <div className={styles.webhook_item}>
        <span className={styles.hook_label}>Request Type</span>
        <Select
          options={ticketOptions}
          placeholder="key"
          className={styles.condition_select4}
          value={ticketOptions?.filter(
            (info) => info.value == item?.webhook?.method
          )}
          onChange={(e) => handleTicketChange("method", e.value)}
          required
        />
      </div>
      <div className={styles.webhook_item}>
        <span className={styles.hook_label}>URL</span>
        <input
          type="text"
          placeholder="enter url"
          className={styles.hook_input}
          value={item?.webhook?.url}
          required
          onChange={(e) => handleTicketChange("url", e.target.value)}
        />
      </div>
      <div className={styles.webhook_item}>
        <span className={styles.hook_label}>Header</span>
        <DynamicPayload
          handleTicketChange={handleTicketChange}
          label="headers"
          item={item}
          showbtn={showHeader}
          setShowBtn={setShowHeader}
          setHideBtn1={setShowBody}
          setHideBtn2={setShowParams}
        />
      </div>
      <div className={styles.webhook_item}>
        <span className={styles.hook_label}>Body</span>{" "}
        <DynamicPayload
          handleTicketChange={handleTicketChange}
          label="body"
          item={item}
          showbtn={showBody}
          setShowBtn={setShowBody}
          setHideBtn1={setShowParams}
          setHideBtn2={setShowHeader}
        />
      </div>
      <div className={styles.webhook_item}>
        <span className={styles.hook_label}>Params</span>{" "}
        <DynamicPayload
          handleTicketChange={handleTicketChange}
          label="params"
          item={item}
          showbtn={showParams}
          setShowBtn={setShowParams}
          setHideBtn1={setShowBody}
          setHideBtn2={setShowHeader}
        />
      </div>
    </div>
  );
}

export default Webhook;
