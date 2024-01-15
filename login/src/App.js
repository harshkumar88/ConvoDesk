import React, { createContext, useState } from "react";
import "./App.css";
import Login from "./module/login";
const AppContext = createContext();
function App() {
  let [alert_class, setClass] = useState("alert");
  let [response, setResponse] = useState("");
  let [load, setLoad] = useState(false);
  let [reload, setReload] = useState(false);
  function setAlert(res, className) {
    setClass(className);
    setResponse(res);
    setTimeout(function () {
      setClass("alert");
    }, 1000);
  }

  let value = {
    alert_class,
    setClass,
    response,
    setReload,
    reload,
    setResponse,
    setAlert,
    load,
    setLoad,
  };

  return (
    <AppContext.Provider value={value}>
      <Login />
    </AppContext.Provider>
  );
}

export default App;

export { AppContext };
