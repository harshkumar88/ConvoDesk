import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import styles from "../css/style.module.css";
import { AppContext } from "../../../App";
import { get_data, post_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import { PerformanceContext } from "../index";

function GroupHeader({
  groupHeaderContext,
  tab,
  nslotId,
  supervisorId,
  setSupervisorId,
}) {
  let {
    ticket,
    setTicket,
    setData,
    performanceData,
    setperformanceData,
    data,
    filters,
    loader,
    setLoader,
  } = groupHeaderContext;

  let [groupDetails, setGroupDetails] = useState();
  let [supervisorData, setSupervisorData] = useState([]);
  const appContext = useContext(AppContext);
  const performanceContext = useContext(PerformanceContext);

  useEffect(
    function () {
      let tempData = {};
      if (filters) {
        tempData["group"] = filters["group"];
        tempData["agent"] = filters["agent"];
        setData(tempData);

        let group_data = tempData?.group?.choices.find((item) => {
          return item.label == "Fresh Chat Group ";
        });

        if (group_data) {
          setTicket({ group_id: group_data.value });
          handleSubmit(group_data.value, group_data.label);
        }
      }
    },
    [filters, tab, nslotId, supervisorId]
  );

  function handleSubmit(group_id, group_name) {
    setLoader(true);
    let resolved_body = {
      group_id: group_id,
      n_slot_id: parseInt(nslotId),
      supervisor_id: supervisorId,
    };
    let open_chat_body = {
      group_id: group_id,
      supervisor_id: supervisorId,
      n_slot_id: parseInt(nslotId),
      status: "O",
      stage: 2,
      agent_id__gt: 0,
    };
    let body = tab ? open_chat_body : resolved_body;
    post_data(
      `${API_URL}/neon/conversation/performance/v1/`,
      body,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setGroupDetails(data);
        setPerformanceContext(data.data, group_name);
        setperformanceData(data.data);
        setLoader(false);
      }
    });
  }
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(function () {
    get_data(`${API_URL}/neon/conversation/supervisors/v1/`, appContext).then(
      function (data) {
        if (data) {
          setSupervisorData(data?.data);
        }
      }
    );
  }, []);

  const options = supervisorData?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setSupervisorId(selected?.value);
  };

  function setPerformanceContext(data, group_name) {
    let details = [];
    filters.agent.choices.find((item) => {
      let get_value = data.find((it) => {
        if (it.agent_id == 0) {
          details.push({ agent_name: "---", ...it });
          return it;
        } else if (item.value == it.agent_id) {
          details.push({ agent_name: item.label, ...it });
        }
      });
      if (get_value) return item;
    });

    performanceContext.setGroupDetails([details, { group_name: group_name }]);
  }

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_wrapper}>
        <div className={styles.filter}>
          <label className={styles.select_label}>Group</label>
          <div className={styles.select_group}>
            <Select
              placeholder="-"
              options={data["group"]?.choices}
              value={data["group"]?.choices.filter(function (item, idx) {
                return item.value == ticket?.group_id;
              })}
              onChange={function (e) {
                setTicket((current) => {
                  const { agent_id, agent_id_str, agent_name, ...ticket } =
                    current;
                  return {
                    ...ticket,
                    group_id: e.value,
                    group_id_str: e.label,
                    group_name: e.label,
                  };
                });
                handleSubmit(e.value);
              }}
            />
          </div>
        </div>
        <div className={styles.filter}>
          <label className={styles.select_label}>Supervisor</label>
          <div className={styles.select_group}>
            <Select
              options={options}
              value={selectedOption}
              onChange={handleChange}
              isClearable={true}
            />
          </div>
        </div>
      </div>

      {!loader ? (
        <div className={styles.group_header}>
          <div className={styles.group_header_wrapper}>
            <label>
              Avg Resolution Time :{" "}
              <span className={styles.group_header_span}>
                {groupDetails?.avg_resolution_time}
              </span>
            </label>
            <label>
              Chat Count:{" "}
              <span className={styles.group_header_span}>
                {groupDetails?.count}
              </span>
            </label>
            <label>
              Wait Time:{" "}
              <span className={styles.group_header_span}>
                {groupDetails?.avg_wait_time}
              </span>
            </label>
          </div>
          <div className={styles.group_header_wrapper}>
            <label>
              {"<="}5 Min:{" "}
              <span className={styles.group_header_span}>
                {groupDetails?.less_than_five_min_per}
              </span>
            </label>
            <label>
              {"<="}10 Min:{" "}
              <span className={styles.group_header_span}>
                {groupDetails?.less_than_ten_min_per}
              </span>
            </label>
            <label>
              {">"}10 Min:{" "}
              <span className={styles.group_header_span}>
                {groupDetails?.greater_than_ten_min_per}
              </span>
            </label>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GroupHeader;
