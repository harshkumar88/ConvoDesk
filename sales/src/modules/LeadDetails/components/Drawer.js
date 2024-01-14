import React, { useContext, useState } from "react";
import { BiBarChartSquare, BiGroup } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { TbSettingsAutomation } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import styles from "../css/style.module.css";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { delete_data, post_data } from "../../../networkHandler";
import { API_URL } from "../../../config";
import SendCoupon from "./SendCoupon";
import LeadProperties from "./LeadProperties";

function Drawer({ show, setShow, lead_id, context }) {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  function handleDelete() {
    delete_data(
      `${API_URL}/crux/sales/lead/v1/?lead_id=${lead_id}`,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        navigate("/home");
      }
    });
  }

  const nav_data = [
    {
      title: "Activity",
      key: "activity",
      icon: <HiOutlineTicket />,
    },

    {
      title: "Contact Fields",
      key: "field",
      icon: <MdArticle />,
    },

    {
      title: "Notes",
      key: "note",
      icon: <FiLogOut />,
    },
    {
      title: "Top SKU’s",
      key: "sku",
      icon: <MdArticle />,
    },
  ];

  return (
    <>
      <ul className={styles.btn_container}>
        {nav_data.map(function (item, idx) {
          return (
            <button
              className={show == item.key ? "dark-btn" : "btn"}
              onClick={function () {
                setShow(item.key);
              }}
            >
              {/* {item.icon} */}
              {item.title}
            </button>
          );
        })}
        <AddNote lead_id={lead_id} />
        <SendCoupon lead_id={lead_id} />
        <LeadProperties lead_id={lead_id} context={context} />

        <button className="btn" onClick={handleDelete}>
          Delete Lead
        </button>
      </ul>
    </>
  );
}

export default Drawer;
