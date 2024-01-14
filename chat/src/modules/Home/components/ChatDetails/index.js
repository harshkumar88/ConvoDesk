import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../css/style.module.css";
import Chat from "../Chat";
import Ticket from "../Ticket";
import { AppContext } from "../../../../App";
import UserDetails from "../UserDetail.js";
import { ChatContext } from "../..";
import { get_data } from "../../../../React-lib/src/networkhandler.js";
import { API_URL } from "../../../../config";
function ChatDetails() {
  const appContext = useContext(AppContext);
  const chatContext = useContext(ChatContext);
  let { conversationDetails, setConversationDetails, active } = chatContext;
  const { conversation_id } = useParams();
  let [chatTrigger, setChatTrigger] = useState(0);
  let [exceptionalRefundData, setExceptionalRefundData] = useState("");
  let [supervisorData, setSupervisorData] = useState([]);

  useEffect(
    function () {
      getConversationDetails();
      chatContext.setActive("details");
    },
    [conversation_id, chatTrigger]
  );

  useEffect(
    function () {
      get_supervisor_data();
    },
    [appContext.reload]
  );

  function getConversationDetails() {
    get_data(
      `${API_URL}/hook/conversation/details/v1/?conversation_id=${conversation_id}`,
      appContext
    ).then(function (data) {
      if (data) {
        setConversationDetails(data.data);
      }
    });
  }

  function get_supervisor_data() {
    get_data(`${API_URL}/neon/conversation/supervisors/v1/`, appContext).then(
      function (data) {
        if (data) {
          setSupervisorData(data?.data);
        }
      }
    );
  }
  useEffect(
    function () {
      if (conversationDetails && conversationDetails.phone != undefined) {
        get_data(
          `${API_URL}/crux/users/data/v1/?phone=${conversationDetails.phone}`,
          appContext
        ).then(function (data) {
          if (data) {
            setExceptionalRefundData(data.data);
          }
        });
      }
    },
    [conversationDetails]
  );

  return (
    <>
      <div className={styles.chat}>
        <div className={styles.hat}>
          <Chat
            chatContext={chatContext}
            setChatTrigger={setChatTrigger}
            exceptionalRefundData={exceptionalRefundData}
          />
        </div>
      </div>

      <div className={styles.user_details}>
        {active == "details" ? (
          <UserDetails
            context={appContext}
            conversationDetails={conversationDetails}
          />
        ) : (
          <Ticket
            context={appContext}
            chatContext={chatContext}
            exceptionalRefundData={exceptionalRefundData}
            supervisorData={supervisorData}
          />
        )}
      </div>
    </>
  );
}

export default ChatDetails;
