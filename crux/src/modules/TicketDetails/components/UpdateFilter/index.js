import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { get_data, put_data } from "../../../../ReactLib/networkhandler";
import styles from "./style.module.css";
import Select from "react-select";

function UpdateFilter({ ticket_data, ticket_id, filters, supervisorData }) {
  let [search, setSearch] = useState(false);
  let [txt, setTxt] = useState("");
  let [ticket, setTicket] = useState({});
  let [data, setData] = useState({});
  let [loader, setLoader] = useState(true);
  let [disabled, setDisabled] = useState(false);
  let risk_action_choices = [
    { value: 1, label: "Action Pending" },
    { value: 2, label: "Action Taken" },
  ];
  let source_refund_choices = [
    { value: 1, label: "UPI" },
    { value: 2, label: "Gateway" },
    { value: 3, label: "Manual Refund" },
  ];
  const appContext = useContext(AppContext);
  function convert(label, value) {
    return `${label}ƒ${value}`;
  }

  useEffect(
    function () {
      let tempData = {};
      if (filters) {
        filters.map(function (item, idx) {
          tempData[item["key"]] = item;
        });
        setData(tempData);
        setLoader(false);
        setTicket(ticket_data);
      }
    },
    [filters]
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
    Object.entries(ticket).map(function (item, idx) {
      let key = item[0];
      let value = item[1];

      if (ticket_data[key] !== value) {
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
    if (payload?.order_id === "") {
      appContext.setAlert("Enter order ID", "alert_error");
      setDisabled(false);
    } else {
      put_data(
        `${API_URL}/crux/update/ticket/v1/`,
        { ticket_id: ticket_id, data: payload },
        appContext,
        true
      ).then(function (data) {
        if (data) {
          setDisabled(false);
        }
      });
    }
  }
  return loader ? (
    <></>
  ) : (
    <div className={styles.filter_container}>
      <div className={styles.search}>
        <p className={styles.label_heading}>Disposition</p>

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
      <div className={styles.filter}>
        <label className={styles.label}>Subject</label>

        <input
          type="text"
          className={styles.input}
          placeholder="Subject"
          value={ticket?.subject}
          onChange={function (e) {
            setTicket({ ...ticket, subject: e.target.value });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Status</label>
        <Select
          placeholder="-"
          options={data["status"].choices}
          value={data["status"].choices.filter(function (item, idx) {
            return item.value == ticket?.status;
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
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
          options={data["issue"].choices}
          value={data["issue"].choices.filter(function (item, idx) {
            return item.value == ticket?.issue;
          })}
          onChange={function (e) {
            setTicket((current) => {
              const {
                sub_issue,
                sub_issue_str,
                further_breakup,
                further_breakup_str,
                ...ticket
              } = current;
              return {
                ...ticket,
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

      {ticket?.issue &&
      data["sub_issue"]["choices"].filter(function (item, idx) {
        return item["additional_key"] == ticket.issue;
      }).length > 0 ? (
        <div className={styles.filter}>
          <label className={styles.label}>Sub Issue</label>
          <Select
            placeholder="-"
            options={data["sub_issue"].choices.filter(function (item, idx) {
              return item.additional_key == ticket?.issue;
            })}
            value={data["sub_issue"].choices.filter(function (item, idx) {
              return item.value == ticket?.sub_issue;
            })}
            onChange={function (e) {
              setTicket((current) => {
                const { further_breakup, further_breakup_str, ...ticket } =
                  current;
                return {
                  ...ticket,
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

      {ticket?.sub_issue &&
      data["further_breakup"]["choices"].filter(function (item, idx) {
        return item["additional_key"] == parseInt(ticket.sub_issue);
      }).length > 0 ? (
        <div className={styles.filter}>
          <label className={styles.label}>Further Breakup</label>
          <Select
            placeholder="-"
            options={data["further_breakup"].choices.filter(function (
              item,
              idx
            ) {
              return item.additional_key == ticket?.sub_issue;
            })}
            value={data["further_breakup"].choices.filter(function (item, idx) {
              return item.value == ticket?.further_breakup;
            })}
            onChange={function (e) {
              setTicket({
                ...ticket,
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
        <label className={styles.label}>Ticket Outcome</label>
        <Select
          placeholder="-"
          options={data["ticket_outcome"].choices}
          value={data["ticket_outcome"].choices.filter(function (item, idx) {
            return item.value == ticket?.outcome;
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              outcome: e.value,
              outcome_str: e.label,
            });
          }}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Group</label>
        <Select
          placeholder="-"
          options={data["group"].choices}
          value={data["group"].choices.filter(function (item, idx) {
            return item.value == ticket?.group_id;
          })}
          onChange={function (e) {
            setTicket((current) => {
              const { agent_id, agent_id_str, agent_name, ...ticket } = current;
              return {
                ...ticket,
                group_id: e.value,
                group_id_str: e.label,
                group_name: e.label,
                agent_id: 0,
                agent_name: "",
                agent_id_str: "",
              };
            });
          }}
        />
      </div>

      {ticket?.group_id &&
      data["agent"]["choices"].filter(function (item, idx) {
        return item["groups"].includes(ticket.group_id);
      }).length > 0 ? (
        <div className={styles.filter}>
          <label className={styles.label}>Agent</label>
          <Select
            placeholder="-"
            options={data["agent"].choices.filter(function (item, idx) {
              return item["groups"].includes(ticket.group_id);
            })}
            value={data["agent"].choices.filter(function (item, idx) {
              return item.value == ticket?.agent_id;
            })}
            onChange={function (e) {
              setTicket({
                ...ticket,
                agent_id: e.value,
                agent_name: e.label,
                agent_id_str: e.label,
              });
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div className={styles.filter}>
        <label className={styles.label}>Priority</label>
        <Select
          placeholder="-"
          options={data["priority"].choices}
          value={data["priority"].choices.filter(function (item, idx) {
            return item.value == ticket?.priority;
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              priority: e.value,
              priority_str: e.label,
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Ticket Type</label>
        <Select
          placeholder="-"
          options={data["ticket_type"].choices}
          value={data["ticket_type"].choices.filter(function (item, idx) {
            return item.value == ticket?.ticket_type;
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              ticket_type: e.value,
              ticket_type_str: e.label,
            });
          }}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Mobile Number</label>
        <input
          type="tel"
          className={styles.input}
          value={ticket?.phone}
          placeholder="Mobile Number"
          disabled
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Order ID</label>
        <input
          type="tel"
          className={styles.input}
          value={ticket?.order_id}
          placeholder="Order ID"
          required
          onChange={function (e) {
            if (e.target.value.length > 8 || isNaN(e.target.value)) {
              return;
            }
            setTicket({
              ...ticket,
              order_id: e.target.value ? parseInt(e.target.value) : "",
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Refund Amount</label>
        <input
          type="tel"
          className={styles.input}
          value={ticket?.refund_amount}
          placeholder="Refund Amount"
          onChange={function (e) {
            if (e.target.value.length > 5 || isNaN(e.target.value)) {
              return;
            }
            setTicket({
              ...ticket,
              refund_amount: e.target.value ? parseInt(e.target.value) : "",
            });
          }}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Campaign Name</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.campaign_name}
          placeholder="Campaign Name"
          disabled
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Segment</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.cf_segment}
          placeholder="Segment"
          disabled
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Zone Name</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.cf_zone_name}
          placeholder="Zone name"
          disabled
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Created Time</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.cf_created_time}
          placeholder="Created at"
          disabled
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>First response time</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.first_response_time}
          placeholder="First response Time"
          disabled
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Resolution Time</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.resolution_time}
          placeholder="Resolution Time"
          disabled
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Active Supervisor</label>
        <Select
          placeholder="-"
          options={supervisorData?.map((item) => ({
            label: item?.name,
            value: item?.id,
          }))}
          value={supervisorData
            ?.filter(function (item, idx) {
              return item?.id === ticket?.active_supervisor;
            })
            .map((selectedItem) => ({
              label: selectedItem?.name,
              value: selectedItem?.id,
            }))}
          onChange={function (e) {
            setTicket({
              ...ticket,
              active_supervisor: e.value,
            });
          }}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Risk Action</label>
        <Select
          placeholder="-"
          options={risk_action_choices?.map((item) => {
            return { label: item?.label, value: item?.value };
          })}
          value={risk_action_choices?.filter(function (item, idx) {
            return item?.value == ticket?.risk_action;
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              risk_action: e.value,
            });
          }}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Source Refund</label>
        <Select
          placeholder="-"
          options={source_refund_choices?.map((item) => {
            return { label: item?.label, value: item?.value };
          })}
          value={source_refund_choices?.filter(function (item, idx) {
            return item?.value == ticket?.source_refund_type;
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              source_refund_type: e.value,
            });
          }}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Transaction ID</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.transaction_id}
          placeholder="Transaction ID"
          onChange={function (e) {
            setTicket({
              ...ticket,
              transaction_id: e.target.value,
            });
          }}
        />
      </div>

      <button className={styles.btn} onClick={handleSubmit} disabled={disabled}>
        Update Ticket
      </button>
    </div>
  );
}

export default UpdateFilter;
