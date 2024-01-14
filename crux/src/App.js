import React, { createContext, useEffect, useState, useRef } from "react";
import "./style.css";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { get_data, post_data, put_data } from "./networkHandler";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import {
  get_agent_groups,
  get_agent_id,
  get_nslot_id,
  isAgentLoggedIn,
} from "./auth";
import Select from "react-select";
import { localStorageSpace } from "./utils/utility";
const AppContext = createContext();
function App() {
  let [header, setHeader] = useState("header");
  let [alert_class, setClass] = useState("alert");
  let [response, setResponse] = useState("");
  let [load, setLoad] = useState(false);
  let [reload, setReload] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [drawer, setDrawer] = useState(true);
  let [filter, setFilter] = useState(true);
  let [layout, setLayout] = useState("table");
  let [selected, setSelected] = useState(true);
  let [dialler, setDialler] = useState(false);
  let [usersBreak, setUsersBreak] = useState(false);
  const [page, setPage] = useState("home");
  let [title, setTitle] = useState("All Tickets");
  let [issueDict, setIssueDict] = useState({});
  let [filters, setFilters] = useState([]);
  let [note, setNote] = useState(0);
  let [selectedFilter, setSelectedFilter] = useState({});

  function loadFilterFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("filter"));
    if (data) {
      setSelectedFilter(data);
    } else {
      let agentId = get_agent_id();
      let groupId = get_agent_groups();
      setSelectedFilter({
        agent_id: agentId ? [parseInt(agentId)] : [],
        group_id: groupId ? groupId : [],
        n_slot_id: [get_nslot_id(), get_nslot_id()],
      });
    }
  }

  const options = [
    { value: 1, label: "☕ Snacks 1" },
    { value: 2, label: "🏋 Training" },
    { value: 3, label: "🍱 Lunch" },
    { value: 4, label: "💧 Bio Break" },
    { value: 5, label: "🤞 Quality Feedback" },
    { value: 6, label: "🤝 Team Meeting" },
    { value: 7, label: "👏 PKT" },
    { value: 8, label: "🎓 1 - 1 Session" },
    { value: 9, label: "😃 Fun Activity" },
    { value: 10, label: "👺 HR / ADMIN" },
    { value: 11, label: "🕰 OT BREAK" },
    { value: 12, label: "😀 Risk Session" },
    { value: 13, label: "🙌 Quality Refresher" },
    { value: 14, label: "🍩 Snacks 2" },
    { value: 15, label: "✅ Available" },
    { value: 16, label: "🔴 Offline" },
  ];
  let [agentBreak, setAgentBreak] = useState({});
  let [search, setSearch] = useState(false);
  let [callType, setCallType] = useState({
    "Manual Dialing": 1,
    "Progressive Dialing": 2,
    IncomingCall: 3,
  });
  let searchRef = useRef(null);
  useEffect(
    function () {
      if (isAgentLoggedIn()) {
        get_break_details();
      }
    },
    [reload]
  );

  function get_break_details() {
    get_data(`${API_URL}/crux/users/break/v1/`, value).then(function (data) {
      setAgentBreak(data.data);
    });
  }
  const myStateRef = useRef({
    issueDict: issueDict,
    ticket_id: 0,
    updated_ticket_id: 0,
  });
  const setRef = (data, type) => {
    if (type == "issue") {
      myStateRef.current.issueDict = data;
      setIssueDict(data);
    } else if (type == "updated_ticket_id") {
      myStateRef.current.updated_ticket_id = data;
    } else {
      myStateRef.current.ticket_id = data;
    }
  };
  function toggleDialler() {
    setDialler(!dialler);
  }
  function toggleUsersBreak() {
    setUsersBreak(!usersBreak);
  }
  function setAlert(res, className) {
    setClass(className);
    setResponse(res);
    setTimeout(function () {
      setClass("alert");
    }, 1000);
  }
  function tryNote() {
    setNote(Math.round(Math.random() * 100000));
  }
  function toggleSideBar() {
    setSidebar(!sidebar);
  }
  let value = {
    title,
    setTitle,
    page,
    setPage,
    header,
    setHeader,
    setResponse,
    alert_class,
    response,
    setClass,
    setLoad,
    load,
    sidebar,
    toggleSideBar,
    setAlert,
    reload,
    setReload,
    drawer,
    setDrawer,
    filter,
    setFilter,
    layout,
    setLayout,
    selected,
    setSelected,
    dialler,
    toggleDialler,
    filters,
    setFilters,
    search,
    setSearch,
    searchRef,
    setRef,
    note,
    setNote,
    selectedFilter,
    setSelectedFilter,
    usersBreak,
    setUsersBreak,
    toggleUsersBreak,
    setAgentBreak,
  };
  const navigate = useNavigate();
  function checkClick(e) {
    if (
      searchRef &&
      searchRef.current &&
      searchRef.current.contains(e.target)
    ) {
      return;
    }
    setSearch(false);
  }

  useEffect(function () {
    // get_filters();
    loadFilterFromLocalStorage();
    console.log(issueDict);

    window.addEventListener("message", (event) => {
      let payload = event.data;
      if (payload.action === "busyAgent" || payload.action == "dropCall") {
        console.log("Harshitxs", payload);
        // localStorageSpace(payload);
      }
      if (payload.action === "busyAgent") {
        let body = payload.token;
        let issue = body["cust_info"]["Filed3"];
        let issueDictData = myStateRef.current.issueDict;
        let data = {};
        data["call_source"] = callType[body["callType"]];
        data["phone"] = body["callerId"].slice(-10);

        data["source"] = 1;
        data["campaign_name"] = body["campaignName"];
        data["ucid"] = body["ucid"];

        let new_desc = `<p>From: ${data["phone"]}</p><p>Monitor UCID: ${body["ucid"]}</p><p>Call Type: ${body["callType"]}</p>`;
        data["subject"] = body["cust_info"]["Name"];
        data["description"] = body["cust_info"]["Filed1"]
          ? body["cust_info"]["Filed1"]
          : new_desc;
        data["order_id"] = body["cust_info"]["Filed2"] || 0;
        data["issue"] = issueDictData[issue];
        data["call_type"] = body["callType"];
        data["email"] = body["agentId"];
        data["call_recording"] = body["audioFile"];
        data["cf_segment"] = body?.cust_info?.cf_segment;
        data["cf_zone_name"] = body?.cust_info?.cf_zone_name;
        data["cf_created_time"] = body?.cust_info?.cf_call_created_time;
        data["partner_id"] = body?.cust_info?.cf_first_call || 0;
        data["case_id"] = body?.cust_info?.case_id || 0;
        if (body["campaignName"] == "Progressive_Followup_call_Campaign_1") {
          let prog_ticket_id = data["subject"];
          setRef(prog_ticket_id, "ticket_id");
          navigate(`/ticket/details/${prog_ticket_id}`);
        } else {
          post_data(
            `${API_URL}/crux/create/ticket/v1/`,
            data,
            value,
            true
          ).then(function (data) {
            if (data) {
              setRef(data.ticket_id, "ticket_id");
              navigate(`/ticket/details/${data.ticket_id}`);
            }
          });
        }
      }
      if (
        payload.action === "dropCall" &&
        myStateRef.current.ticket_id &&
        myStateRef.current.ticket_id != myStateRef.current.updated_ticket_id
      ) {
        let body = payload.token;
        let data = {};
        let callStartTime = parseInt(body["startTime"].getTime() / 1000);
        let callStartTimeStr = body["startTime"].toLocaleTimeString();
        let callEndTime = parseInt(body["endTime"].getTime() / 1000);
        let callEndTimeStr = body["endTime"].toLocaleTimeString();

        let callDuration = callEndTime - callStartTime;
        data["call_start_time"] = callStartTime;
        data["call_start_time_str"] = callStartTimeStr;
        data["call_end_time"] = callEndTime;
        data["call_end_time_str"] = callEndTimeStr;
        data["call_duration"] = callDuration;
        data["call_duration_str"] = callDuration;
        data["system_updated"] = true;
        data["ucid"] = body["ucid"];

        put_data(
          `${API_URL}/crux/update/ticket/v1/`,
          { ticket_id: myStateRef.current.ticket_id, data: data },
          value
        ).then(function (data) {
          setRef(myStateRef.current.ticket_id, "updated_ticket_id");
          tryNote();
        });
      }
    });
  }, []);

  function handleSelectChange(selected) {
    put_data(
      `${API_URL}/crux/users/break/v1/`,
      {
        break_id: selected.value,
      },
      value,
      true
    ).then(function (data) {
      if (data) {
        setUsersBreak(!usersBreak);
      }
    });
  }

  function validateAgent() {
    // return true;
    let arr = ["7", "12", "13", "80", "283", "330"];
    return !arr.includes(get_agent_id());
  }

  return (
    <div className="row" onClick={checkClick}>
      <AppContext.Provider value={value}>
        <AppRoutes />
        <div
          className="dialler"
          style={{ display: dialler ? "block" : "none" }}
        >
          {validateAgent() ? (
            <iframe
              // allow="camera *;microphone *"
              allowusermedia="true"
              allow="autoplay; camera; microphone"
              // allow="feature_name allow_list;feature_name allow_list"
              // allow="camera;microphone"
              src="https://in-ccaas.ozonetel.com/toolbar_widget/index.html#login&customer=crofarm&width=600#dashboard-agent"
              className="iframe"
            />
          ) : (
            <iframe
              src="https://agent1.cloudagent.in/toolbar_widget/index.html?apiKey=KK9db4ba6342398512f35ec87f1aad502a#dashboard-agent"
              className="iframe"
            />
          )}
        </div>
        <div
          className="dialler"
          style={{
            display: usersBreak ? "block" : "none",
          }}
        >
          <div className="select_iframe">
            <h2 style={{ color: "#12344d" }}>Current Status</h2>
            <Select
              options={options}
              value={options.map(function (item) {
                if (item.value == agentBreak.break_id) {
                  return item;
                }
              })}
              onChange={handleSelectChange}
            />
          </div>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
export { AppContext };
