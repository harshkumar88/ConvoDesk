import React, { useMemo } from "react";
import { AppContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import styles from "./css/style.module.css";
import { useNavigate } from "react-router-dom";
import {
  post_data,
  get_data,
  put_data,
} from "../../React-lib/src/networkhandler";
import { API_URL } from "../../config";
import Select from "react-select";
import { customStyles } from "../../utils/DatePicker/components/CustomStyles";
import MentionArea from "./MentionArea /index";

function AIResponse() {
  let [loader, setLoader] = useState(false);
  let [aIResponse, setAIResponse] = useState({
    issue: 0,
    sub_issue: 0,
    further_breakup: 0,
    outcome: 1,
  });
  let [response, setResponse] = useState([]);
  let [disabled, setDisabled] = useState(false);
  const shortNoteList = [
    // { label: "Status", value: "status" },
    // { label: "Issue", value: "issue" },
    // { label: "Sub Issue", value: "sub_issue" },
    // { label: "Further Breakup", value: "further_breakup" },
    // { label: "Ticket Outcome", value: "ticket_outcome" },
    // { label: "Group", value: "group" },
    // { label: "Agent", value: "agent" },
    // { label: "Priority", value: "priority" },
    // { label: "Ticket Type", value: "ticket_type" },
    { label: "Transaction ID", value: "transaction_id" },
    { label: "Order ID", value: "order_id" },
    { label: "Refund Amount", value: "refund_amount" },
  ];
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(
    function () {
      setDisabled(false);
      setLoader(false);

      appContext.setTitle("AI Responses");
      appContext.setPage("AI responses");
      get_ai_responses();
    },

    [appContext.reload]
  );

  useEffect(() => {
    if (Object.keys(aIResponse).length == 0) {
      return;
    }
    const filteredResponse = response?.find((item) => {
      return (
        item.issue === aIResponse.issue &&
        item.sub_issue === aIResponse.sub_issue &&
        item.further_breakup === aIResponse.further_breakup &&
        item.outcome === aIResponse.outcome
      );
    });

    if (!filteredResponse) {
      let { issue, sub_issue, further_breakup, outcome, title, ...data } =
        aIResponse;
      setAIResponse({
        issue: issue,
        further_breakup: further_breakup,
        sub_issue: sub_issue,
        outcome: outcome,
        public_note: "",
        short_note: "",
        title: title,
      });
    } else {
      setAIResponse({ ...filteredResponse });
    }
  }, [
    aIResponse?.issue,
    aIResponse?.sub_issue,
    aIResponse?.further_breakup,
    aIResponse?.outcome,
  ]);

  function get_ai_responses() {
    setLoader(true);
    get_data(`${API_URL}/crux/ai/response/v1/`, appContext, false).then(
      function (data) {
        if (data) {
          setResponse(data?.data);
          setLoader(false);
        }
      }
    );
  }

  function handleEdit() {
    let payload = {
      ai_response_id: aIResponse?.id,
      data: {
        title: aIResponse?.title,
        issue: aIResponse?.issue,
        sub_issue: aIResponse?.sub_issue,
        short_note: aIResponse?.short_note,
        public_note: aIResponse?.public_note,
        outcome: aIResponse?.outcome,
      },
    };

    put_data(`${API_URL}/crux/ai/response/v1/`, payload, appContext, true).then(
      function (data) {
        if (data) {
          setDisabled(false);
        }
      }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);

    if (aIResponse?.id) {
      handleEdit();
      return;
    }

    post_data(
      `${API_URL}/crux/ai/response/v1/`,
      aIResponse,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate(`/ai/response`);
        setDisabled(false);
      }
    });
  }

  const allFilters = appContext?.filters;

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="item-row-container">
      <form onSubmit={handleSubmit}>
        <div className={styles.canned_container}>
          <div className={styles.canned_div}>
            <h4 className={styles.canned_header}>Title</h4>
            <input
              type="text"
              name="title"
              value={aIResponse?.title || ""}
              className={styles.input}
              required
              onChange={function (e) {
                setAIResponse({ ...aIResponse, title: e.target.value });
              }}
            />
          </div>
          <div className={styles.canned_div}>
            <h4 className={styles.canned_header}>Issue</h4>
            <Select
              isClearable={true}
              className={styles.select_input}
              placeholder="Select Issue"
              options={allFilters?.issue?.choices}
              value={allFilters?.issue?.choices?.filter(
                (item) => item.value == aIResponse?.issue
              )}
              onChange={function (e) {
                setAIResponse({
                  ...aIResponse,
                  issue: e?.value || 0,
                  sub_issue: 0,
                  further_breakup: 0,
                });
              }}
              styles={customStyles}
              required={allFilters?.issue?.choices?.length}
            />
          </div>

          <div className={styles.canned_div}>
            <h4 className={styles.canned_header}> Sub Issue</h4>
            <Select
              isClearable={true}
              className={styles.select_input}
              placeholder="Select Sub Issue"
              options={allFilters?.sub_issue?.choices?.filter(
                (item) => item.additional_key === aIResponse.issue
              )}
              value={allFilters?.sub_issue?.choices?.filter(
                (item) => item.value == aIResponse?.sub_issue
              )}
              onChange={function (e) {
                setAIResponse({
                  ...aIResponse,
                  sub_issue: e?.value || 0,
                  further_breakup: 0,
                });
              }}
              styles={customStyles}
              required={
                allFilters?.sub_issue?.choices?.filter(
                  (item) => item.additional_key === aIResponse.issue
                ).length
              }
            />
          </div>

          <div className={styles.canned_div}>
            <h4 className={styles.canned_header}> Further Breakup</h4>
            <Select
              isClearable={true}
              className={styles.select_input}
              placeholder=" Further Breakup"
              options={allFilters?.further_breakup?.choices?.filter(
                (item) => item.additional_key === aIResponse.sub_issue
              )}
              value={allFilters?.further_breakup?.choices?.filter(
                (item) => item.value == aIResponse?.further_breakup
              )}
              onChange={function (e) {
                setAIResponse({
                  ...aIResponse,
                  further_breakup: e?.value || 0,
                });
              }}
              styles={customStyles}
              required={
                allFilters?.further_breakup?.choices?.filter(
                  (item) => item.additional_key === aIResponse.sub_issue
                ).length
              }
            />
          </div>
        </div>
        <div className={styles.note_container}>
          <div className={styles.outcome_container}>
            <h4 className={styles.canned_header}> Ticket Outcome</h4>
            <div className={styles.outcome_div}>
              {allFilters?.ticket_outcome?.choices?.map((info) => {
                return (
                  <span
                    className={
                      info?.value == aIResponse?.outcome
                        ? `${styles.active} ${styles.outcome_item}`
                        : styles.outcome_item
                    }
                    onClick={() =>
                      setAIResponse({ ...aIResponse, outcome: info?.value })
                    }
                  >
                    {info?.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className={styles.submit_wrapper}>
            <div className={styles.article_edit}>
              <div className={styles.note_edit}>
                <h4>Short Note:</h4>

                <div className={`${styles.textarea} `}>
                  <MentionArea
                    shortNoteList={shortNoteList}
                    setText={setAIResponse}
                    text={aIResponse}
                    type="short_note"
                  />
                </div>
              </div>
              <div className={styles.note_edit}>
                <h4>Public Note:</h4>
                <div className={`${styles.textarea} `}>
                  <MentionArea
                    shortNoteList={shortNoteList}
                    setText={setAIResponse}
                    text={aIResponse}
                    type="public_note"
                  />
                </div>
              </div>{" "}
            </div>
            <div className="btn-container">
              <button
                className={`btn ${styles.btn}`}
                disabled={disabled}
                style={disabled ? { opacity: "0.5", cursor: "default" } : {}}
              >
                Submit
              </button>
            </div>
          </div>
        </div>{" "}
      </form>
    </div>
  );
}

export default AIResponse;
