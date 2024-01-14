import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { AppContext } from "../../../App";
import {
  get_data,
  post_data,
  put_data,
} from "../../../React-lib/src/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../utils/Popup";
import JoditEditor from "jodit-react";
import { API_URL } from "../../../config";

function AddNote({ lead_id }) {
  let [note, setNote] = useState({});
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  useEffect(
    function () {
      setNote({ lead_id: parseInt(lead_id) });
      setClose(false);
    },
    [appContext.reload, lead_id]
  );

  function handleSubmit(e) {
    e.preventDefault();
    setClose(true);
    post_data(`${API_URL}/crux/sales/notes/v1/`, note, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }

  return (
    <PopUp btnName={"Add Note"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Add Note</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <JoditEditor
          value={note.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setNote({ ...note, description: newContent });
          }}
        />

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default AddNote;
