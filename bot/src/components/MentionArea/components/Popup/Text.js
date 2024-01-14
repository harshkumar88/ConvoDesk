import React from "react";
import styles from "../../css/popup.module.css";
function Text({ data, setData }) {
  return (
    <div className={styles.popup_subdiv}>
      <input
        type="text"
        value={data.key}
        onChange={function (e) {
          setData({ ...data, key: e.target.value });
        }}
        className={styles.text_input}
      />
    </div>
  );
}

export default Text;
