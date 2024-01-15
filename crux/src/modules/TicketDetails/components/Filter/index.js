import React, { useContext, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { AppContext } from "../../../../App";
import { API_URL } from "../../../../config";
import { put_data } from "../../../../ReactLib/networkhandler";
import styles from "./style.module.css";

function Filter({ data, ticket_id, filters }) {
  let [search, setSearch] = useState(false);
  let [txt, setTxt] = useState("");
  let [change, setChange] = useState({});
  let [issue, setIssue] = useState(-1);
  let [group, setGroup] = useState(-1);
  let [subIssue, setSubIssue] = useState(-1);
  const appContext = useContext(AppContext);

  useEffect(
    function () {
      let temp = {};
      filters.map(function (item, idx) {
        temp[item.key] = data[item.key];
        if (item.key == "issue") {
          setIssue(data[item.key]);
        }
        if (item.key == "sub_issue") {
          setSubIssue(data[item.key]);
        }
        if (item.key == "group") {
          setGroup(data[item.key]);
        }
      });
      setChange(temp);
    },
    [data]
  );

  function toggleSearch() {
    setTxt("");
    setSearch(!search);
  }
  function handleTxt(e) {
    setTxt(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    put_data(
      `${API_URL}/crux/update/ticket/v1/`,
      { ticket_id: ticket_id, data: change },
      appContext
    );
  }
  return (
    <div className={styles.filter_container}>
      <div className={styles.search}>
        <div className={styles.label}>
          <label>Disposition</label>
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
      {filters.map(function (item, idx) {
        return (
          <div className={styles.filter}>
            {item.key == "sub_issue" ? (
              issue != -1 ? (
                <>
                  <label>{item.label}</label>
                  <select
                    className={styles.select}
                    onChange={function (e) {
                      let temp = { ...change };
                      temp[item.key] = parseInt(e.target.value);
                      setChange(temp);
                      setSubIssue(parseInt(e.target.value));
                    }}
                    value={change[item.key]}
                  >
                    <option disabled>Select {item.label}</option>
                    {item.choices.map(function (element, index) {
                      if (element.additional_key == change.issue) {
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
                      let temp = { ...change };
                      temp[item.key] = parseInt(e.target.value);
                      setChange(temp);
                    }}
                    value={change[item.key]}
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
                      let temp = { ...change };
                      temp[item.key] = parseInt(e.target.value);
                      setChange(temp);
                    }}
                    value={change[item.key]}
                  >
                    <option disabled>Select {item.label}</option>
                    {item.choices.map(function (element, index) {
                      if (element.additional_key == change.sub_issue) {
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
                    value={change[item.key]}
                    onChange={function (e) {
                      let temp = { ...change };
                      temp[item.key] =
                        item.key == "status"
                          ? e.target.value
                          : parseInt(e.target.value);
                      setChange(temp);
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
                      value={change[item.key]}
                      placeholder={item.label}
                      className={styles.input}
                      onChange={function (e) {
                        let temp = { ...change };
                        temp[item.key] = e.target.value
                          ? parseInt(e.target.value)
                          : "";
                        setChange(temp);
                      }}
                    />
                    {console.log(change[item.key])}
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
        Update Ticket
      </button>
    </div>
  );
}

export default Filter;
