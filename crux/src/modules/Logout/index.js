import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../App";

function Logout(props) {
  let appContext = useContext(AppContext);
  useEffect(function () {
    appContext.setPage("logout");
    localStorage.clear();
  }, []);
  return <Navigate to="/login" replace={true} />;
}

export default Logout;
