import React from "react";
import Select from "react-select";
import styles from "../css/update.module.css";
function UpdateWebhook() {
  const valueOptions = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
    { value: "JS Function", label: "JS Function" },
  ];
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.heading}>Edit API</h1>
        <div className={styles.input_box}>
          <label className={styles.label}>API name</label>
          <input type="text" className={styles.input} required />
        </div>
        <div className={styles.input_box}>
          <label className={styles.label}>Method</label>
          <Select
            options={valueOptions}
            placeholder={"Select the Method"}
            className={styles.input}
          />
        </div>
        <div className={styles.input_box}>
          <label className={styles.label}>API URL</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter API URL"
            required
          />
        </div>
        <h4 className={styles.label}>Values to be used in Bot flows</h4>
        <div className={styles.input_box}>
          <label className={styles.label}>Body parameters</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter body parameters"
            required
          />
        </div>
        <div className={styles.input_box}>
          <label className={styles.label}>Header parameters</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter header parameters"
            required
          />
        </div>
        <div className={styles.btn_container}>
          <input type="submit" className={styles.dark_btn} value="Save" />
          <input type="submit" className={styles.dark_btn} value="Cancel" />
        </div>
      </form>
    </div>
  );
}
export default UpdateWebhook;
