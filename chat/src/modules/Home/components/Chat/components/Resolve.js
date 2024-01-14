import React, { useContext } from "react";
import { post_data } from "../../../../../networkHandler";
import { API_URL } from "../../../../../config";
import styles from "../style.module.css";
import { AppContext } from "../../../../../App";
import { useNavigate } from "react-router-dom";

function Resolve({ chatContext }) {
  const { conversationDetails, toggleTrigger } = chatContext;

  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  function handleConversationData() {
    let inputData = sessionStorage.getItem("conversations");
    if (inputData) {
      inputData = JSON.parse(inputData);
      const {
        [`chat_${conversationDetails.id}`]: specificChatData,
        ...restData
      } = inputData;
      sessionStorage.setItem("conversations", JSON.stringify(restData));
    }
  }
  function handleResolve() {
    post_data(
      `${API_URL}/neon/conversation/resolve/v1/`,
      {
        conversation_id: conversationDetails.id,
        phone: conversationDetails.phone,
      },
      appContext,
      true
    ).then(function (data) {
      handleConversationData();
      toggleTrigger();
      navigate(`/conversation/details`);
    });
  }
  return (
    <button
      onClick={function () {
        handleResolve();
      }}
      className={styles.resolve_btn}
    >
      Resolve
    </button>
  );
}

export default Resolve;
