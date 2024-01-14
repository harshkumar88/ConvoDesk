import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { BiSupport } from "react-icons/bi";
import { post_data_without_reload } from "../../../../React-lib/src/networkhandler";
import { API_URL } from "../../../../config";
import Ticket from "./components/Ticket";
import { IoMdCopy } from "react-icons/io";
import SideBar from "./components/SideBar";
import Ivr from "../Chat/components/Ivr";
import ManualCall from "../Chat/components/ManualCall";
function UserDetails({ conversationDetails, context: appContext }) {
  let [tickets, setTickets] = useState([]);
  let [show, setShow] = useState(false);
  function handlePhoneClick(phoneNumber) {
    navigator.clipboard.writeText(phoneNumber);
    appContext.setAlert("Phone Number Copied", "alert_success");
  }
  useEffect(
    function () {
      if (
        conversationDetails.phone &&
        conversationDetails.phone !== null &&
        conversationDetails.phone !== ""
      ) {
        getUserTickets();
      }
    },
    [conversationDetails]
  );
  function getUserTickets() {
    post_data_without_reload(
      `${API_URL}/crux/ticket/v1/?page=1`,
      {
        filters: [{ phone: parseInt(conversationDetails?.phone) }],
        page: 1,
      },
      appContext
    ).then(function (data) {
      if (data) {
        setTickets(data?.data);
      }
    });
  }

  function handleClick() {
    setShow(!show);
  }
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.support}>
          {conversationDetails?.status == "O" ? (
            <>
              <ManualCall conversationDetails={conversationDetails} />
              <Ivr conversationDetails={conversationDetails} />
            </>
          ) : (
            <></>
          )}
          <button className={styles.resolve_btn} onClick={handleClick}>
            Support pannel{" "}
          </button>
        </div>
        {show ? (
          <SideBar
            show={show}
            phone={conversationDetails?.phone}
            setShow={setShow}
          />
        ) : (
          <></>
        )}
        <div className={styles.user_details}>
          <div className={styles.heading_div}>
            <img src="https://assetscdn-web.freshchat.com/agent/static/assets/images/tabs/ic_tab_contact_info-6c0e633bdc8ff39d246993cc98ca6e0c.svg" />
            <b className={styles.heading}>Contact Info</b>
          </div>
          <div className={styles.details_wrapper}>
            <div className={styles.info_heading}>
              <b className={styles.avatar}>
                {conversationDetails?.name?.substr(0, 1)?.toUpperCase()}
              </b>
              <b className={styles.name}>
                {conversationDetails.name ? conversationDetails.name : "-"}
              </b>
            </div>
            <div className={styles.user_info}>
              <a
                href={`https://support.crofarm.com/freshdesk/?phone=${conversationDetails?.phone}`}
                target="_blank"
              >
                <p>Phone</p>
              </a>
              <div className={styles.span_div}>
                <a
                  href={`https://support.crofarm.com/freshdesk/?phone=${conversationDetails?.phone}`}
                  target="_blank"
                >
                  <span>{conversationDetails.phone}</span>
                </a>

                <span
                  onClick={() => handlePhoneClick(conversationDetails.phone)}
                  className={styles.copy_icon}
                >
                  <IoMdCopy />
                </span>
              </div>
            </div>

            <div className={styles.user_info}>
              <p>Email</p>
              <b>
                {conversationDetails.email ? conversationDetails.email : "-"}
              </b>
            </div>
          </div>
        </div>

        <div className={styles.heading_div}>
          <BiSupport />
          <b className={styles.heading}>Crux</b>
        </div>
        <div className={styles.tickets}>
          {tickets?.length > 0 ? (
            tickets?.slice(0, 5).map(function (item, idx) {
              return <Ticket data={item} key={idx} />;
            })
          ) : (
            <p style={{ textAlign: "center", margin: "2vh auto" }}>
              <b>No ticket found of this user!!</b>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
