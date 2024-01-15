import React from "react";
import { AppContext } from "../../../App";
import { useState, useContext, useEffect } from "react";
import { get_data, put_data } from "../../../ReactLib/networkhandler";
import { API_URL } from "../../../config";
import styles from "./css/style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

function EditArticle() {
  let [loader, setLoader] = useState(false);
  let [article, setArticle] = useState([]);
  const appContext = useContext(AppContext);
  const { article_id } = useParams();
  const navigate = useNavigate();

  useEffect(
    function () {
      const isValidInteger = /^\d+$/.test(article_id);
      if (!isValidInteger) {
        navigate("/home");
        return;
      }
      appContext.setPage("edit article");
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
  function handleSubmit(e) {
    let payload = { article_id: article_id, data: article };
    put_data(`${API_URL}/crux/article/v1/`, payload, appContext, true).then(
      function (data) {
        if (data) {
          navigate(`/article/details/${article_id}`);
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

export default EditArticle;
