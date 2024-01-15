import React from "react";
import { AppContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, post_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import styles from "./css/style.module.css";
import { useParams } from "react-router-dom";
import Note from "./components/Note";
import Navbar from "./components/Navbar";
import UpdateFilter from "./components/UpdateFilter";
import Activity from "./components/Note/Activity";
import Stage from "./components/Stage";
import UserInfo from "./components/UserInfo";
import AccountInfo from "./components/AccountInfo";
import WalletInfo from "./components/WalletInfo";
import Drawer from "./components/Drawer";
import SKU from "./components/TopSku";

function LeadDetails() {
  let [loader, setLoader] = useState(true);
  let [data, setData] = useState({});
  let [address, setAddress] = useState({});
  let [retentionData, setRetentionData] = useState({});
  let [notes, setNotes] = useState([]);
  let [activity, setActivity] = useState([]);
  // let [showActivity, setShowActivity] = useState(false);
  let [show, setShow] = useState("field");
  let [filters, setFilters] = useState([]);
  let [jobTitle, setJobTitle] = useState("");
  const appContext = useContext(AppContext);
  const { lead_id } = useParams();

  const context = { lead_id, filters, data };

  useEffect(
    function () {
      appContext.setTitle(`Lead Details | ${lead_id}`);
      get_user_details();
      get_user_activity();
      get_user_filters();
    },
    [appContext.reload, lead_id]
  );
  useEffect(
    function () {
      get_notes_details();
    },
    [appContext.reload, lead_id, appContext.note]
  );
  function get_user_details() {
    get_data(
      `${API_URL}/crux/sales/lead/v1/?lead_id=${lead_id}`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        let temp = {
          ...data?.data,
          ...data?.data?.user_details,
        };
        setAddress(data?.data?.address);
        setRetentionData(data?.data);
        appContext.setTitle(`${temp?.name} |   ${temp?.n_slot_id}`);

        delete temp["user_details"];
        setData(temp);
      }
    });
  }
  function get_user_filters() {
    get_data(`${API_URL}/crux/sales/filter/v1/`, appContext).then(function (
      data
    ) {
      if (data) {
        setFilters(data.data);
        setLoader(false);
      }
    });
  }
  function get_user_activity() {
    get_data(
      `${API_URL}/crux/sales/lead/activity/v1/?lead_id=${lead_id}`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setActivity(data.data);
      }
    });
  }
  function get_notes_details() {
    get_data(
      `${API_URL}/crux/sales/notes/v1/?lead_id=${lead_id}`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setNotes(data.data);
      }
    });
  }
  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <UserInfo data={data} jobTitle={jobTitle} />
        <AccountInfo data={address} />
        <WalletInfo data={data} retentionData={retentionData} />
      </div>

      <Stage
        options={
          filters.filter(function (item, idx) {
            return item.key == "status";
          })[0]?.choices
        }
        value={data.status}
      />
      {/* <Navbar
        lead_id={lead}
        showActivity={showActivity}
        setShowActivity={setShowActivity}
        show={show}
        setShow={setShow}
      /> */}

      <div className={styles.lead_container}>
        <div className={styles.lead}>
          <Drawer
            show={show}
            setShow={setShow}
            lead_id={lead_id}
            context={context}
          />
        </div>
        <div className={styles.filter}>
          {show == "note" ? (
            notes.length > 0 ? (
              notes.map(function (item, idx) {
                return <Note data={item} />;
              })
            ) : (
              <h1 className="text-center">No note found !!</h1>
            )
          ) : show == "field" ? (
            <UpdateFilter
              setJobTitle={setJobTitle}
              user_data={data}
              lead_id={lead_id}
              filters={filters}
            />
          ) : show == "sku" ? (
            <SKU phone={data.phone} appContext={appContext} />
          ) : activity.length > 0 ? (
            activity.map(function (item, idx) {
              return <Activity data={item} />;
            })
          ) : (
            <h1 className="text-center">No activity found !!</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
