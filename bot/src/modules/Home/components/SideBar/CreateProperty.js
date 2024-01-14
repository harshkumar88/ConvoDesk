import React, { useContext, useEffect, useState } from "react";
import styles from "../../css/popup.module.css";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";
import { post_data, put_data } from "../../../../networkHandler";
import { AppContext } from "../../../../App";

function CreateProperty() {
  let [close, setClose] = useState(false);
  let [name, setName] = useState("");
  useEffect(function () {
    setClose(false);
  }, []);
  const appContext = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    post_data(
      `${API_URL}/neon/property/v1/`,
      { name: name, bot_id: 1 },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }

  return (
    <PopUp
      // btnName={"Create Flow"}
      createName={"New Property"}
      btnStyling="btn"
      closeState={close}
      isCreateFlow={true}
    >
      <h1 className={styles.heading}>Create Property</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
            required
          />
        </div>

        <div className={styles.input_container}>&nbsp;</div>
        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input
            className={styles.submit}
            style={{ cursor: "pointer" }}
            type="submit"
          />
        </div>
      </form>
    </PopUp>
  );
}

export default CreateProperty;
