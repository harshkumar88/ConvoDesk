import React from "react";
import { AppContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import { get_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import styles from "./css/style.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Note from "./components/Note";
import Navbar from "./components/Navbar";
import UpdateFilter from "./components/UpdateFilter";
import UpdateDescription from "./components/UpdateDescription";
import Activity from "./components/Note/Activity";
import UserActivity from "./components/UserActivity";
import Conversation from "./components/Conversation";

function TicketDetails() {
  let [loader, setLoader] = useState(true);
  let [data, setData] = useState({});
  let [notes, setNotes] = useState([]);
  let [activity, setActivity] = useState([]);
  let [showActivity, setShowActivity] = useState(false);
  let [user, setUser] = useState(0);
  let [conversationId, setConversationId] = useState(0);
  let [msg, setMsg] = useState([]);
  let [cannedResponses, setCannedResponses] = useState([]);
  let [showConversation, setShowConversation] = useState(false);
  let [supervisorData, setSupervisorData] = useState([]);

  const appContext = useContext(AppContext);
  const { ticket_id } = useParams();
  let navigate = useNavigate();

  useEffect(
    function () {
      const isValidInteger = /^\d+$/.test(ticket_id);
      if (!isValidInteger) {
        navigate("/home");
        return;
      }
      appContext.setTitle(`Ticket Details | ${ticket_id}`);
      setShowActivity(false);
      get_ticket_details();
      get_ticket_activity();
      get_canned_responses();
      get_supervisor_data();
    },
    [appContext.reload, ticket_id, navigate]
  );

  useEffect(
    function () {
      const isValidInteger = /^\d+$/.test(ticket_id);
      // console.log("ticket_id", ticket_id, isValidInteger);
      if (!isValidInteger) {
        navigate("/home");
        return;
      }
      get_notes_details();
    },
    [appContext.reload, ticket_id, appContext.note, navigate]
  );
  function get_ticket_details() {
    get_data(
      `${API_URL}/crux/ticket/details/v1/?ticket_id=${ticket_id}`,
      appContext
    ).then(function (data) {
      if (data) {
        setUser(data.data.user_id);
        setData(data.data);
        let conversationId = data?.data?.conversation_id;
        if (conversationId !== 0) {
          setShowConversation(true);
          get_conversation(data.data.phone, conversationId);
        } else {
          setShowConversation(false);
          setConversationId(0);
        }
        setLoader(false);
      }
    });
  }
  function get_ticket_activity() {
    get_data(
      `${API_URL}/crux/ticket/activity/v1/?ticket_id=${ticket_id}`,
      appContext
    ).then(function (data) {
      if (data) {
        setActivity(data.data);
      }
    });
  }
  function get_notes_details() {
    get_data(
      `${API_URL}/crux/ticket/notes/v1/?ticket_id=${ticket_id}`,
      {},
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setNotes(data.data);
      }
    });
  }
  function get_conversation(phone, conversation_id) {
    get_data(
      `${API_URL}/chat/v1/?conversation_id=${conversation_id}&phone=${phone}&overflow=${false}`,
      appContext
    ).then(function (data) {
      if (data) {
        setMsg(data.data);
        setConversationId(conversation_id);
      }
    });
  }
  function get_canned_responses() {
    get_data(
      `${API_URL}/crux/canned/response/v1/?ecosystem=1`,
      appContext,
      false
    ).then(function (data) {
      if (data) {
        setCannedResponses(data.data);
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
  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className={styles.container}>
      <Navbar
        ticket_id={ticket_id}
        group_id={data?.group_id}
        showActivity={showActivity}
        setShowActivity={setShowActivity}
        cannedResponses={cannedResponses}
        ticket={data}
        user_id={user}
        phone={data?.phone}
      />
      <div className={styles.ticket_container}>
        <div className={styles.ticket}>
          <h3 className={styles.heading}>
            {data.phone} | {data.subject}
          </h3>
          <span className={styles.agent}>
            Created by {data.agent_name} on {data.created_at}
          </span>
          <div className={styles.description}>
            <UpdateDescription data={data.description} ticket_id={ticket_id} />
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>

          {showConversation ? (
            <>
              <Conversation msg={msg} />{" "}
              <a
                href={`https://chat.crofarm.com/conversation/details/${conversationId}`}
                aria-label="redirect"
                target={"_blank"}
                className={styles.center_div}
              >
                <button>Click here to view full chat on Chat Connect</button>
              </a>
            </>
          ) : (
            ""
          )}

          {showActivity ? (
            activity.length > 0 ? (
              activity.map(function (item, idx) {
                return <Activity data={item} />;
              })
            ) : (
              <h1 className="text-center">No activity found !!</h1>
            )
          ) : notes.length > 0 ? (
            notes.map(function (item, idx) {
              return (
                <Note
                  ticket_id={ticket_id}
                  data={item}
                  cannedResponses={cannedResponses}
                />
              );
            })
          ) : (
            <h1 className="text-center" style={{ margin: "1vh 1vw" }}>
              No note found !!
            </h1>
          )}
        </div>
        <div className={styles.filter}>
          {/* <Filter data={data} ticket_id={ticket_id} filters={data.filters} /> */}
          <UpdateFilter
            ticket_data={data}
            ticket_id={ticket_id}
            filters={data.filters}
            supervisorData={supervisorData}
          />
        </div>
        <div className={styles.filter}>
          {/* <Filter data={data} ticket_id={ticket_id} filters={data.filters} /> */}
          <UserActivity user_id={user} ticket_id={ticket_id} data={data} />
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
