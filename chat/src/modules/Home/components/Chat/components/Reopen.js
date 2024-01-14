import React, { useContext } from "react";
import { post_data } from "../../../../../React-lib/src/networkhandler";
import { API_URL } from "../../../../../config";
import styles from "../style.module.css";
import { AppContext } from "../../../../../App";
import { useNavigate } from "react-router-dom";

function Reopen({ chatContext }) {
  const { conversationDetails, toggleTrigger } = chatContext;
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  function handleReopen() {
    post_data(
      `${API_URL}/neon/conversation/reopen/v1/`,
      {
        conversation_id: conversationDetails.id,
      },
      appContext,
      true
    ).then(function (data) {
      navigate(`/conversation/details/${data.conversation_id}`);
      toggleTrigger();
    });
  }
  return (
    <button
      onClick={function () {
        handleReopen();
      }}
      className={styles.resolve_btn}
    >
      Reopen
    </button>
  );
}

export default Reopen;
