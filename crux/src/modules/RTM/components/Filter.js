import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AppContext } from "../../../App";
import styles from "../css/filter.module.css";
function Filter({ allFilters, filter, setFilter }) {
  let [search, setSearch] = useState(false);
  let [txt, setTxt] = useState("");
  // let [change, setFilter] = useState({});
  let [issue, setIssue] = useState(-1);
  let [group, setGroup] = useState(-1);
  let [subIssue, setSubIssue] = useState(-1);
  const appContext = useContext(AppContext);
  function toggleSearch() {
    setTxt("");
    setSearch(!search);
  }
  function handleTxt(e) {
    setTxt(e.target.value);
  }
  function handleSubmit(e) {
    appContext.setReload(!appContext.reload);
    // console.log(change);
    e.preventDefault();
    // put_data(
    //   `${API_URL}/crux/update/ticket/v1/`,
    //   { ticket_id: ticket_id, data: change },
    //   appContext
    // );
  }
  return (
    <div className={styles.filter_container}>
      <div className={styles.search}>
        <div className={styles.label}>
          <label>Filter</label>
          {/* <span className={styles.search_icon} onClick={toggleSearch}>
            <BiSearchAlt />
          </span> */}
        </div>
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
      {allFilters.map(function (item, idx) {
        return (
          <div className={styles.filter}>
            {item.key == "sub_issue" ? (
              issue != -1 ? (
                <>
                  <label>{item.label}</label>
                  <select
                    className={styles.select}
                    onChange={function (e) {
                      let temp = { ...filter };
                      temp[item.key] = parseInt(e.target.value);
                      setFilter(temp);
                      setSubIssue(parseInt(e.target.value));
                    }}
                    value={filter[item.key]}
                  >
                    <option disabled>Select {item.label}</option>
                    {item.choices.map(function (element, index) {
                      if (element.additional_key == filter.issue) {
                        return (
                          <option value={element.value}>{element.label}</option>
                        );
                      }
                    })}
                  </select>
                </>
              ) : (
                <></>
              )
            ) : item.key == "agent" ? (
              group != -1 ? (
                <>
                  <label>{item.label}</label>
                  <select
                    className={styles.select}
                    onChange={function (e) {
                      let temp = { ...filter };
                      temp[item.key] = parseInt(e.target.value);
                      setFilter(temp);
                    }}
                    value={filter[item.key]}
                  >
                    <option disabled>Select {item.label}</option>
                    {item.choices.map(function (element, index) {
                      if (element.groups.includes(group)) {
                        return (
                          <option value={element.value}>{element.label}</option>
                        );
                      }
                    })}
                  </select>
                </>
              ) : (
                <></>
              )
            ) : item.key == "further_breakup" ? (
              subIssue != -1 ? (
                <>
                  <label>{item.label}</label>
                  <select
                    className={styles.select}
                    onChange={function (e) {
                      let temp = { ...filter };
                      temp[item.key] = parseInt(e.target.value);
                      setFilter(temp);
                    }}
                    value={filter[item.key]}
                  >
                    <option disabled>Select {item.label}</option>
                    {item.choices.map(function (element, index) {
                      if (element.additional_key == filter.sub_issue) {
                        return (
                          <option value={element.value}>{element.label}</option>
                        );
                      }
                    })}
                  </select>
                </>
              ) : (
                <></>
              )
            ) : (
              <>
                <label>{item.label}</label>
                {item.inputType == "select" ? (
                  <select
                    className={styles.select}
                    value={filter[item.key]}
                    onChange={function (e) {
                      let temp = { ...filter };
                      temp[item.key] =
                        item.key == "status"
                          ? e.target.value
                          : parseInt(e.target.value);
                      setFilter(temp);
                      if (item.key == "issue") {
                        setIssue(parseInt(e.target.value));
                      }
                      if (item.key == "group") {
                        setGroup(parseInt(e.target.value));
                      }
                    }}
                    // defaultValue={data[item.key]}
                  >
                    <option disabled>Select {item.label}</option>
                    {item.choices.map(function (element, index) {
                      return (
                        <option value={element.value}>{element.label}</option>
                      );
                    })}
                  </select>
                ) : item.inputType == "tel" ? (
                  <>
                    <input
                      type="text"
                      value={filter[item.key]}
                      placeholder={item.label}
                      className={styles.input}
                      onChange={function (e) {
                        let temp = { ...filter };
                        temp[item.key] = e.target.value
                          ? parseInt(e.target.value)
                          : "";
                        setFilter(temp);
                      }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        );
      })}
      <button className={styles.btn} onClick={handleSubmit}>
        Apply Filter
      </button>
    </div>
  );
}

export default Filter;
