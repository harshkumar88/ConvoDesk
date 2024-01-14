import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, post_data, put_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import styles from "./css/style.module.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Navbar from "./components/Navbar";
import Select from "react-select";
import { customStyles } from "../../../utils/DatePicker/components/CustomStyles";
function NewCannedResponse() {
  let [loader, setLoader] = useState(false);
  let [cannedResponse, setCannedResponse] = useState({});
  // let [cluster, setCluster] = useState(-1);
  // let [allClusters, setAllClusters] = useState([]);
  let options = [
    {
      label: "Chat Connect",
      value: 2,
    },
    {
      label: "Crux",
      value: 1,
    },
  ];
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(function () {
    appContext.setPage("new canned response");
    appContext.setTitle("New canned response");
    // get_cluster_details();
  }, []);
  // function get_cluster_details() {
  //   get_data(
  //     `${API_URL}/crux/cluster/v1/`,
  //     appContext,
  //     false
  //   ).then(function (data) {
  //     if (data) {
  //       setAllClusters(data.data);
  //       setCluster(data.data[0]["id"]);
  //       setLoader(false);
  //     }
  //   });
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (cannedResponse.description === "") {
      appContext.setAlert(
        "Please provide valid canned response",
        "alert_error"
      );
      return;
    }

    post_data(
      `${API_URL}/crux/canned/response/v1/`,
      cannedResponse,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate(`/canned/response`);
      }
    });
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="item-row-container">
      {/* <Navbar
        allClusters={allClusters}
        cluster={cluster}
        setCluster={setCluster}
      /> */}
      <form onSubmit={handleSubmit}>
        <div className={styles.canned_container}>
          <div className={styles.canned_div}>
            <h4 className={styles.canned_header}>Title</h4>
            <input
              type="text"
              value={cannedResponse.title}
              className={styles.input}
              required
              onChange={function (e) {
                setCannedResponse({ ...cannedResponse, title: e.target.value });
              }}
            />
          </div>

          <div className={styles.canned_div}>
            <h4 className={styles.canned_header}>Create Shortcut</h4>
            <input
              type="text"
              value={cannedResponse.shortcut}
              onChange={(event) => {
                setCannedResponse({
                  ...cannedResponse,
                  shortcut: event.target.value,
                });
              }}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.canned_div}>
            <h4 className={styles.canned_header_ecosystem}>Ecosystem</h4>
            <select
              onChange={function (e) {
                setCannedResponse({
                  ...cannedResponse,
                  ecosystem: e.target.value,
                });
              }}
              value={cannedResponse.ecosystem}
              className={styles.input}
              required
            >
              <option value="" unselectable>
                Select an option
              </option>
              {options.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {/* <Select
              options={options}
              className={styles.ecosystem_input}
              styles={customStyles}
              onChange={function (e) {
                setCannedResponse({ ...cannedResponse, ecosystem: e.value });
              }}
              required
            /> */}
          </div>
        </div>
        <div className={styles.article_edit}>
          <h4>Create Canned Response:</h4>
          <textarea
            value={cannedResponse.description}
            onChange={(event) => {
              setCannedResponse({
                ...cannedResponse,
                description: event.target.value,
              });
            }}
            rows={17}
            className={styles.textarea}
            required
          />

          <div className="btn-container">
            <button className={`btn ${styles.btn}`}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewCannedResponse;
