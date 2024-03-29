import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { isAgentLoggedIn } from "../../ReactLib/auth";
import styles from "./css/style.module.css";
import { get_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";
import { AppContext } from "../../App";

function Login() {
  const appContext = useContext(AppContext);
  function handleLogin() {
    get_data(`${API_URL}/crux/users/login/v1/?chat=${true}`, appContext).then(
      function (data) {
        if (data["link"]) {
          window.location.href = data["link"];
        }
      }
    );
  }
  return isAgentLoggedIn() ? (
    <Navigate to="/home" replace={true} />
  ) : (
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
