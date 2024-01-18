import React from "react";
import styles from "../css/style.module.css";
import Select from "react-select";

function Filter({
  allFilters,
  ticketFilter,
  setTicketFilter,
  slaFilter,
  setSlaFilter,
  npsFilter,
  setNpsFilter,
  sourceChoices,
  risk_action_choices,
  source_refund_choices,
  setRiskAction,
  setSourceRefund,
}) {
  const getNpsLabel = (nps) => {
    switch (nps) {
      case 1:
        return "Satisfied";
      case 2:
        return "Neutral";
      case 3:
        return "Not satisfied";
      default:
        return "";
    }
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#EEEEEE",
      border: "none",
    }),
  };
  return (
    <>
      <div className={styles.row_1}>
        <div className={styles.filter}>
          <label className={styles.label}>Issue</label>
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder="Select "
              options={allFilters?.issue?.choices}
              value={allFilters?.issue?.choices.filter(function (item, idx) {
                return item?.value == ticketFilter?.issue;
              })}
              onChange={function (e) {
                let { sub_issue, further_breakup, ...issueFilter } =
                  ticketFilter;
                setTicketFilter((current) => {
                  return {
                    ...issueFilter,
                    issue: e?.value,
                  };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Sub Issue</label>
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder="Select "
              options={allFilters?.sub_issue?.choices.filter(
                (item) => item.additional_key === ticketFilter?.issue
              )}
              value={allFilters?.sub_issue?.choices.filter(function (
                item,
                idx
              ) {
                return item?.value == ticketFilter?.sub_issue;
              })}
              onChange={function (e) {
                let { further_breakup, ...issueFilter } = ticketFilter;
                setTicketFilter((current) => {
                  return {
                    ...issueFilter,
                    sub_issue: e?.value,
                  };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Further Breakup</label>
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder=" Select"
              options={allFilters?.further_breakup?.choices.filter(
                (item) => item.additional_key === ticketFilter?.sub_issue
              )}
              value={allFilters?.further_breakup?.choices.filter(function (
                item,
                idx
              ) {
                return item?.value == ticketFilter?.further_breakup;
              })}
              onChange={function (e) {
                setTicketFilter((current) => {
                  return { ...ticketFilter, further_breakup: e?.value };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Agent </label>
          <div className={styles.select_div}>
            <Select
              isMulti
              isClearable={true}
              placeholder="Select "
              options={allFilters?.agent?.choices}
              onChange={function (e) {
                setTicketFilter((current) => {
                  return {
                    ...ticketFilter,
                    agent_id: e.map(function (item, idx) {
                      return item.value;
                    }),
                  };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Group </label>
          <div className={styles.select_div}>
            <Select
              isMulti
              isClearable={true}
              placeholder="Select "
              options={allFilters?.group?.choices}
              onChange={function (e) {
                setTicketFilter((current) => {
                  return {
                    ...ticketFilter,
                    group_id: e.map(function (item, idx) {
                      return item.value;
                    }),
                  };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>{" "}
        {/* <div className={styles.filter}>
          <label className={styles.label}>Source</label>{" "}
          <div className={styles.select_div}>
            <Select
              isMulti
              isClearable={true}
              placeholder="Select source"
              options={sourceChoices}
              onChange={function (e) {
                setTicketFilter((current) => {
                  return {
                    ...ticketFilter,
                    source: e.map(function (item, idx) {
                      return item.value;
                    }),
                  };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>{" "} */}
        <div className={styles.filter}>
          <label className={styles.label}>Risk Action</label>{" "}
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder="Select"
              options={risk_action_choices}
              onChange={function (e) {
                setRiskAction(e?.value);
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>Source Refund</label>{" "}
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder="Select"
              options={source_refund_choices}
              onChange={function (e) {
                setSourceRefund(e?.value);
              }}
              styles={customStyles}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
