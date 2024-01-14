import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineLeftSquare, AiOutlineRightSquare } from "react-icons/ai";
import { AppContext } from "../../../../App";
import AddAgent from "./components/AddAgent";
import AddNote from "../AddNote";
import { delete_data } from "../../../../networkHandler";
import { API_URL } from "../../../../config";
import { useNavigate } from "react-router-dom";
import Merge from "../Merge";
import FollowUp from "../FollowUp";
import SideBar from "./components/SideBar";
import ExceptionFlow from "../ExceptionFlow";

function Navbar({
  ticket_id,
  showActivity,
  setShowActivity,
  cannedResponses,
  user_id,
  phone,
  group_id,
}) {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  let [show, setShow] = useState(false);

  function handleDelete() {
    delete_data(
      `${API_URL}/crux/ticket/v1/?ticket_id=${ticket_id}`,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate("/home");
      }
    });
  }

  function toggle() {
    setShowActivity(!showActivity);
  }
  function handleClick() {
    setShow(!show);
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.subnav}>
        <button className="btn" onClick={toggle}>
          {showActivity ? "Hide " : "Show "}Activity{" "}
        </button>
        <AddNote ticket_id={ticket_id} cannedResponses={cannedResponses} />
        <FollowUp ticket_id={ticket_id} group_id={group_id} />
        <Merge ticket_id={ticket_id} user_id={user_id} />
        <button className="btn" onClick={handleDelete}>
          Delete
        </button>
        <ExceptionFlow phone={phone} appContext={appContext} />
      </div>

      <div className={styles.subnav}>
        <button onClick={handleClick} className="btn">
          Click to view support pannel{" "}
        </button>
      </div>
      {show ? <SideBar show={show} phone={phone} setShow={setShow} /> : <></>}
    </nav>
  );
}

export default Navbar;
