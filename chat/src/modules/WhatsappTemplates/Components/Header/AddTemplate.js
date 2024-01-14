import React, { useEffect, useState } from "react";
import PopUp from "../../../../utils/Popup";
import styles from "./styles.module.scss";
import { post_data } from "../../../../React-lib/src/networkhandler";

import { API_URL } from "../../../../config";
function AddTemplate({ headerContext }) {
  let { close, setClose, appContext } = headerContext;

  let [templateDetails, setTemplateDetails] = useState({
    template_name: "",
    template_id: "",
  });

  useEffect(
    function () {
      setClose(false);
    },
    [close]
  );

  function handleChange(e) {
    setClose(false);
    setTemplateDetails({ ...templateDetails, [e.target.name]: e.target.value });
  }
  function handleAddTemplate(e) {
    e.preventDefault();

    post_data(
      `${API_URL}/hook/template/v1/`,
      templateDetails,
      appContext,
      true
    ).then((data) => {
      if (data) {
        setTemplateDetails({
          template_name: "",
          template_id: "",
        });

        setClose(true);
      }
    });
  }

  return (
    <PopUp
      btnName={"Add Template"}
      btnStyling={styles.add_template_btn}
      closeState={close}
    >
      <form onSubmit={handleAddTemplate}>
        <div className={styles.add_template_header}>
          <h2>Add Template</h2>
        </div>
        <div className={styles.add_template_body}>
          <div className={styles.info}>
            <div className={styles.div}>
              <p>Template Name</p>
              <input
                type="text"
                placeholder="template name"
                className={styles.input}
                name="template_name"
                value={templateDetails.template_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.div}>
              <p>Template ID</p>
              <input
                type="number"
                placeholder="template id"
                className={styles.input}
                name="template_id"
                value={templateDetails.template_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.btn_div}>
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
    </PopUp>
  );
}

export default AddTemplate;
