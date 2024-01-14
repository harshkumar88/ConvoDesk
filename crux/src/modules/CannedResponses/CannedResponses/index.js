import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, post_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import Navbar from "./components/Navbar";
import styles from "./css/style.module.css";
import CannedResponse from "./components/CannedResponse";

function CannedResponses() {
  let [loader, setLoader] = useState(false);

  let [cannedResponses, setCannedResponses] = useState([]);
  let [query, setQuery] = useState("");
  const appContext = useContext(AppContext);

  useEffect(
    function () {
      appContext.setTitle("Canned Responses");
      appContext.setPage("canned responses");
      get_canned_responses();
    },

    [appContext.reload]
  );

  function get_canned_responses() {
    get_data(`${API_URL}/crux/canned/response/v1/`, appContext, false).then(
      function (data) {
        if (data) {
          setCannedResponses(data.data);
          setLoader(false);
        }
      }
    );
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <div className="item-row-container">
        {cannedResponses.map(function (item, index) {
          if (query) {
            return item?.title?.toLowerCase().includes(query.toLowerCase()) ||
              item?.shortcut?.toLowerCase().includes(query.toLowerCase()) ? (
              <CannedResponse data={item} />
            ) : (
              <></>
            );
          } else {
            return <CannedResponse data={item} />;
          }
        })}
      </div>
    </>
  );
}

export default CannedResponses;
