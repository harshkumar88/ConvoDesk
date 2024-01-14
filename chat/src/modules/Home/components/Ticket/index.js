import React, { useContext, useEffect, useState } from "react";
import { post_data } from "../../../../networkHandler";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { API_URL } from "../../../../config";
import Select from "react-select";
import { get_agent_id } from "../../../../auth";
import { get_data } from "../../../../networkHandler";
import { BOT_USER_DICT } from "../../../../constants";
import { format } from "date-fns";

function Ticket({
  context,
  chatContext,
  exceptionalRefundData,
  supervisorData,
}) {
  const navigate = useNavigate();
  const { conversationDetails, filters, toggleTrigger } = chatContext;
  let [disabled, setDisabled] = useState(false);
  let [ticket, setTicket] = useState({
    status: "R",
    subject: `Conversation with ${conversationDetails.name}`,
    group_id: 6,
    agent_id: get_agent_id(),
    conversation_id: conversationDetails.id,
    phone: conversationDetails.phone,
    chat_created_time: conversationDetails.created_time,
    group_assign_time: conversationDetails.group_assign_time,
    agent_assign_time: conversationDetails.agent_assign_time,
  });
  let risk_action_choices = [
    { value: 1, label: "Action Pending" },
    { value: 2, label: "Action Taken" },
  ];
  let source_refund_choices = [
    { value: 1, label: "UPI" },
    { value: 2, label: "Gateway" },
    { value: 3, label: "Manual Refund" },
  ];
  let [check, setCheck] = useState(false);
  useEffect(
    function () {
      setDisabled(false);
      getTicketDetails();
      if (exceptionalRefundData?.exceptional_refund === true) {
        setCheck(true);
      } else {
        setCheck(false);
      }
    },
    [conversationDetails]
  );

  function getTicketDetails() {
    get_data(
      `${API_URL}/neon/user/v1/?conversation_id=${conversationDetails.id}`,
      context
    ).then(function (data) {
      if (data) {
        let bot_user_data = data?.data?.data;
        let order_id = bot_user_data[BOT_USER_DICT["order_id"]]
          ? parseInt(bot_user_data[BOT_USER_DICT["order_id"]])
          : 0;
        let issue = bot_user_data[BOT_USER_DICT["issue"]]
          ? parseInt(bot_user_data[BOT_USER_DICT["issue"]])
          : 0;
        let sub_issue = bot_user_data[BOT_USER_DICT["sub_issue"]]
          ? parseInt(bot_user_data[BOT_USER_DICT["sub_issue"]])
          : 0;
        let ticket_type = bot_user_data[BOT_USER_DICT["ticket_type"]]
          ? parseInt(bot_user_data[BOT_USER_DICT["ticket_type"]])
          : 0;

        setTicket({
          ...ticket,
          order_id: order_id,
          issue: issue,
          sub_issue: sub_issue,
          ticket_type: ticket_type,
          case_id: parseInt(bot_user_data?.property_56) || 0,
        });
      }
    });
  }

  function handleCreateTicket(ticket_data) {
    post_data(
      `${API_URL}/crux/create/ticket/v1/`,
      ticket_data,
      context,
      true
    ).then(function (data) {
      if (data) {
        handleResolve();
        // navigate("/conversation/details");
      }
    });
  }

  function checkIvrCondition(ticket_data) {
    get_data(
      `${API_URL}/crux/ivr/blast/v1/?conversation_id=${conversationDetails.id}`,
      context
    ).then(function (data) {
      if (data?.data) {
        if (data?.data?.ivr_ct < 2) {
          context.setAlert(
            "Please ensure ivr blast before creating ticket",
            "alert_error"
          );
          return;
        } else {
          handleCreateTicket(ticket_data);
        }
      } else {
        context.setAlert(
          "Please ensure ivr blast before creating ticket",
          "alert_error"
        );
        return;
      }
    });
  }

  function handleSubmit(e) {
    if (disabled) {
      return;
    }
    setDisabled(true);
    console.log(
      conversationDetails,
      Date.now() / 1000 - conversationDetails.group_assign_time,
      parseInt(Date.now() / 1000 - conversationDetails.group_assign_time)
    );
    e.preventDefault();
    ticket["source"] = 4;
    ticket["resolution_time"] = parseInt(
      Date.now() / 1000 - conversationDetails.group_assign_time
    );

    if (
      ticket?.outcome == 11 ||
      (ticket?.sub_issue == 15 && ticket?.issue == 4)
    ) {
      checkIvrCondition(ticket);
    } else {
      handleCreateTicket(ticket);
    }
  }
  function handleResolve() {
    post_data(
      `${API_URL}/neon/conversation/resolve/v1/`,
      {
        conversation_id: conversationDetails.id,
      },
      context,
      true
    ).then(function (data) {
      toggleTrigger();
      navigate(`/conversation/details`);
    });
  }

  function convertSlot() {
    // Get the current date
    const currentDate = new Date();

    // Format the current date in "yymmdd" format
    const formattedDate = format(currentDate, "yyMMdd");

    return formattedDate;
  }

  function handleExceptionalFlow(e) {
    const value = e.target.value;

    if (value === "Yes") {
      setTicket({
        ...ticket,
        exceptional_refund: true,
        exceptional_refund_slot: parseInt(convertSlot()),
      });
    } else {
      setTicket({
        ...ticket,
        exceptional_refund: false,
        exceptional_refund_slot: parseInt(convertSlot()),
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 style={{ margin: "1vh 1vw" }}>Create Ticket</h1>
      <div className={styles["input-box"]}>
        <label className={styles.label}>Subject</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Subject"
          value={ticket?.subject}
          disabled
          onChange={function (e) {
            setTicket({ ...ticket, subject: e.target.value });
          }}
          required
        />
      </div>
      <div className={styles["input-box"]}>
        <label className={styles.label}>Status</label>
        <Select
          options={filters["status"]["choices"]}
          value={filters["status"]["choices"].map(function (item, idx) {
            if (ticket?.status == item["value"]) {
              return item;
            }
          })}
          onChange={function (e) {
            setTicket({ ...ticket, status: e.value });
          }}
        />
      </div>

      <div className={styles["input-box"]}>
        <label className={styles.label}>Issue</label>
        <Select
          options={filters["issue"]["choices"]}
          value={filters["issue"]["choices"].map(function (item, idx) {
            if (ticket?.issue == item["value"]) {
              return item;
            }
          })}
          onChange={function (e) {
            setTicket((current) => {
              const { sub_issue, further_breakup, ...ticket } = current;
              ticket["issue"] = parseInt(e.value);
              return ticket;
            });
          }}
          required
        />
      </div>

      {ticket?.issue &&
      filters["sub_issue"]["choices"].filter(function (item, idx) {
        return item["additional_key"] == ticket.issue;
      }).length > 0 ? (
        <div className={styles["input-box"]}>
          <label className={styles.label}>Sub Issue</label>
          <Select
            options={filters["sub_issue"]["choices"].filter(function (
              item,
              idx
            ) {
              return item?.additional_key == ticket?.issue;
            })}
            value={filters["sub_issue"]["choices"].map(function (item, idx) {
              if (ticket?.sub_issue == item["value"]) {
                return item;
              }
            })}
            onChange={function (e) {
              setTicket((current) => {
                const { further_breakup, ...ticket } = current;
                ticket["sub_issue"] = parseInt(e.value);
                return ticket;
              });
            }}
          />
        </div>
      ) : (
        <></>
      )}

      {ticket?.sub_issue &&
      filters["further_breakup"]["choices"].filter(function (item, idx) {
        return item["additional_key"] == parseInt(ticket.sub_issue);
      }).length > 0 ? (
        <div className={styles["input-box"]}>
          <label className={styles.label}>Further Breakup</label>
          <Select
            options={filters["further_breakup"]["choices"].filter(function (
              item,
              idx
            ) {
              return item?.additional_key == ticket?.sub_issue;
            })}
            value={filters["further_breakup"]["choices"].map(function (
              item,
              idx
            ) {
              if (ticket?.further_breakup == item["value"]) {
                return item;
              }
            })}
            onChange={function (e) {
              setTicket({
                ...ticket,
                further_breakup: parseInt(e.value),
              });
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles["input-box"]}>
        <label className={styles.label}>Ticket Outcome</label>
        <Select
          options={filters["ticket_outcome"]["choices"]}
          value={filters["ticket_outcome"]["choices"].map(function (item, idx) {
            if (ticket?.outcome == item["value"]) {
              return item;
            }
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              outcome: parseInt(e.value),
            });
          }}
          required
        />
      </div>

      <div className={styles["input-box"]}>
        <label className={styles.label}>Group</label>
        <Select
          options={filters["group"]["choices"]}
          value={filters["group"]["choices"].map(function (item, idx) {
            if (ticket?.group_id == item["value"]) {
              return item;
            }
          })}
          onChange={function (e) {
            setTicket((current) => {
              const { agent_id, ...ticket } = current;
              ticket["group_id"] = parseInt(e.value);
              return ticket;
            });
          }}
          required
        />
      </div>

      {ticket?.group_id &&
      filters["agent"]["choices"].filter(function (item, idx) {
        return item["groups"].includes(ticket.group_id);
      }).length > 0 ? (
        <div className={styles["input-box"]}>
          <label className={styles.label}>Agent</label>
          <Select
            options={filters["agent"]["choices"].filter(function (item, idx) {
              return item["groups"].includes(ticket.group_id);
            })}
            value={filters["agent"]["choices"].map(function (item, idx) {
              if (ticket?.agent_id == item["value"]) {
                return item;
              }
            })}
            onChange={function (e) {
              setTicket({ ...ticket, agent_id: e.value });
            }}
            required
          />
        </div>
      ) : (
        <></>
      )}

      {/* <div className={styles["input-box"]}>
        <label className={styles.label}>Priority</label>
        <select
          className={styles.select}
          value={ticket?.priority}
          defaultValue={-1}
          onChange={function (e) {
            setTicket({
              ...ticket,
              priority: parseInt(e.target.value),
            });
          }}
        >
          <option value={-1}>Select Priority</option>
          {filters["priority"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div> */}
      <div className={styles["input-box"]}>
        <label className={styles.label}>Ticket Type</label>
        <Select
          // className={styles.select}
          options={filters["ticket_type"]["choices"]}
          value={filters["ticket_type"]["choices"].map(function (item, idx) {
            if (ticket?.ticket_type == item["value"]) {
              return item;
            }
          })}
          onChange={function (e) {
            setTicket({
              ...ticket,
              ticket_type: parseInt(e.value),
            });
          }}
        />
      </div>

      <div className={styles["input-box"]}>
        <label className={styles.label}>Mobile Number</label>
        <input
          type="tel"
          className={styles.input}
          value={ticket?.phone}
          placeholder="Mobile Number"
          disabled
          onChange={function (e) {
            if (e.target.value.length > 10 || isNaN(e.target.value)) {
              return;
            }
            setTicket({
              ...ticket,
              phone: e.target.value ? parseInt(e.target.value) : "",
            });
          }}
          required
        />
      </div>
      <div className={styles["input-box"]}>
        <label className={styles.label}>Order ID</label>
        <input
          type="tel"
          className={styles.input}
          value={ticket?.order_id}
          placeholder="Order ID"
          onChange={function (e) {
            if (e.target.value.length > 8 || isNaN(e.target.value)) {
              return;
            }
            setTicket({
              ...ticket,
              order_id: e.target.value ? parseInt(e.target.value) : "",
            });
          }}
          required
        />
      </div>
      <div
        className={styles["input-box"]}
        style={{ opacity: check ? "0.3" : "" }}
      >
        <label className={styles.label}>Exceptional Refund</label>
        <div className={styles.radio_wrapper}>
          <div className={styles.radio_div}>
            <input
              type="radio"
              name="exceptionalFlow"
              onChange={handleExceptionalFlow}
              value="Yes"
              disabled={check}
            />
            <label className={styles.radio_text} htmlFor="">
              Yes
            </label>
          </div>
          <div className={styles.radio_div}>
            <input
              type="radio"
              name="exceptionalFlow"
              onChange={handleExceptionalFlow}
              value="No"
              disabled={check}
            />
            <label className={styles.radio_text} htmlFor="">
              No
            </label>
          </div>
        </div>
      </div>

      <div className={styles["input-box"]}>
        <label className={styles.label}>Action Supervisor</label>
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

      <div className={styles["input-box"]}>
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

      <div className={styles["input-box"]}>
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

      <div className={styles["input-box"]}>
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
          required
        />
      </div>
      <div className={styles["input-box"]}>
        <label className={styles.label}>Batch</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.batch}
          placeholder="Batch"
          onChange={function (e) {
            setTicket({
              ...ticket,
              batch: e.target.value,
            });
          }}
        />
      </div>
      <div className={styles["input-box"]}>
        <label className={styles.label}>Training Agent Name</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.training_agent_name}
          placeholder="Training Agent Name"
          onChange={function (e) {
            setTicket({
              ...ticket,
              training_agent_name: e.target.value,
            });
          }}
        />
      </div>
      {/* <div className={styles["input-box"]}>
        <label className={styles.label}>Campaign Name</label>
        <input
          type="text"
          className={styles.input}
          value={ticket?.campaign_name}
          placeholder="Campaign Name"
          onChange={function (e) {
            setTicket({ ...ticket, campaign_name: e.target.value });
          }}
        />
      </div> */}
      {/* <div className={styles["input-box"]}>
        <label className={styles.label}>Description</label>
        <JoditEditor
          className={styles.input}
          value={ticket?.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setTicket({ ...ticket, description: newContent });
          }}
        />
      </div> */}
      <div className={styles["btn-container"]}>
        <input
          className={styles["dark-btn"]}
          type="submit"
          disabled={disabled}
        />
      </div>
    </form>
  );
}

export default Ticket;
