import React, { createContext, useEffect, useState, useRef } from "react";
import "./style.css";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { get_data, post_data } from "./React-lib/src/networkhandler";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import { get_agent_groups, get_agent_id } from "./React-lib/src/auth";
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
  const [page, setPage] = useState("home");
  let [title, setTitle] = useState("All Tickets");
  let [issueDict, setIssueDict] = useState({});
  let [filters, setFilters] = useState([]);
  let [note, setNote] = useState(0);
  let [selectedFilter, setSelectedFilter] = useState({
    agent_id: [parseInt(get_agent_id())],
    group_id: get_agent_groups(),
    // n_slot_id: new Date()
    //   .toLocaleDateString()
    //   .split("/")
    //   .reverse()
    //   .join("")
    //   .substr(2),
    // status: ["P"],
  });

  let [search, setSearch] = useState(false);
  let [callType, setCallType] = useState({
    "Manual Dialing": 1,
    "Progressive Dialing": 2,
    IncomingCall: 3,
  });
  let searchRef = useRef(null);

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
  useEffect(function () {
    console.log("hiii", API_URL);
  }, []);
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
    window.addEventListener("message", (event) => {
      let payload = event.data;
      console.log("data-recieved", payload);
      if (payload.action === "busyAgent" || payload.action == "dropCall") {
        console.log("Harshitxs", payload);
      }
      if (payload.action === "busyAgent") {
        // console.clear();
        let body = payload.token;

        let data = {};
        data["name"] = body["cust_info"]["Name"];
        data["campaign_name"] = body["campaign_name"];
        data["job_title"] = body["cust_info"]["Field1"]; //to be modified
        // data["source"] = body["cust_info"]["Field2"]; //to be modified
        data["order_count"] = body["cust_info"]["Field3"];
        data["balance"] = body["cust_info"]["Field4"];
        data["delivery_partner_id"] = body["cust_info"]["Field5"];
        data["coupon_code"] = body["cust_info"]["Field6"];
        let address = {};
        address["address"] = body["cust_info"]["Field7"];
        address["city"] = body["cust_info"]["Field8"];
        data["last_order_slot"] = body["cust_info"]["Field9"];
        data["tags"] = body["cust_info"]["Field10"];
        data["address"] = address;
        data["phone"] = body["callerId"].slice(-10);

        data["campaign_name"] = body["campaignName"];
        data["ucid"] = body["ucid"];

        data["order_id"] = body["cust_info"]["Filed2"];
        data["call_type"] = body["callType"];
        data["email"] = body["agentId"];
        let temp = 0;

        if (data["call_type"] != "Manual Dialing") {
          post_data(`${API_URL}/crux/sales/lead/v1/`, data, value, true).then(
            function (data) {
              if (data) {
                setRef(data.lead_id, "ticket_id");
                temp = data.lead_id;
                get_data(
                  `${API_URL}/cons/freshbot/update/retention/lead/v1/?phone_no=${body[
                    "callerId"
                  ].slice(
                    -10
                  )}&coupon_required=${true}&retention_lead_id=${temp}`,
                  value,
                  true
                ).then(function (data) {
                  if (data) {
                    navigate(`/lead/details/${temp}`);
                  }
                });
                // navigate(`/lead/details/${data.lead_id}`);
              }
            }
          );
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

        post_data(
          `${API_URL}/crux/sales/notes/v1/`,
          {
            lead_id: myStateRef.current.ticket_id,
            description: `<p>Monitor UCID: ${body["ucid"]}</p><a>${body["audioFile"]}</a>`,
            system_created: true,
          },
          value
        ).then(function (data) {
          setRef(myStateRef.current.ticket_id, "updated_ticket_id");
          tryNote();
        });
      }
    });
  }, []);

  function validateAgent() {
    return true;
    let arr = ["120", "130"];
    return arr.includes(get_agent_id());
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
              allowusermedia
              allow="autoplay; camera; microphone"
              // allow="feature_name allow_list;feature_name allow_list"
              // allow="camera;microphone"
              src="https://in-ccaas.ozonetel.com/toolbar_widget/index.html?action=formLogin&customer=crofarm_bd&width=600#dashboard-agent"
              className="iframe"
            />
          ) : (
            <iframe
              src="https://agent1.cloudagent.in/toolbar_widget/index.html?apiKey=KK9db4ba6342398512f35ec87f1aad502a#dashboard-agent"
              className="iframe"
            />
          )}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
export { AppContext };
