import React, { useContext, useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import { HiPencil } from "react-icons/hi";
import { API_URL } from "../../../config";
import { AppContext } from "../../../App";
import { post_data, put_data } from "../../../ReactLib/networkhandler";
import PopUp from "../../../utils/Popup";

function UpdateDescription({ ticket_id, data }) {
  let [change, setChange] = useState({});
  let [close, setClose] = useState(false);
  let [description, setDescription] = useState("");

  const appContext = useContext(AppContext);
  useEffect(
    function () {
      console.log(data);
      setDescription(data);
      setClose(false);
    },
    [data]
  );

  function handleSubmit(e) {
    e.preventDefault();

    put_data(
      `${API_URL}/crux/update/ticket/v1/`,
      { ticket_id: ticket_id, data: { description: description } },
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setClose(true);
      }
    });
  }

  return (
    <PopUp btnName={<HiPencil />} btnStyling="btn" closeState={close}>
      <h1 className="text-center">Update Description </h1>
      <form className="form" onSubmit={handleSubmit}>
        <JoditEditor
          value={description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => {
            setDescription(newContent);
          }}
        />

        <div className="btn-container">
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default UpdateDescription;
