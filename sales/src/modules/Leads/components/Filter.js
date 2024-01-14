import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AppContext } from "../../../App";
import Select from "react-select";
import styles from "../css/filter.module.css";

import { add, format, parseISO } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../../../index.css";
function Filter({ filter, setFilter }) {
  const [rechargeRange, setRechargeRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      // endDate: add(new Date(), { days: 120 }),
      key: "selection",
    },
  ]);

  const [retentionRange, setRetentionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const appContext = useContext(AppContext);
  let allFilters = appContext.filters;

  useEffect(
    function () {
      if (filter) {
        localStorage.setItem("filter", JSON.stringify(filter));
      }
    },
    [filter]
  );
  function handleSubmit(e) {
    appContext.setReload(!appContext.reload);
    e.preventDefault();
  }
  function getNSlotId(date) {
    let n_slot_id =
      date.split("-").reverse().join("").substr(6) +
      date.split("-").reverse().join("").substr(2, 2) +
      date.split("-").reverse().join("").substr(0, 2);
    return n_slot_id;
  }
  function getDate(n_slot_id) {
    let date = `20${n_slot_id.slice(0, 2)}-${n_slot_id.slice(
      2,
      4
    )}-${n_slot_id.slice(4, 6)}`;
    return date;
  }

  function handleRechargeSelect(range) {
    setRechargeRange([range.selection]);
    console.log("RANGE", [range.selection]);
    console.log(range.selection);
    let start_date = format(range?.selection?.startDate, "yyMMdd");
    let end_date = format(range?.selection?.endDate, "yyMMdd");
    console.log(start_date, end_date);
    let recharge_slot = filter?.recharge_sold_slot;
    if (recharge_slot?.length > 0) {
      recharge_slot[0] = start_date;
      recharge_slot[1] = end_date;
    } else {
      recharge_slot = [start_date];
    }
    console.log("recharge----", recharge_slot);
    setFilter((current) => {
      return { ...filter, recharge_sold_slot: recharge_slot };
    });
  }

  function handleRetentionSelect(range) {
    setRetentionRange([range.selection]);
    // console.log("RANGE", [range.selection]);
    // console.log(range.selection);
    let start_date = format(range?.selection?.startDate, "yyMMdd");
    let end_date = format(range?.selection?.endDate, "yyMMdd");
    console.log(start_date, end_date);
    let retention_slot = filter?.retention_slot_id;
    if (retention_slot?.length > 0) {
      retention_slot[0] = start_date;
      retention_slot[1] = end_date;
    } else {
      retention_slot = [start_date];
    }
    console.log("recharge----", retention_slot);
    setFilter((current) => {
      return { ...filter, retention_slot_id: retention_slot };
    });
  }

  function handleDateSelect(range) {
    setDateRange([range.selection]);
    // console.log("RANGE", [range.selection]);
    // console.log(range.selection);
    let start_date = format(range?.selection?.startDate, "yyMMdd");
    let end_date = format(range?.selection?.endDate, "yyMMdd");
    console.log(start_date, end_date);
    let n_slot = filter?.n_slot_id;
    if (n_slot?.length > 0) {
      n_slot[0] = start_date;
      n_slot[1] = end_date;
    } else {
      n_slot = [start_date];
    }
    console.log("recharge----", n_slot);
    setFilter((current) => {
      return { ...filter, n_slot_id: n_slot };
    });
  }

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter}>
        <label className={styles.label}>Agent</label>
        <Select
          isMulti
          placeholder="Select agent"
          options={allFilters?.agent?.choices}
          value={allFilters?.agent?.choices.map(function (item, idx) {
            if (filter?.agent_id?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              agent_id: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
      {/* <div className={styles.filter}>
        <label className={styles.label}>Territory</label>
        <Select
          isMulti
          placeholder="Select territory"
          options={allFilters?.group?.choices}
          value={allFilters?.group?.choices.map(function (item, idx) {
            if (filter?.group_id?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          // onChange={function (e) {
          //   setFilter({
          //     ...filter,
          //     group_id: e.map(function (item, idx) {
          //       return item.value;
          //     }),
          //   });
          // }}
        />
      </div> */}
      <div className={styles.filter}>
        <label className={styles.label}>Status</label>
        <Select
          isMulti
          placeholder="Select status"
          options={allFilters?.status?.choices}
          value={allFilters?.status?.choices.map(function (item, idx) {
            if (filter?.status?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              status: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
      {/* <div className={styles.filter}>
        <label className={styles.label}>Priority</label>
        <Select
          isMulti
          placeholder="Select Priority"
          options={allFilters?.priority?.choices}
          value={allFilters?.priority?.choices.map(function (item, idx) {
            if (filter?.priority?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          // onChange={function (e) {
          //   setFilter({
          //     ...filter,
          //     priority: e.map(function (item, idx) {
          //       return item.value;
          //     }),
          //   });
          // }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Type</label>
        <Select
          isMulti
          placeholder="Select ticket type"
          options={allFilters?.ticket_type?.choices}
          value={allFilters?.ticket_type?.choices.map(function (item, idx) {
            if (filter?.ticket_type?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          // onChange={function (e) {
          //   setFilter({
          //     ...filter,
          //     ticket_type: e.map(function (item, idx) {
          //       return item.value;
          //     }),
          //   });
          // }}
        />
      </div> */}
      <div className={styles.filter}>
        <label className={styles.label}>Job Title</label>
        <Select
          isMulti
          placeholder="Select job title"
          options={allFilters?.job_title?.choices}
          value={allFilters?.job_title?.choices.map(function (item, idx) {
            if (filter?.job_title?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              job_title: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Retention Order Count</label>
        <input
          type="tel"
          className={styles.select}
          value={
            filter?.retention_order_count?.length > 0
              ? filter.retention_order_count[0]
              : 0
          }
          onChange={function (e) {
            let order_ct = e.target.value;
            let retention_order_count = filter?.retention_order_count;
            if (retention_order_count?.length > 0) {
              retention_order_count[0] =
                order_ct !== "" ? parseInt(order_ct) : order_ct;
            } else {
              retention_order_count = [
                order_ct !== "" ? parseInt(order_ct) : order_ct,
              ];
            }
            setFilter((current) => {
              return {
                ...filter,
                retention_order_count: retention_order_count,
              };
            });
          }}
        />
        <p style={{ textAlign: "center" }}>to</p>

        <input
          type="tel"
          className={styles.select}
          value={
            filter?.retention_order_count?.length > 1
              ? filter.retention_order_count[1]
              : 0
          }
          onChange={function (e) {
            let order_ct = e.target.value;
            let retention_order_count = filter?.retention_order_count;
            if (retention_order_count?.length > 1) {
              retention_order_count[1] =
                order_ct !== "" ? parseInt(order_ct) : order_ct;
            } else if (retention_order_count?.length > 0) {
              retention_order_count.push(
                order_ct !== "" ? parseInt(order_ct) : order_ct
              );
            } else {
              retention_order_count = [
                0,
                order_ct !== "" ? parseInt(order_ct) : order_ct,
              ];
            }
            setFilter((current) => {
              return {
                ...filter,
                retention_order_count: retention_order_count,
              };
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Issue</label>
        <Select
          placeholder="Select Issue"
          options={allFilters?.issue?.choices}
          value={allFilters?.issue?.choices.filter(function (item, idx) {
            return item.value == filter?.issue;
          })}
          onChange={function (e) {
            setFilter((current) => {
              const { sub_issue, further_breakup, ...filter } = current;
              return { ...filter, issue: e.value };
            });
          }}
        />
      </div>
      {filter?.issue &&
      allFilters?.sub_issue?.choices.filter(function (item, idx) {
        return item?.additional_key == filter.issue;
      }).length > 0 ? (
        <div className={styles.filter}>
          <label className={styles.label}>Sub Issue</label>
          <Select
            placeholder="Select Sub Issue"
            options={allFilters?.sub_issue?.choices.filter(function (
              item,
              idx
            ) {
              return item?.additional_key == filter?.issue;
            })}
            value={allFilters?.sub_issue?.choices.filter(function (item, idx) {
              return item.value == filter?.sub_issue;
            })}
            onChange={function (e) {
              setFilter((current) => {
                const { further_breakup, ...filter } = current;
                return { ...filter, sub_issue: e.value };
              });
            }}
          />
          {/* <select
            className={styles.select}
            value={filter?.sub_issue}
            defaultValue={-1}
            onChange={function (e) {
              setFilter({ ...filter, sub_issue: parseInt(e.target.value) });
            }}
          >
            <option value={-1}>Select Sub Issue</option>
            {allFilters?.sub_issue?.choices.map(function (item, idx) {
              if (item?.additional_key == parseInt(filter.issue)) {
                return <option value={item.value}>{item.label}</option>;
              }
            })}
          </select> */}
        </div>
      ) : (
        <></>
      )}

      {filter?.sub_issue &&
      allFilters?.further_breakup?.choices.filter(function (item, idx) {
        return item?.additional_key == parseInt(filter.sub_issue);
      }).length > 0 ? (
        <div className={styles.filter}>
          <label className={styles.label}>Further Breakup</label>
          <Select
            placeholder="Select Issue"
            options={allFilters?.further_breakup?.choices.filter(function (
              item,
              idx
            ) {
              return item?.additional_key == filter?.sub_issue;
            })}
            value={allFilters?.further_breakup?.choices.filter(function (
              item,
              idx
            ) {
              return item.value == filter?.further_breakup;
            })}
            onChange={function (e) {
              setFilter({ ...filter, further_breakup: parseInt(e.value) });
            }}
          />
          {/* <select
            className={styles.select}
            value={filter?.further_breakup}
            defaultValue={-1}
            onChange={function (e) {
              setFilter({
                ...filter,
                further_breakup: parseInt(e.target.value),
              });
            }}
          >
            <option value={-1}>Select Further Breakup</option>
            {allFilters?.further_breakup?.choices.map(function (item, idx) {
              if (item?.additional_key == filter.sub_issue) {
                return <option value={item.value}>{item.label}</option>;
              }
            })}
          </select> */}
        </div>
      ) : (
        <></>
      )}

      <div className={styles.filter}>
        <label className={styles.label}>Recurring Issue</label>
        <Select
          placeholder="select Recurring issue"
          options={allFilters?.issue?.choices}
          value={allFilters?.issue?.choices.filter(function (item, idx) {
            return item.value == filter?.recurring_issue;
          })}
          onChange={function (e) {
            setFilter((current) => {
              return { ...filter, recurring_issue: e.value };
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Retention Slot</label>
        <DateRangePicker
          ranges={retentionRange}
          onChange={handleRetentionSelect}
        />
      </div>

      <div className={styles.filter}>
        <label className={styles.label}>Recharge Sold Slot</label>

        <DateRangePicker
          ranges={rechargeRange}
          onChange={handleRechargeSelect}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Date</label>

        <DateRangePicker
          ranges={dateRange}
          onChange={handleDateSelect}
          // minDate={dateObject}
        />
      </div>

      <button className={styles.btn} onClick={handleSubmit}>
        Apply Filter
      </button>
    </div>
  );
}

export default Filter;
