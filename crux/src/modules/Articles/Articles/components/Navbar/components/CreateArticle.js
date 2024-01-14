import React, { useContext, useEffect, useState } from "react";
import styles from "../../../css/popup.module.css";
import JoditEditor from "jodit-react";
import { AppContext } from "../../../../../../App";
import PopUp from "../../../../../../utils/Popup";
import { post_data } from "../../../../../../React-lib/src/networkhandler";

function CreateArticle({ cluster }) {
  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  useEffect(function () {
    setClose(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let payload = change;
    payload["cluster_id"] = cluster;

    post_data(`${API_URL}/crux/article/v1/`, payload, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }

  return (
    <PopUp btnName={"Create Article"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Create Article</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.input_container} ${styles.text_container}`}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Enter Article Title"
            value={change.title}
            className={styles.input}
            required
            onChange={function (e) {
              setChange({ ...change, title: e.target.value });
            }}
          />
        </div>
        <JoditEditor
          value={change.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setChange({ ...change, description: newContent });
          }}
        />

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className={styles.submit} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default CreateArticle;
