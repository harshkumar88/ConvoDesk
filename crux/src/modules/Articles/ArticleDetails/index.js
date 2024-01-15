import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, post_data } from "../../../ReactLib/networkhandler";
import { API_URL } from "../../../config";
import styles from "./css/style.module.css";
import { useNavigate, useParams } from "react-router-dom";

function ArticleDetails() {
  let [loader, setLoader] = useState(false);
  let [article, setArticle] = useState([]);
  const appContext = useContext(AppContext);
  const { article_id } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      appContext.setPage("articles");
      const isValidInteger = /^\d+$/.test(article_id);
      if (!isValidInteger) {
        navigate("/home");
        return;
      }
      get_article_details();
    },

    [appContext.reload, article_id, navigate]
  );

  function get_article_details() {
    get_data(
      `${API_URL}/crux/article/v1/?article_id=${article_id}`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        appContext.setTitle(data.data.title);
        setArticle(data.data);
        setLoader(false);
      }
    });
  }

  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: article.description }}
    />
  );
}

export default ArticleDetails;
