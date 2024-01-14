import React, { createContext, useEffect, useState } from "react";
import "./style.css";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
const AppContext = createContext();
function App() {
  let [header, setHeader] = useState("header");
  let [alert_class, setClass] = useState("alert");
  let [response, setResponse] = useState("");
  let [load, setLoad] = useState(false);
  let [reload, setReload] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [drawer, setDrawer] = useState(true);
  let [selected, setSelected] = useState(true);
  const [page, setPage] = useState("home");
  let [title, setTitle] = useState("All Tickets");

  let [webhooks, setWebhooks] = useState([]);
  let [flows, setFlows] = useState([]);
  let [properties, setProperties] = useState([]);

  let [search, setSearch] = useState(false);

  let [dialogues, setDialogues] = useState([]);
  let [groups, setGroups] = useState([]);

  function setAlert(res, className) {
    setClass(className);
    setResponse(res);
    setTimeout(function () {
      setClass("alert");
    }, 1000);
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
    selected,
    setSelected,
    search,
    setSearch,
    webhooks,
    setWebhooks,
    properties,
    setProperties,
    flows,
    setFlows,
    dialogues,
    setDialogues,
    groups,
    setGroups,
  };

  return (
    <div className="row">
      <AppContext.Provider value={value}>
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
export { AppContext };
