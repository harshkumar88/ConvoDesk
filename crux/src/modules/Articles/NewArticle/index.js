import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import {
  get_data,
  post_data,
  put_data,
} from "../../../ReactLib/networkhandler";
import { API_URL } from "../../../config";
import styles from "./css/style.module.css";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import Navbar from "./components/Navbar";
function NewArticle() {
  let [loader, setLoader] = useState(false);
  let [article, setArticle] = useState([]);
  let [cluster, setCluster] = useState(-1);
  let [allClusters, setAllClusters] = useState([]);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(function () {
    appContext.setPage("new article");
    appContext.setTitle("New article");
    get_cluster_details();
  }, []);
  function get_cluster_details() {
    get_data(`${API_URL}/crux/cluster/v1/`, appContext, false).then(function (
      data
    ) {
      if (data) {
        setAllClusters(data.data);
        setCluster(data.data[0]["id"]);
        setLoader(false);
      }
    });
  }

  function handleSubmit(e) {
    let payload = { ...article, cluster_id: cluster };
    post_data(`${API_URL}/crux/article/v1/`, payload, appContext, true).then(
      function (data) {
        if (data) {
          navigate(`/articles`);
        }
      }
    );
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="item-row-container">
      <Navbar
        allClusters={allClusters}
        cluster={cluster}
        setCluster={setCluster}
      />
      <div className={`${styles.input_container} ${styles.text_container}`}>
        <input
          type="text"
          placeholder="Enter Article Name"
          value={article.title}
          className={styles.input}
          required
          onChange={function (e) {
            setArticle({ ...article, title: e.target.value });
          }}
        />
      </div>
      <div className={styles.article_edit}>
        <JoditEditor
          value={article.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setArticle({ ...article, description: newContent });
          }}
        />
        <div className="btn-container">
          <button className={`btn ${styles.btn}`} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewArticle;
