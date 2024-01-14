import React, { createContext, useEffect, useState } from "react";
import "./style.css";
import "./App.css";
import { useRef } from "react";
import { isAgentLoggedIn } from "./React-lib/src/auth";
import AppRoutes from "./Routes/AppRoutes";
import Select from "react-select";
import { get_data, patch_data, put_data } from "./React-lib/src/networkhandler";
import { API_URL } from "./config";
import { get_agent_id } from "./React-lib/src/auth";

const AppContext = createContext();
function App() {
  let [header, setHeader] = useState("header");
  let [alert_class, setClass] = useState("alert");
  let [response, setResponse] = useState("");
  let [load, setLoad] = useState(false);
  let [reload, setReload] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [drawer, setDrawer] = useState(true);
  const [cannedResponses, setCannedResponses] = useState([]);
  const [page, setPage] = useState("home");
  let [title, setTitle] = useState("All Tickets");
  let [filters, setFilters] = useState([]);
  let [search, setSearch] = useState(false);
  let [agentDict, setAgentDict] = useState({});
  let [showLetter, setShowLetter] = useState(true);
  const options = [
    { value: 15, label: "✅ Available", is_active: 1 },
    { value: 1, label: "☕ Snacks 1", is_active: 0 },
    { value: 14, label: "🍩 Snacks 2", is_active: 0 },
    { value: 17, label: "⏸️ Closing Chat", is_active: 0 },
    { value: 3, label: "🍱 Lunch", is_active: 0 },
    { value: 4, label: "💧 Bio Break", is_active: 0 },
    { value: 7, label: "👏 PKT", is_active: 0 },
    { value: 8, label: "🎓 1 - 1 Session", is_active: 0 },
    { value: 5, label: "🤞 Quality Feedback", is_active: 0 },
    { value: 16, label: "🔴 Offline", is_active: 0 },
    { value: 13, label: "🙌 Quality Refresher", is_active: 0 },
    { value: 2, label: "🏋 Training", is_active: 0 },
    { value: 6, label: "🤝 Team Meeting", is_active: 0 },
    { value: 9, label: "😃 Fun Activity", is_active: 0 },
    { value: 10, label: "👺 HR / ADMIN", is_active: 0 },
    { value: 11, label: "🕰 OT BREAK", is_active: 0 },
    { value: 12, label: "😀 Risk Session", is_active: 0 },
  ];

  let [usersBreak, setUsersBreak] = useState(false);
  let [agentBreak, setAgentBreak] = useState({});
  let searchRef = useRef(null);
  useEffect(
    function () {
      if (isAgentLoggedIn()) {
        get_break_details();
      }
    },
    [reload]
  );
  useEffect(() => {
    sessionStorage.removeItem("conversations");
  }, []);

  function setAlert(res, className) {
    setClass(className);
    setResponse(res);
    setTimeout(function () {
      setClass("alert");
    }, 1000);
  }
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
  function toggleSideBar() {
    setSidebar(!sidebar);
  }
  function toggleUsersBreak() {
    setUsersBreak(!usersBreak);
  }
  function get_break_details() {
    get_data(`${API_URL}/crux/users/break/v1/`, value).then(function (data) {
      setAgentBreak(data.data);
    });
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
    cannedResponses,
    setCannedResponses,
    filters,
    setFilters,
    search,
    setSearch,
    searchRef,
    agentDict,
    setAgentDict,
    showLetter,
    setShowLetter,
    toggleUsersBreak,
  };

  async function handleSelectChange(selected) {
    const putDataResponse = await put_data(
      `${API_URL}/crux/users/break/v1/`,
      {
        break_id: selected.value,
      },
      value,
      true
    );
    if (putDataResponse) {
      setUsersBreak(!usersBreak);
      await triggerSmartAssign(selected);
    }
  }

  async function triggerSmartAssign(selected) {
    await patch_data(
      `${API_URL}/neon/chat/smart/assign/v1/`,
      {
        is_active: selected?.is_active,
        agent_id: parseInt(get_agent_id()),
      },
      value,
      true
    );
  }

  return (
    <div className="row" onClick={checkClick}>
      <AppContext.Provider value={value}>
        <AppRoutes />
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
