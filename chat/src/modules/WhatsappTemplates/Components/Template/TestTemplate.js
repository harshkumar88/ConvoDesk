import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { AiFillPlusCircle } from "react-icons/ai";
import PopUp from "../../../../utils/Popup";
import { API_URL } from "../../../../config";
import { post_data } from "../../../../React-lib/src/networkhandler";

function TestTemplate({ bodyContext, template_name }) {
  let { close, setClose, appContext } = bodyContext;

  const [testDetails, setTestDetails] = useState({
    temp_name: "",
    to: "",
    image: "",
    video: "",
    document: "",
    document_name: "",
    var_list: [],
  });

  useEffect(
    function () {
      setClose(false);
    },
    [close]
  );
  useEffect(() => {
    setTestDetails({ ...testDetails, temp_name: template_name });
  }, [template_name]);
  const [varlist, setVarlist] = useState([]);
  const [key, setKey] = useState(0);

  function handleAddItemInVarList() {
    if (varlist.length > 0 && varlist[varlist.length - 1].text == "") {
      return;
    }
    let index = key;
    setVarlist([...varlist, { text: "", id: index }]);
    index++;
    setKey(index);
  }

  function handleTestSubmit(e) {
    e.preventDefault();

    post_data(
      `${API_URL}/hook/template/test/v1/`,
      testDetails,
      appContext,
      true
    ).then(function (data) {
      if (data) {
        setTestDetails({
          ...testDetails,
          to: "",
          image: "",
          video: "",
          document: "",
          document_name: "",
          var_list: [],
        });
        setVarlist([]);
        setClose(true);
      }
    });
  }

  function handleTestChange(e) {
    setClose(false);
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  }
  function handleChange(idx, txt) {
    varlist.forEach((item, id) => {
      if (item.id == idx) {
        varlist[id].text = txt;
      }
    });
    let var_list_items = varlist.map((item) => {
      return item.text;
    });

    setVarlist([...varlist]);
    setTestDetails({
      ...testDetails,
      var_list: var_list_items,
    });
  }
  return (
    <PopUp
      btnName={"Test"}
      btnStyling={styles.test_template_btn}
      closeState={close}
    >
      <form className={styles.form_body} onSubmit={handleTestSubmit}>
        <div className={styles.test_template_header}>
          <h2>Test Template</h2>
          <span>({template_name})</span>
        </div>
        <div className={styles.test_template_body}>
          <div className={styles.info}>
            <div className={styles.div}>
              <p>Phone</p>
              <input
                type="tel"
                placeholder="phone no."
                className={styles.input}
                pattern="[1-9][0-9]{9}"
                maxLength={10}
                name="to"
                value={testDetails.to}
                onChange={function (e) {
                  if (isNaN(e.target.value)) {
                    return;
                  }
                  setTestDetails({
                    ...testDetails,
                    [e.target.name]: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className={styles.div}>
              <p>Image</p>
              <input
                type="text"
                placeholder="image url"
                className={styles.input}
                name="image"
                value={testDetails.image}
                onChange={handleTestChange}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.div}>
              <p>Video</p>
              <input
                type="text"
                placeholder="video"
                className={styles.input}
                name="video"
                value={testDetails.video}
                onChange={handleTestChange}
              />
            </div>
            <div className={styles.div}>
              <p>Document</p>
              <input
                type="text"
                placeholder="document url"
                className={styles.input}
                name="document"
                value={testDetails.document}
                onChange={handleTestChange}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.div}>
              <p>Document Name</p>
              <input
                type="text"
                placeholder="document name"
                className={styles.input}
                name="document_name"
                value={testDetails.document_name}
                onChange={handleTestChange}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.div}>
              <div className={styles.var_list}>
                <p>Var List</p>

                <span
                  className={styles.varlist_add_btn}
                  onClick={handleAddItemInVarList}
                >
                  <AiFillPlusCircle />
                </span>
              </div>
              <div className={styles.var_list_items}>
                {varlist.map((item, idx) => {
                  return (
                    <div className={styles.var_list_div} key={idx}>
                      <input
                        type="text"
                        placeholder="data"
                        className={styles.input}
                        name="varlist"
                        value={item.text}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.btn_div}>
            <button type="submit">Test</button>
          </div>
        </div>
      </form>
    </PopUp>
  );
}

export default TestTemplate;
