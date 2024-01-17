import React, { useContext, useState, useEffect } from "react";
import IssueLayout from "../Components/IssueLayout/index";
import { data } from "./seed";
import { AppContext } from "../../../App";
function IssueContainer({ choices, setChoices }) {
  const appContext = useContext(AppContext);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    appContext.setTitle("Ticket Fields");
    // setChoices(data);
  }, [appContext.reload]);

  const issueContext = {
    choices,
    setChoices,
  };
  return loader ? (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  ) : (
    <IssueLayout issueContext={issueContext} />
  );
}

export default IssueContainer;
