import React, { useContext } from "react";
import { useEffect } from "react";
import styles from "./css/style.module.css";
import { get_data, post_data } from "../../networkHandler";
import { API_URL } from "../../config";
import { AppContext } from "../../App";
import { useState } from "react";
import Alert from "../../components/Alert";
import { NavLink } from "react-router-dom";
function Validate() {
  const appContext = useContext(AppContext);
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  useEffect(function () {
    appContext.setPage("validate");
    let url = window.location.href;
    setEmail(localStorage["agent-email"]);
    setName(localStorage["agent-name"]);
    let url_info = url.split("code=")[1];
    if (url_info === undefined) {
      console.log("wrong url");
    } else {
      let google_code = url_info.split("&")[0];
      get_login(google_code);
    }
  }, []);

  function get_login(google_code) {
    get_data(
      `${API_URL}/crux/users/login/v1/?code=${google_code}`,
      appContext
    ).then(function (data) {
      localStorage.setItem("access-token", data.access_token);
      localStorage.setItem("agent-name", data.name);
      localStorage.setItem("agent-email", data.email);
      localStorage.setItem("agent-id", data.user_context.agent_id);
      localStorage.setItem("groups", JSON.stringify(data.user_context.groups));
      localStorage.setItem("user_context", JSON.stringify(data.user_context));
      localStorage.setItem("roles", JSON.stringify(data.role_permission.roles));
      localStorage.setItem(
        "permissions",
        JSON.stringify(data.role_permission.permissions)
      );
      setName(data.name);
      setEmail(data.email);
      window.location.href = "/home";
    });
  }

  return (
    <>
      <div className={styles.header}>
        <div>
          <div className={styles.agent_details}>
            <span>
              Agent Name: <b>{name}</b>
            </span>
          </div>

          <div className={styles.agent_details}>
            <span>
              Agent Email: <b>{email}</b>
            </span>
          </div>
          <div className={styles.nav_link}>
            <NavLink to="/logout">Back to Login Page</NavLink>
            {/* <NavLink to="/admin/partner/payout">Admin Panel</NavLink> */}
          </div>
        </div>
      </div>
      {/* <div className={styles.box}>
        <img
          src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/fi/5f08328050b9f.jpeg"
          className={styles.otipy_img}
          alt="otipy_image"
        />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="phone"
            name="phone"
            placeholder="Enter Consumer Phone Number"
            value={phone}
            onChange={handlePhone}
            required
          />
          <button type="submit" className={styles.submit_btn}>
            Submit
          </button>
        </form>
      </div> */}
      <Alert
        className={appContext.alert_class}
        response={appContext.response}
        setClass={appContext.setClass}
      />
    </>
  );
}

export default Validate;
