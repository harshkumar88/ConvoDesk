import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../App";
import { API_URL } from "../../config";
import { get_data, post_data } from "../../networkHandler";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

function CreateTicket() {
  let [ticket, setTicket] = useState({
    phone: "",
    order_id: "",
    refund_amount: "",
  });
  let [data, setData] = useState({});
  let [loader, setLoader] = useState(true);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(function () {
    appContext.setTitle("Ticket");
    let filters = appContext.filters;
    if (filters && filters.length) {
      setData(filters);
      setLoader(false);
    } else {
      get_data(
        `${API_URL}/crux/ticket/filters/v1/`,
        {},
        appContext,
        false
      ).then(function (data) {
        if (data) {
          let tempData = {};
          data.data.map(function (item, idx) {
            tempData[item["key"]] = item;
          });
          appContext.setFilters(tempData);
          setData(tempData);
          setLoader(false);
        }
      });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(ticket);
    ticket["source"] = 2;
    if (ticket["subject"] && ticket["description"] && ticket["phone"]) {
      post_data(
        `${API_URL}/crux/create/ticket/v1/`,
        ticket,
        appContext,
        true
      ).then(function (data) {
        if (data) {
          navigate(`/ticket/details/${data.ticket_id}`);
        }
      });
    } else {
      appContext.setAlert("Provide valid data !!", "alert_error");
    }
  }
  return loader ? (
    <></>
  ) : (
    <form className="form" onSubmit={handleSubmit}>
      <h1 style={{ margin: "1vh 1vw" }}>Create Dashboard Ticket</h1>
      <div className="input-box">
        <label className="label">Subject</label>
        <input
          type="text"
          className="input"
          placeholder="Subject"
          value={ticket?.subject}
          onChange={function (e) {
            setTicket({ ...ticket, subject: e.target.value });
          }}
          required
        />
      </div>
      <div className="input-box">
        <label className="label">Status</label>
        <select
          className="select"
          onChange={function (e) {
            setTicket({ ...ticket, status: e.target.value });
          }}
          value={ticket?.status}
          defaultValue={-1}
        >
          <option value={-1}>Select Status</option>
          {data["status"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>
      <div className="input-box">
        <label className="label">Issue</label>
        <select
          className="select"
          value={ticket?.issue}
          defaultValue={-1}
          onChange={function (e) {
            setTicket((current) => {
              const { sub_issue, further_breakup, ...ticket } = current;
              ticket["issue"] = parseInt(e.target.value);
              return ticket;
            });
          }}
        >
          <option value={-1}>Select Issue</option>
          {data["issue"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>

      {ticket?.issue &&
      data["sub_issue"]["choices"].filter(function (item, idx) {
        return item["additional_key"] == ticket.issue;
      }).length > 0 ? (
        <div className="input-box">
          <label className="label">Sub Issue</label>
          <select
            className="select"
            value={ticket?.sub_issue}
            defaultValue={-1}
            onChange={function (e) {
              setTicket((current) => {
                const { further_breakup, ...ticket } = current;
                ticket["sub_issue"] = parseInt(e.target.value);
                return ticket;
              });
            }}
          >
            <option value={-1}>Select Sub Issue</option>
            {data["sub_issue"]["choices"].map(function (item, idx) {
              if (item["additional_key"] == parseInt(ticket.issue)) {
                return <option value={item.value}>{item.label}</option>;
              }
            })}
          </select>
        </div>
      ) : (
        <></>
      )}

      {ticket?.sub_issue &&
      data["further_breakup"]["choices"].filter(function (item, idx) {
        return item["additional_key"] == parseInt(ticket.sub_issue);
      }).length > 0 ? (
        <div className="input-box">
          <label className="label">Further Breakup</label>
          <select
            className="select"
            value={ticket?.further_breakup}
            defaultValue={-1}
            onChange={function (e) {
              setTicket({ ...ticket, further_breakup: e.target.value });
            }}
          >
            <option value={-1}>Select Further Breakup</option>
            {data["further_breakup"]["choices"].map(function (item, idx) {
              if (item["additional_key"] == ticket.sub_issue) {
                return <option value={item.value}>{item.label}</option>;
              }
            })}
          </select>
        </div>
      ) : (
        <></>
      )}

      <div className="input-box">
        <label className="label">Group</label>
        <select
          className="select"
          value={ticket?.group_id}
          defaultValue={-1}
          onChange={function (e) {
            setTicket((current) => {
              const { agent_id, ...ticket } = current;
              ticket["group_id"] = parseInt(e.target.value);
              return ticket;
            });
          }}
        >
          <option value={-1}>Select Group</option>
          {data["group"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>

      {ticket?.group_id &&
      data["agent"]["choices"].filter(function (item, idx) {
        return item["groups"].includes(ticket.group_id);
      }).length > 0 ? (
        <div className="input-box">
          <label className="label">Agent</label>
          <select
            className="select"
            value={ticket?.agent_id}
            defaultValue={-1}
            onChange={function (e) {
              setTicket({ ...ticket, agent_id: e.target.value });
            }}
          >
            <option value={-1}>Select Agent</option>
            {data["agent"]["choices"].map(function (item, idx) {
              if (item["groups"].includes(ticket.group_id)) {
                return <option value={item.value}>{item.label}</option>;
              }
            })}
          </select>
        </div>
      ) : (
        <></>
      )}

      <div className="input-box">
        <label className="label">Ticket Outcome</label>
        <select
          className="select"
          value={ticket?.outcome}
          defaultValue={-1}
          onChange={function (e) {
            setTicket({
              ...ticket,
              outcome: parseInt(e.target.value),
            });
          }}
        >
          <option value={-1}>Select Ticket Outcome</option>
          {data["ticket_outcome"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>
      <div className="input-box">
        <label className="label">Priority</label>
        <select
          className="select"
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
          {data["priority"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>
      <div className="input-box">
        <label className="label">Ticket Type</label>
        <select
          className="select"
          value={ticket?.type}
          defaultValue={-1}
          onChange={function (e) {
            setTicket({
              ...ticket,
              ticket_type: parseInt(e.target.value),
            });
          }}
        >
          <option value={-1}>Select Ticket Type</option>
          {data["ticket_type"].choices.map(function (item, idx) {
            return <option value={item.value}>{item.label}</option>;
          })}
        </select>
      </div>

      <div className="input-box">
        <label className="label">Mobile Number</label>
        <input
          type="text"
          className="input"
          value={ticket?.phone}
          placeholder="Mobile Number"
          onChange={function (e) {
            if (isNaN(e.target.value)) {
              return;
            }
            if (e.target.value.length > 10) {
              return;
            }
            setTicket({
              ...ticket,
              phone: e.target.value ? e.target.value : "",
            });
          }}
          required
        />
      </div>
      <div className="input-box">
        <label className="label">Order ID</label>
        <input
          type="text"
          className="input"
          value={ticket?.order_id}
          placeholder="Order ID"
          onChange={function (e) {
            if (isNaN(e.target.value)) {
              return;
            }
            if (e.target.value.length > 9) {
              return;
            }
            setTicket({
              ...ticket,
              order_id:
                e.target.value != ""
                  ? parseInt(e.target.value)
                  : e.target.value,
            });
          }}
          required
        />
      </div>
      <div className="input-box">
        <label className="label">Refund Amount</label>
        <input
          type="text"
          className="input"
          value={ticket?.refund_amount}
          placeholder="Refund Amount"
          onChange={function (e) {
            if (isNaN(e.target.value)) {
              return;
            }
            if (e.target.value.length > 5) {
              return;
            }
            setTicket({
              ...ticket,
              refund_amount:
                e.target.value != ""
                  ? parseInt(e.target.value)
                  : e.target.value,
            });
          }}
          required
        />
      </div>
      <div className="input-box">
        <label className="label">Campaign Name</label>
        <input
          type="text"
          className="input"
          value={ticket?.campaign_name}
          placeholder="Campaign Name"
          onChange={function (e) {
            setTicket({ ...ticket, campaign_name: e.target.value });
          }}
        />
      </div>
      <div className="input-box">
        <label className="label">Description</label>
        <JoditEditor
          className="input"
          value={ticket?.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setTicket({ ...ticket, description: newContent });
          }}
        />
      </div>
      <div className="btn-container">
        <input className="dark-btn" type="submit" />
      </div>
    </form>
  );
}

export default CreateTicket;
