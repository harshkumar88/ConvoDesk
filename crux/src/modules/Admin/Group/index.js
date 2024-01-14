import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, post_data } from "../../../React-lib/src/networkhandler";
import { API_URL } from "../../../config";
import GroupDetails from "./components/Group";
import Navbar from "./components/Navbar";
import styles from "./css/style.module.css";

function Group() {
  let [loader, setLoader] = useState(true);
  let [groups, setGroups] = useState([]);
  let [query, setQuery] = useState("");

  const appContext = useContext(AppContext);

  useEffect(
    function () {
      appContext.setTitle("Groups");
      appContext.setPage("group");
      get_subject_details();
    },

    [appContext.reload]
  );
  function get_subject_details() {
    get_data(`${API_URL}/crux/group/v1/`, {}, appContext, false).then(function (
      data
    ) {
      if (data) {
        setGroups(data.data);
        setLoader(false);
      }
    });
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <div className={styles.groups}>
        {groups.map(function (item, index) {
          if (query) {
            return item?.name?.toLowerCase().includes(query.toLowerCase()) ? (
              <GroupDetails data={item} />
            ) : (
              <></>
            );
          } else {
            return <GroupDetails data={item} />;
          }
        })}
      </div>
    </>
  );
}

export default Group;
