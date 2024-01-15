import React, { useContext, useEffect, useState } from "react";
import Header from "./Components/Header";
import Template from "./Components/Template/index";
import data from "./seed";
import { AppContext } from "../../App";
import { get_data } from "../../ReactLib/networkhandler";
import { API_URL } from "../../config";

function WhatsappTemplates() {
  let appContext = useContext(AppContext);
  let [close, setClose] = useState(false);
  let [loader, setLoader] = useState(false);
  const [templates, setTemplates] = useState([]);
  const bodyContext = {
    templates,
    setTemplates,
    close,
    setClose,
    loader,
    appContext,
  };
  const headerContext = { close, setClose, loader, appContext };

  useEffect(() => {
    get_data(`${API_URL}/hook/template/v1/`, appContext).then(function (data) {
      if (data) {
        setTemplates(data?.data);
        setLoader(false);
      }
    });
  }, [appContext.reload]);

  return (
    <div>
      <Header headerContext={headerContext} />
      {loader ? (
        <div className="loader_container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Template bodyContext={bodyContext} />
        </>
      )}
    </div>
  );
}

export default WhatsappTemplates;
