import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { post_data, put_data } from "../../../../React-lib/src/networkhandler";
import styles from "./style.module.css";
import Select from "react-select";

function UpdateFilter({ user_data, lead_id, filters, setJobTitle }) {
  let [search, setSearch] = useState(false);
  let [txt, setTxt] = useState("");
  let [lead, setLead] = useState({});
  let [data, setData] = useState({});
  let [loader, setLoader] = useState(true);
  let [disabled, setDisabled] = useState(false);
  let [followUp, setFollowUp] = useState({ str: "" });
  const appContext = useContext(AppContext);
  useEffect(
    function () {
      let tempData = {};
      if (filters) {
        filters.map(function (item, idx) {
          tempData[item["key"]] = item;
        });
        setFollowUp({ str: "" });
        setData(tempData);
        setLead(user_data);
        setFollowUp({ str: user_data?.follow_up?.substr(0, 19) });
        let a = tempData["job_title"]?.choices.filter(function (item, idx) {
          return item.value == user_data?.job_title;
        });
        if (a.length > 0) {
          setJobTitle(a[0]?.label);
        }

        setLoader(false);
      }
    },
    [filters, lead_id, user_data]
  );
  function toggleSearch() {
    setTxt("");
    setSearch(!search);
  }
  function handleTxt(e) {
    setTxt(e.target.value);
  }
  function handleSubmit(e) {
    setDisabled(true);
    let payload = {};
    Object.entries(lead).map(function (item, idx) {
      let key = item[0];
      let value = item[1];
      if (user_data[key] != value) {
        if (key == "agent_name" || key == "group_name") {
          return;
        } else {
          payload[key] = value;
          if (!key.includes("_str")) {
            let str_key = key + "_str";
            if (payload[str_key] == undefined) {
              payload[str_key] = value;
            }
          }
        }
      }
    });
    e.preventDefault();
    put_data(
      `${API_URL}/crux/sales/lead/v1/`,
      { lead_id: lead_id, data: payload },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setDisabled(false);
      }
    });
  }
  return loader ? (
    <></>
  ) : (
    <div className={styles.filter_container}>
      <div className={styles.search}>
        {/* <p className={styles.label_heading}>Disposition</p> */}
        {/* <div className={styles.label}>
          <label>Disposition</label>

          <span className={styles.search_icon} onClick={toggleSearch}>
            <BiSearchAlt />
          </span>
        </div> */}
        {search && (
          <input
            className={styles.input}
            type="text"
            value={txt}
            onChange={handleTxt}
            placeholder="Search Fields"
          />
        )}
      </div>
      <div className={styles.filter_div}>
        <div className={styles.filter}>
          <label className={styles.label}>Job Title</label>
          <Select
            placeholder="-"
            options={data["job_title"]?.choices}
            value={data["job_title"]?.choices.filter(function (item, idx) {
              return item.value == lead?.job_title;
            })}
            isDisabled={true}
            onChange={function (e) {
              setLead({
                ...lead,
                job_title: e.value,
                job_title_str: e.label,
              });
            }}
          />
        </div>

        <div className={styles.filter}>
          <label className={styles.label}>Follow Up Date</label>
          <input
            type="datetime-local"
            className={styles.input}
            step="1"
            value={followUp.str}
            min={new Date().toISOString().split("T")[0] + "T00:00:00"}
            onChange={function (e) {
              let t = e.target.value.split("T");
              let date = t[0];
              let time = t[1];
              setFollowUp({ str: e.target.value, date: date, time: time });
            }}
            onBlur={function (e) {
              if (followUp?.date && followUp?.time) {
                post_data(
                  `${API_URL}/crux/sales/follow/up/v1/`,
                  {
                    lead_id: lead_id,
                    follow_date: followUp?.date + " " + followUp?.time,
                  },
                  appContext,
                  true
                );
              }
              console.log("Api calling");
            }}
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Sales Owner</label>
          <Select
            placeholder="-"
            isDisabled={true}
            options={data["agent"]?.choices}
            value={data["agent"]?.choices.filter(function (item, idx) {
              return item.value == lead?.agent_id;
            })}
            onChange={function (e) {
              setLead({
                ...lead,
                agent_id: e.value,
                agent_name: e.label,
                agent_id_str: e.label,
              });
            }}
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Status</label>

          <Select
            placeholder="-"
            options={data["status"]?.choices}
            value={data["status"]?.choices.filter(function (item, idx) {
              return item.value == lead?.status;
            })}
            onChange={function (e) {
              setLead({
                ...lead,
                status: e.value,
                status_str: e.label,
              });
            }}
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Issue</label>
          <Select
            placeholder="-"
            options={data["issue"]?.choices}
            value={data["issue"]?.choices.filter(function (item, idx) {
              return item.value == lead?.issue;
            })}
            onChange={function (e) {
              setLead((current) => {
                const {
                  sub_issue,
                  sub_issue_str,
                  further_breakup,
                  further_breakup_str,
                  ...lead
                } = current;
                return {
                  ...lead,
                  issue: e.value,
                  issue_str: e.label,
                  sub_issue: 0,
                  sub_issue_str: "",
                  further_breakup: 0,
                  further_breakup_str: "",
                };
              });
            }}
          />
        </div>
        {lead?.issue &&
        data["sub_issue"]["choices"]?.filter(function (item, idx) {
          return item["additional_key"] == lead.issue;
        }).length > 0 ? (
          <div className={styles.filter}>
            <label className={styles.label}>Sub Issue</label>
            <Select
              placeholder="-"
              options={data["sub_issue"]?.choices.filter(function (item, idx) {
                return item.additional_key == lead?.issue;
              })}
              value={data["sub_issue"]?.choices.filter(function (item, idx) {
                return item.value == lead?.sub_issue;
              })}
              onChange={function (e) {
                setLead((current) => {
                  const { further_breakup, further_breakup_str, ...lead } =
                    current;
                  return {
                    ...lead,
                    sub_issue: e.value,
                    sub_issue_str: e.label,
                    further_breakup: 0,
                    further_breakup_str: "",
                  };
                });
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {lead?.sub_issue &&
        data["further_breakup"]["choices"]?.filter(function (item, idx) {
          return item["additional_key"] == parseInt(lead.sub_issue);
        }).length > 0 ? (
          <div className={styles.filter}>
            <label className={styles.label}>Further Breakup</label>
            <Select
              placeholder="-"
              options={data["further_breakup"]?.choices.filter(function (
                item,
                idx
              ) {
                return item.additional_key == lead?.sub_issue;
              })}
              value={data["further_breakup"]?.choices.filter(function (
                item,
                idx
              ) {
                return item.value == lead?.further_breakup;
              })}
              onChange={function (e) {
                setLead({
                  ...lead,
                  further_breakup: e.value,
                  further_breakup_str: e.label,
                });
              }}
            />
          </div>
        ) : (
          <></>
        )}

        <div className={styles.filter}>
          <label className={styles.label}>Recurring Issue</label>
          <Select
            placeholder="-"
            options={data["issue"]?.choices}
            value={data["issue"]?.choices.filter(function (item, idx) {
              return item.value == lead?.recurring_issue;
            })}
            onChange={function (e) {
              setLead({
                ...lead,
                recurring_issue: e.value,
                recurring_issue_str: e.label,
              });
            }}
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Order ID</label>

          <input
            type="number"
            className={styles.input}
            value={lead.order_id}
            onChange={function (e) {
              setLead({
                ...lead,
                order_id: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Refund Amount</label>

          <input
            type="number"
            className={styles.input}
            value={lead.refund_amount}
            onChange={function (e) {
              setLead({
                ...lead,
                refund_amount: e.target.value,
              });
            }}
          />
        </div>
      </div>

      <div className="btn-container">
        <button className="dark-btn" onClick={handleSubmit} disabled={disabled}>
          Update Lead
        </button>
      </div>
    </div>
  );
}

export default UpdateFilter;
