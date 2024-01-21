import React, { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import Webhook from "./Webhook";
import Property from "./Property";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
function Actions({
  item,
  actions,
  idx,
  handleActionDelete,
  setActions,
  automationData,
  edit,
}) {
  let [hide, setHide] = useState(edit);
  const [propertyOptions, setPropertyOptions] = useState([]);

  const [ticketOptions, setTicketOptions] = useState([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setPropertyOptions(automationData?.constants?.action_choices);
    setTicketOptions(automationData?.constants?.webhook_method_choices);
  }, [item, automationData]);

  //handles the type of action
  function handleTypeChange(e) {
    let actionList = actions?.map((data) => {
      if (item.uid == data.uid) {
        return { uid: item.uid, type: e.value };
      }
      return data;
    });

    setActions([...actionList]);
  }

  //handles the deletion of action
  function handleActionDelete() {
    const filterActions = actions?.filter((data) => {
      return item.uid != data.uid;
    });
    setActions([...filterActions]);
  }

  return (
    <div
      className={styles.condition_box}
      key={idx}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={styles.delete_wrapper}>
        <div className={styles.action_delete}>
          <div className={styles.wrapper}>
            <div className={styles.open_wrapper}>
              <div className={styles.arrow_wrapper}>
                <Select
                  options={propertyOptions}
                  placeholder="Type"
                  className={styles.condition_select1}
                  onChange={handleTypeChange}
                  required
                  value={propertyOptions?.filter(
                    (info) => info.value == item?.type
                  )}
                />
              </div>
            </div>
            <div>
              {!hide ? (
                <span
                  className={styles.wrapper_span}
                  onClick={() => setHide(!hide)}
                >
                  <IoMdArrowDropdown />
                </span>
              ) : (
                <span
                  className={styles.wrapper_span}
                  onClick={() => setHide(!hide)}
                >
                  <IoMdArrowDropup />
                </span>
              )}
            </div>
          </div>
          {!hide && (
            <div className={styles.condition_item2}>
              {item?.type == "property" ? (
                <Property
                  ticketOptions={ticketOptions}
                  actions={actions}
                  item={item}
                  setActions={setActions}
                  automationData={automationData}
                />
              ) : item?.type == "webhook" ? (
                <Webhook
                  ticketOptions={ticketOptions}
                  actions={actions}
                  item={item}
                  setActions={setActions}
                />
              ) : null}
            </div>
          )}
        </div>
        {actions.length == 1 && idx == 0
          ? null
          : hover && (
              <span
                className={styles.delete_icon}
                onClick={() => handleActionDelete()}
              >
                <FaTrash />
              </span>
            )}
      </div>
    </div>
  );
}

export default Actions;
