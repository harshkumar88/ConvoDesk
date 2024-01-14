import React, { useContext, useState, useEffect } from "react";
import styles from "./css/styles.module.css";
import { AppContext } from "../../App";
import WeeklyDetails from "./WeeklyDetails";
import TicketDetails from "../SupervisorDashboard/TicketDetails /index";
import DatePicker from "../../utils/DatePicker";
import { get_agent_name, get_agent_email } from "../../React-lib/src/auth";
import { get_data } from "../../React-lib/src/networkhandler";
import { API_URL } from "../../config";
import { convertSlot, formatDate } from "../../utils/utility";

function SupervisorDashboard() {
  let appContext = useContext(AppContext);
  let [loader, setLoader] = useState(true);
  let [selectedDate, setSelectedDate] = useState({
    from_slot: formatDate(
      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    ),
    to_slot: formatDate(new Date()),
  });
  let [chartData, setChartData] = useState({});
  let [selectedSupervisor, setSelectedSupervisor] = useState("");
  let [supervisorData, setSupervisorData] = useState([]);
  let [ticketDetails, setTicketDetails] = useState([]);

  useEffect(
    function () {
      setLoader(true);
      appContext.setTitle("Supervisor Dashboard");
      if (selectedSupervisor != "") {
        getSuperviorsChatData();
      }
    },
    [appContext.reload, selectedDate, selectedSupervisor]
  );

  useEffect(() => {
    getSupervisorData();
  }, [appContext.reload]);

  function getSupervisorData() {
    get_data(`${API_URL}/neon/conversation/supervisors/v1/`, appContext).then(
      function (data) {
        if (data) {
          setSupervisorData(data?.data);
          setSelectedSupervisor(data?.data[0].id);
        }
      }
    );
  }

  function getSuperviorsChatData() {
    get_data(
      `${API_URL}/crux/supervisor/metrics/v1/?from_slot=${selectedDate.from_slot}&to_slot=${selectedDate.to_slot}&supervisor_id=${selectedSupervisor}`,
      appContext
    ).then(function (data) {
      if (data) {
        setChartData(data?.data?.metrics_details);
        setTicketDetails(data?.data?.agent_metrics);
        setLoader(false);
      }
    });
  }

  function handleDate(from_slot, to_slot) {
    setSelectedDate({ from_slot: from_slot, to_slot: to_slot });
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <div className={styles.round}>{get_agent_name()?.charAt(0)}</div>
          <div className={styles.agent_details}>
            <span className={styles.name}>{get_agent_name()}</span>
            <span>{get_agent_email()}</span>
          </div>
        </div>

        <div className={styles.date_picker_container}>
          <DatePicker callBackfn={handleDate} />
        </div>
      </div>
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <TicketDetails
            selectedDate={selectedDate}
            selectedSupervisor={selectedSupervisor}
            setSelectedSupervisor={setSelectedSupervisor}
            supervisorData={supervisorData}
            ticketDetails={ticketDetails}
          />
          <WeeklyDetails chartData={chartData} />
          {/* <DailyDetails
            overallData={overallData}
            chatData={chatData}
            callData={callData}
          /> */}
        </>
      )}
    </div>
  );
}

export default SupervisorDashboard;
