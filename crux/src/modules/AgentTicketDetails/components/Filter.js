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
              placeholder="Select Issue"
              options={allFilters?.issue?.choices}
              value={allFilters?.issue?.choices.filter(function (item, idx) {
                return item?.value == ticketFilter?.issue;
              })}
              onChange={function (e) {
                setTicketFilter((current) => {
                  return { ...ticketFilter, issue: e?.value };
                });
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>SLA Breached</label>
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder="Select SLA"
              options={[
                { value: false, label: "YES" },
                { value: true, label: "NO" },
              ]}
              value={
                slaFilter !== undefined
                  ? { value: slaFilter, label: slaFilter ? "NO" : "YES" }
                  : null
              }
              onChange={(e) => {
                setSlaFilter(e?.value);
              }}
              styles={customStyles}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.label}>User Review</label>
          <div className={styles.select_div}>
            <Select
              isClearable={true}
              placeholder="Select NPS"
              options={[
                { value: 1, label: "Satisfied" },
                { value: 2, label: "Neutral" },
                { value: 3, label: "Not satisfied" },
              ]}
              value={
                npsFilter !== undefined
                  ? { value: npsFilter, label: getNpsLabel(npsFilter) }
                  : null
              }
              onChange={(e) => {
                setNpsFilter(e?.value);
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
