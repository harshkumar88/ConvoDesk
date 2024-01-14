import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, post_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import Navbar from "./components/Navbar";
import styles from "./css/style.module.css";
import Article from "./components/Article";
function Articles() {
  let [loader, setLoader] = useState(false);
  let [groups, setGroups] = useState([]);
  let [clusters, setClusters] = useState([]);
  let [cluster, setCluster] = useState(-1);
  let [articles, setArticles] = useState([]);

  const appContext = useContext(AppContext);

  useEffect(
    function () {
      appContext.setTitle("Articles");
      appContext.setPage("articles");
      get_cluster_details();
    },

    [appContext.reload]
  );
  useEffect(
    function () {
      get_article_details();
    },
    [appContext.reload, cluster]
  );
  function get_cluster_details() {
    get_data(`${API_URL}/crux/cluster/v1/`, appContext, false).then(function (
      data
    ) {
      if (data) {
        setClusters(data.data);
        setCluster(data.data[0]["id"]);
        setLoader(false);
      }
    });
  }
  function get_article_details() {
    if (cluster == -1) {
      return;
    }
    get_data(
      `${API_URL}/crux/article/v1/?cluster_id=${cluster}`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setArticles(data.data);
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
      {/* {console.log(articles)} */}
      <Navbar
        allClusters={clusters}
        cluster={cluster}
        setCluster={setCluster}
      />
      <div className="item-row-container">
        {articles.map(function (item, idx) {
          return <Article data={item} />;
        })}
      </div>
      {/* <div className={styles.groups}>
        {groups.map(function (item, idx) {
          return <Subject data={item} groups={groups} />;
        })}
      </div> */}
    </>
  );
}

export default Articles;
