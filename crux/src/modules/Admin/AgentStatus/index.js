import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { API_URL } from "../../../config";
import { get_data } from "../../../ReactLib/networkhandler";
import Agent from "./components/Agent";
import Navbar from "./components/Navbar";

function AgentStatus(props) {
  const appContext = useContext(AppContext);
  let [data, setData] = useState({});
  let [loader, setLoader] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

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
    { value: 17, label: "⏸️ Closing Chat" },
  ];
  useEffect(
    function () {
      appContext.setTitle("Agent Status");
      get_data(
        `${API_URL}/crux/users/break/v1/?all_agents=true`,
        appContext
      ).then(function (data) {
        setData(data.data);
        setFilteredData(data.data);
        setLoader(false);
      });
    },
    [appContext.reload]
  );
  function handleSelectChange(selected) {
    setSelectedOption(selected);
    const filtered = data.filter((item) => item.break_id === selected.value);
    setFilteredData(filtered);
  }

  return loader ? (
    <></>
  ) : (
    <>
      <Navbar
        selectedOption={selectedOption}
        handleSelectChange={handleSelectChange}
        data={filteredData.map(function (item, idx) {
          return item;
        })}
        options={options}
      />
      <div className="item-row-container">
        {filteredData.map(function (item, idx) {
          return (
            <Agent
              data={item}
              key={idx}
              options={options}
              appContext={appContext}
            />
          );
        })}
      </div>
    </>
  );
}

export default AgentStatus;
