import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import {
  get_data,
  post_data,
  put_data,
} from "../../../ReactLib/networkhandler";
import Select from "react-select";
import styles from "../css/popup.module.css";
import PopUp from "../../../utils/Popup";
import JoditEditor from "jodit-react";
import { API_URL } from "../../../config";

function UpdateNote({ ticket_id, data, cannedResponses }) {
  let [note, setNote] = useState({});
  let [close, setClose] = useState(false);

  const appContext = useContext(AppContext);
  const customStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      zIndex: 5,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 5,
    }),
  };
  useEffect(
    function () {
      setNote({ description: data.description, note_id: data.id });
      setClose(false);
    },
    [ticket_id, appContext.reload, data]
  );

  function handleSubmit(e) {
    setClose(true);

    e.preventDefault();
    put_data(`${API_URL}/crux/ticket/notes/v1/`, note, appContext, true).then(
      function (data) {
        if (data) {
          setClose(true);
        }
      }
    );
  }

  return (
    <PopUp btnName={"Update Note"} btnStyling="btn" closeState={close}>
      <h1 className={styles.heading}>Update Note</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.response_row}>
          <div className={styles.response_div}>
            <Select
              options={cannedResponses.map((item, idx) => ({
                label: item.title,
                value: item.description,
              }))}
              onChange={(e) => {
                if (
                  !note.description ||
                  typeof note.description === "undefined"
                ) {
                  console.log("undefined case", e.value);
                  const sanitizedValue = e.value.replace(/^<p><br><\/p>/i, "");
                  setNote({ ...note, description: sanitizedValue });
                } else {
                  let str =
                    note.description.replace(/^<p><br><\/p>/i, "") + e.value;
                  let str1 = `<span>${str}</span>`;
                  console.log("defined case", str1);
                  setNote({ ...note, description: str1 });
                }
              }}
              placeholder="Add Canned Response"
              styles={customStyles}
            />
          </div>
        </div>
        <JoditEditor
          value={note.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            let sanitizedContent = newContent.replace(/^<p><br><\/p>/i, "");
            setNote({ ...note, description: sanitizedContent });
          }}
          options={{ br: false }}
        />
        <div className={`${styles.input_container} ${styles.checkbox}`}>
          <input
            type="checkbox"
            class={styles.input}
            onChange={function (e) {
              setNote({ ...note, is_private: e.target.checked });
            }}
          />
          <label className={styles.label}>Private Note</label>
        </div>

        <div className={`${styles.input_container} ${styles.submit_container}`}>
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default UpdateNote;
