import React, { useState } from "react";
import styles from "../css/style.module.css";
import GroupDetails from "./GroupDetails";
import { ReactComponent as Descending } from "../../../assets/performance/Descending.svg";
import { ReactComponent as Asscending } from "../../../assets/performance/Asscending.svg";
import GroupHeader from "./GroupHeader";
function Groups({ filters, tab, nslotId }) {
  let [ticket, setTicket] = useState({});
  let [data, setData] = useState({});
  let [isActive, setisActive] = useState({});
  let [performanceData, setperformanceData] = useState([]);
  let [clickCount, setClickCount] = useState();
  let [loader, setLoader] = useState(true);
  let [supervisorId, setSupervisorId] = useState();
  const groupHeaderContext = {
    ticket,
    setTicket,
    setData,
    performanceData,
    setperformanceData,
    data,
    filters,
    setLoader,
    loader,
  };

  function handleAsscendingSort(item) {
    let sortedData = performanceData.sort((p1, p2) =>
      p1[item] > p2[item] ? 1 : p1[item] < p2[item] ? -1 : 0
    );
    setperformanceData([...sortedData]);
    let label = `${item}_assc`;
    setisActive({ [label]: true });
  }
  function handleDescendingSort(item) {
    let sortedData = performanceData.sort((p1, p2) =>
      p1[item] < p2[item] ? 1 : p1[item] > p2[item] ? -1 : 0
    );
    setperformanceData([...sortedData]);
    let label = `${item}_desc`;
    setisActive({ [label]: true });
  }

  function handleSort(label, type) {
    if (type) {
      if (type == "desc") {
        handleDescendingSort(label);
        setClickCount();
      } else {
        handleAsscendingSort(label);
        setClickCount({ [label]: 1 });
      }
    } else {
      if (!clickCount) {
        handleAsscendingSort(label);
        setClickCount({ [label]: 1 });
      } else {
        handleDescendingSort(label);
        setClickCount();
      }
    }
  }

  return (
    <>
      <GroupHeader
        groupHeaderContext={groupHeaderContext}
        tab={tab}
        nslotId={nslotId}
        supervisorId={supervisorId}
        setSupervisorId={setSupervisorId}
      />
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className={styles.group_details}>
            <div className={styles.group_label}>
              <div className={styles.group_label_info}>
                <span className={styles.heading}>
                  <span>Agent Name</span>
                </span>
              </div>

              <div className={styles.group_label_info}>
                <span className={styles.heading}>
                  <span
                    className={styles.cursor_pointer}
                    onClick={() => handleSort("avg_resolution_time")}
                  >
                    Avg Resolution{" "}
                  </span>
                  <div className={styles.icons_flex}>
                    <Descending
                      onClick={() => handleSort("avg_resolution_time", "desc")}
                      className={
                        isActive?.avg_resolution_time_desc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                    <Asscending
                      onClick={() => handleSort("avg_resolution_time", "assc")}
                      className={
                        isActive?.avg_resolution_time_assc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                  </div>
                </span>
              </div>

              <div className={styles.group_label_info}>
                <span className={styles.heading}>
                  <span
                    className={styles.cursor_pointer}
                    onClick={() => handleSort("count")}
                  >
                    Chat Count
                  </span>
                  <div className={styles.icons_flex}>
                    <Descending
                      onClick={() => handleSort("count", "desc")}
                      className={
                        isActive?.count_desc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                    <Asscending
                      onClick={() => handleSort("count", "assc")}
                      className={
                        isActive?.count_assc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                  </div>
                </span>
              </div>
              <div className={styles.group_label_info}>
                <span className={styles.heading}>
                  <span
                    className={styles.cursor_pointer}
                    onClick={() => handleSort("less_than_five_min_per")}
                  >
                    {"<="}5 min %
                  </span>
                  <div className={styles.icons_flex}>
                    <Descending
                      onClick={() =>
                        handleSort("less_than_five_min_per", "desc")
                      }
                      className={
                        isActive?.less_than_five_min_per_desc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                    <Asscending
                      onClick={() =>
                        handleSort("less_than_five_min_per", "assc")
                      }
                      className={
                        isActive?.less_than_five_min_per_assc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                  </div>
                </span>
              </div>
              <div className={styles.group_label_info}>
                <span className={styles.heading}>
                  <span
                    className={styles.cursor_pointer}
                    onClick={() => handleSort("less_than_ten_min_per")}
                  >
                    {" "}
                    {"<="}10 min %
                  </span>
                  <div className={styles.icons_flex}>
                    <Descending
                      onClick={() =>
                        handleSort("less_than_ten_min_per", "desc")
                      }
                      className={
                        isActive?.less_than_ten_min_per_desc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                    <Asscending
                      onClick={() =>
                        handleSort("less_than_ten_min_per", "assc")
                      }
                      className={
                        isActive?.less_than_ten_min_per_assc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                  </div>
                </span>
              </div>

              <div className={styles.group_label_info}>
                <span className={styles.heading}>
                  <span
                    className={styles.cursor_pointer}
                    onClick={() => handleSort("greater_than_ten_min_per")}
                  >
                    {">"}10 min %
                  </span>
                  <div className={styles.icons_flex}>
                    <Descending
                      onClick={() =>
                        handleSort("greater_than_ten_min_per", "desc")
                      }
                      className={
                        isActive?.greater_than_ten_min_per_desc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                    <Asscending
                      onClick={() =>
                        handleSort("greater_than_ten_min_per", "assc")
                      }
                      className={
                        isActive?.greater_than_ten_min_per_assc
                          ? styles.active_icon
                          : styles.sort_icons
                      }
                    />
                  </div>
                </span>
              </div>

              <div className={`${styles.group_label_info} ${styles.last_info}`}>
                <span className={styles.heading}>{""}</span>
              </div>
            </div>
          </div>

          {performanceData.length > 0 ? (
            performanceData.map((item, id) => {
              return (
                <GroupDetails
                  item={item}
                  key={id}
                  filters={filters}
                  handleAsscendingSort={handleAsscendingSort}
                  handleDescendingSort={handleDescendingSort}
                  tab={tab}
                  supervisorId={supervisorId}
                  nslotId={nslotId}
                />
              );
            })
          ) : ticket?.group_id ? (
            <>
              <div className={styles.data_error}>No Data found</div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default Groups;
