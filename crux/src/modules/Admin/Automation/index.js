import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import Subject from "./components/Subject";
import Navbar from "./components/Navbar";

function Automation() {
  let [loader, setLoader] = useState(true);

  let [subjects, setSubjects] = useState([]);

  const appContext = useContext(AppContext);

  useEffect(
    function () {
      appContext.setTitle("Automation");
      appContext.setPage("automation");
      get_subject_details();
    },

    [appContext.reload]
  );
  function get_subject_details() {
    get_data(`${API_URL}/crux/subject/v1/`, {}, appContext, false).then(
      function (data) {
        if (data) {
          setSubjects(data.data);
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
      <Navbar />
      {subjects.map(function (item, idx) {
        return <Subject data={item} />;
      })}
    </>
  );
}

export default Automation;
