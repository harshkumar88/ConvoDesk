import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { ReactComponent as Close } from "../../../../../../assets/cross.svg";
import { post_data } from "../../../../../../ReactLib/networkhandler";
import { API_URL } from "../../../../../../config";
import { get_file_name } from "../../../../../../ReactLib/auth";

function SideBar({ show, setShow, appContext }) {
  const sideBarRef = useRef(null);
  let [data, setData] = useState([]);
  let [selectAll, setSelectAll] = useState(false);
  let arr = [
    { label: "Ticket Created Time", value: "created_at" },
    { label: "Ticket ID", value: "id" },
    { label: "Status", value: "status" },
    { label: "Order ID", value: "order_id" },
    { label: "Refund Amount", value: "refund_amount" },
    { label: "Phone", value: "phone" },
    { label: "Subject", value: "subject" },
    { label: "Issue", value: "issue" },
    { label: "Sub Issue", value: "sub_issue" },
    { label: "Further Breakup", value: "further_breakup" },
    { label: "Ticket Type", value: "ticket_type" },
    { label: "Ticket Outcome", value: "ticket_outcome" },
    { label: "Agent", value: "agent" },
    { label: "Group", value: "group_name" },
    { label: "Source", value: "source" },
    { label: "First Response Time", value: "first_response_time" },
    { label: "Resolution Time", value: "resolution_time" },
    { label: "Agent Assign Time", value: "agent_assign_time" },
    { label: "Group Assign Time", value: "group_assign_time" },
    { label: "Chat Resolve Time", value: "chat_resolve_time" },
    { label: "Created Time", value: "cf_created_time" },
    { label: "Segment", value: "cf_segment" },
    { label: "Zone", value: "cf_zone_name" },
    { label: "Conversation ID", value: "conversation_id" },
    {
      label: "Secondary Group Assign Time",
      value: "secondary_group_assign_time",
    },
    { label: "NPS", value: "nps" },
  ];

  const download = function (data) {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `crux_export_${get_file_name()}.csv`);
    a.click();
  };

  const csvmaker = function (data) {
    let csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));
    data.map(function (item, idx) {
      const values = Object.values(item).join(",");
      csvRows.push(values);
    });

    return csvRows.join("\n");
  };
  useEffect(() => {
    if (data.length === arr.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [data, arr]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  function handleClick() {
    setShow(false);
  }

  function handleChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setData((prevData) => [...prevData, value]);
    } else {
      setData((prevData) => prevData.filter((item) => item !== value));
    }
  }

  function get_count() {
    if (data.length === 0) {
      return;
    } else if (data.length === 1) {
      return "1 field selected";
    } else {
      return `${data.length} fields selected`;
    }
  }

  function handleSelectAll() {
    if (selectAll) {
      setData([]);
    } else {
      setData(arr.map((item) => item.value));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (data.length === 0) {
      appContext.setAlert("Please select a field to proceed", "alert_error");
      return;
    }
    // if (appContext.selectedFilter.n_slot_id.length === 0) {
    //   appContext.setAlert("Please select date to proceed", "alert_error");
    //   return;
    // }
    let body = {
      filters: [appContext.selectedFilter],
      keys: data,
    };

    const selectedPairs = arr.filter((item) => data.includes(item.value));
    post_data(`${API_URL}/crux/ticket/export/v1/`, body, appContext).then(
      function (apidata) {
        if (apidata.success === true) {
          if (apidata.data.length === 0) {
            appContext.setAlert("No Data Found", "alert_error");
            setShow(false);
            return;
          }

          const csvdata = csvmaker(
            apidata.data.map(function (item, idx) {
              const rowData = {};
              selectedPairs.forEach((selectedItem) => {
                if (selectedItem.value === "subject") {
                  rowData[selectedItem.label] = item[selectedItem.value]
                    .split(",")
                    .join(" ");
                } else if (selectedItem.value == "nps") {
                  let value = item[selectedItem.value];
                  rowData[selectedItem.label] =
                    value == "1"
                      ? "Happy With Support"
                      : value == "2"
                      ? "Neutral"
                      : value == "3"
                      ? "Not Satisfied"
                      : "-";
                } else {
                  rowData[selectedItem.label] = item[selectedItem.value];
                }
              });
              return rowData;
            })
          );

          download(csvdata);
          setShow(false);
        }
      }
    );
  }
  return (
    <div className={styles.sidenav} style={{ width: show ? "96%" : "0" }}>
      <div className={styles.sidenav_body} ref={sideBarRef}>
        <p onClick={handleClick} className={styles.close}>
          <Close />
        </p>
        <div>
          <div>
            <div className={styles.heading}>
              <h2>Export Tickets</h2>
            </div>
            <div className={styles.container}>
              <div className={styles.subheader}>
                <div>
                  <p className={styles.p}>Ticket fields</p>
                  <p className={styles.info_text}>
                    Please choose at least one ticket field to proceed
                  </p>
                </div>
                <p className={styles.info_text}>{get_count()}</p>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.select_all_div}>
                  <input
                    type="checkbox"
                    name="selectAll"
                    checked={selectAll}
                    className={styles.check}
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="" className={styles.label}>
                    Select All
                  </label>
                </div>
                {arr?.map(function (item, idx) {
                  return (
                    <div className={styles.checkbox_div} key={idx}>
                      <input
                        type="checkbox"
                        name="filters"
                        value={item.value}
                        className={styles.check}
                        onChange={handleChange}
                        checked={data.includes(item.value)}
                      />
                      <label htmlFor="" className={styles.label}>
                        {item.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button className={styles.cancel_btn} onClick={handleClick}>
              Cancel
            </button>
            <button className={styles.export} onClick={handleConfirm}>
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
