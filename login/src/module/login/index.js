import React, { useContext } from "react";
import styles from "./style.module.css";
import { get_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import { Navigate } from "react-router-dom";
import { isAgentLoggedIn, isPartnerLoggedIn } from "../../ReactLib/auth";
import { AppContext } from "../../App";

function Login() {
  const appContext = useContext(AppContext);
  function handleLogin() {
    get_data(`${API_URL}/crux/users/login/v1/`, appContext).then(function (
      data
    ) {
      if (data["link"]) {
        window.location.href = data["link"];
      }
    });
  }

  function handleTicketNavigation() {
    window.location.href = "/ticket";
  }
  function handleChatNavigation() {
    window.location.href = "/chat";
  }
  function handleSalesNavigation() {
    window.location.href = "/sales";
  }
  return isAgentLoggedIn() ? (
    <div className={styles.login_container}>
      <img
        src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/fi/5f08328050b9f.jpeg"
        className={styles.otipy_img}
        alt="otipy_image"
      />
      <div className={styles.btn_container}>
        <button onClick={handleTicketNavigation}>Ticket </button>
        <button onClick={handleChatNavigation}>Chat </button>
        <button onClick={handleSalesNavigation}>Sales </button>
      </div>
    </div>
  ) : (
    // <Navigate to="/validate" replace={true} />
    <div className={styles.login_container}>
      <img
        src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/news/fi/5f08328050b9f.jpeg"
        className={styles.otipy_img}
        alt="otipy_image"
      />
      <button onClick={handleLogin}> Login With Google</button>
    </div>
  );
}

export default Login;
