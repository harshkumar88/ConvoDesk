import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, put_data } from "../../../React-lib/src/networkhandler";
import { API_URL } from "../../../config";
import styles from "./css/style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

function EditCannedResponse() {
  let [loader, setLoader] = useState(false);
  let [cannedResponse, setCannedResponse] = useState({});
  const appContext = useContext(AppContext);
  const { canned_response_id } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      const isValidInteger = /^\d+$/.test(canned_response_id);
      if (!isValidInteger) {
        navigate("/home");
        return;
      }
      appContext.setPage("edit canned response");
      get_canned_response_details();
    },
    [appContext.reload, canned_response_id, navigate]
  );

  function get_canned_response_details() {
    get_data(
      `${API_URL}/crux/canned/response/v1/?canned_response_id=${canned_response_id}`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        appContext.setTitle(data.data.title);
        console.log("hii", data.data);
        setCannedResponse(data.data);
        setLoader(false);
      }
    });
  }
  function convertDateFormat(dateString) {
    const dateParts = dateString.split("/");
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2].substring(2);
    return year + month + day;
  }
  function handleSubmit(e) {
    let converted_date = convertDateFormat(cannedResponse.n_slot_id);
    let body = {
      description: cannedResponse.description,
      title: cannedResponse.title,
      n_slot_id: converted_date,
      shortcut: cannedResponse.shortcut,
    };
    let payload = {
      canned_response_id: canned_response_id,
      data: body,
    };
    if (cannedResponse.description === "") {
      appContext.setAlert(
        "Please provide valid canned response",
        "alert_error"
      );
      return;
    }
    put_data(
      `${API_URL}/crux/canned/response/v1/`,
      payload,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate(`/canned/response`);
      }
    });
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="item-row-container">
      <div className={styles.article_edit} style={{ margin: "0 1vw" }}>
        {/* <JoditEditor
          value={cannedResponse.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setCannedResponse({ ...cannedResponse, description: newContent });
          }}
        /> */}
        <h2>Edit Canned Response:</h2>
        <textarea
          value={cannedResponse.description}
          onChange={(event) => {
            setCannedResponse({
              ...cannedResponse,
              description: event.target.value,
            });
          }}
          rows={17}
          className={styles.textarea}
        />
        <div className={styles.shortcut_div}>
          <h2>Edit Shortcut:</h2>
          <input
            type="text"
            value={cannedResponse.shortcut}
            onChange={(event) => {
              setCannedResponse({
                ...cannedResponse,
                shortcut: event.target.value,
              });
            }}
            className={styles.input}
          />
        </div>

        <div className="btn-container">
          <button className={`btn ${styles.btn}`} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCannedResponse;
