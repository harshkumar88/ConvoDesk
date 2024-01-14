import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../App";
// import Header from "../components/Header/Header";
import { API_URL } from "../config";
import { get_data } from "../networkHandler";

function ChatRoutes(props) {
  const appContext = useContext(AppContext);

  useEffect(function () {
    getCannedResponses();
  }, []);
  function getCannedResponses() {
    get_data(`${API_URL}/crux/canned/response/v1/?ecosystem=2`, appContext).then(function (
      data
    ) {
      if (data) {
        appContext.setCannedResponses(data.data);
      }
    });
  }
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.app}>
          <div className={styles.sidebar}>
            <Test
              filteredChat={filteredChat}
              format_data={format_data}
              get_modified_data={get_modified_data}
              setData={setData}
              sidebar={sidebar}
              setSidebar={setSidebar}
              reloadHandler={reloadHandler}
            />
          </div>
          <div className={styles.chat}>
            {Object.keys(data).length === 0 ? (
              <div className={styles.select_chat}>
                <img src={"https://img.crofarm.com/chat.svg"} />
                <p style={{ marginTop: "20px" }}>Please select a chat</p>
              </div>
            ) : (
              <div className={styles.hat}>
                <Chat
                  data={data}
                  conversation={data}
                  resolvehandler={handler}
                />
              </div>
            )}
          </div>
          {data.phone && (
            <div className={styles.user_details}>
              {show == "details" ? <UserDetails data={data} /> : <Ticket />}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default ChatRoutes;
