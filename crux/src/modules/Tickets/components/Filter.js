import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AppContext } from "../../../App";
import { put_data } from "../../../networkHandler";
import Select from "react-select";
import styles from "../css/filter.module.css";
import { get_agent_id, get_agent_groups } from "../../../auth";
import { format, parseISO } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "../../../index.css";
import PopUp from "../../../utils/Popup";
import { ReactComponent as Close } from "../../../assets/close.svg";
import DatePicker from "../../../utils/DatePicker";
import { formatDate } from "../../../utils/utility";

function Filter({ filter, setFilter }) {
  let [selectedDate, setSelectedDate] = useState({
    from_slot: formatDate(
      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    ),
    to_slot: formatDate(new Date()),
  });

  const appContext = useContext(AppContext);

  let allFilters = appContext.filters;
  let sourceChoices = [
    { label: "Dialler", value: 1 },
    { label: "Dashboard", value: 2 },
    { label: "Three Attempt", value: 3 },
    { label: "Chat Connect", value: 4 },
    { label: "Bot", value: 5 },
  ];

  useEffect(function () {
    console.log(filter, "filter");
  }, []);

  useEffect(
    function () {
      localStorage.setItem("filter", JSON.stringify(filter));
    },
    [filter]
  );

  function handleSubmit(e) {
    appContext.setReload(!appContext.reload);
    e.preventDefault();
  }

  function handleClear() {
    setFilter((current) => {
      return { ...filter, Date: "" };
    });
  }

  function handleDate(from_slot, to_slot) {
    if (from_slot == -1 && to_slot == -1) {
      let { n_slot_id, ...f } = filter;
      setFilter({ ...f });
    } else {
      let n_slot = [];
      n_slot[0] = from_slot;
      n_slot[1] = to_slot;

      setFilter((current) => {
        return { ...current, n_slot_id: n_slot };
      });
    }
  }
  return (
    <div className={styles.filter_container}>
      <div className={styles.date_filter}>
        <div className={styles.date_picker_filter}>
          <label className={styles.date_label}>Date</label>
          <DatePicker callBackfn={handleDate} setFilter={setFilter} />
        </div>
      </div>
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
      <div className={styles.filter}>
        <label className={styles.label}>Group</label>
        <Select
          isMulti
          placeholder="Select group"
          options={allFilters?.group?.choices}
          value={allFilters?.group?.choices.map(function (item, idx) {
            if (filter?.group_id?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              group_id: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
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
      <div className={styles.filter}>
        <label className={styles.label}>Priority</label>
        <Select
          isMulti
          placeholder="Select Priority"
          options={allFilters?.priority?.choices}
          value={allFilters?.priority?.choices.map(function (item, idx) {
            if (filter?.priority?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              priority: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
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
          onChange={function (e) {
            setFilter({
              ...filter,
              ticket_type: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Outcome</label>
        <Select
          isMulti
          placeholder="Select ticket outcome"
          options={allFilters?.ticket_outcome?.choices}
          value={allFilters?.ticket_outcome?.choices.map(function (item, idx) {
            if (filter?.outcome?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              outcome: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Source</label>
        <Select
          isMulti
          placeholder="Select source"
          options={sourceChoices}
          value={sourceChoices.map(function (item, idx) {
            if (filter?.source?.includes(item.value))
              return { label: item.label, value: item.value };
          })}
          onChange={function (e) {
            setFilter({
              ...filter,
              source: e.map(function (item, idx) {
                return item.value;
              }),
            });
          }}
        />
      </div>
      <div className={styles.filter}>
        <label className={styles.label}>Issue</label>
        <Select
          isClearable={true}
          placeholder="Select Issue"
          options={allFilters?.issue?.choices}
          value={allFilters?.issue?.choices.filter(function (item, idx) {
            return item.value == filter?.issue;
          })}
          onChange={function (e) {
            setFilter((current) => {
              const { sub_issue, further_breakup, ...filter } = current;
              return { ...filter, issue: e?.value };
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
            isClearable={true}
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
                return { ...filter, sub_issue: e?.value };
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
            isClearable={true}
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
              setFilter({ ...filter, further_breakup: parseInt(e?.value) });
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

      <button className={styles.btn} onClick={handleSubmit}>
        Apply Filter
      </button>
    </div>
  );
}

export default Filter;
