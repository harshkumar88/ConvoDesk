import React from "react";
import styles from "../../css/Main.module.css";
import Message from "./Message/index";

function Flow({
  dialogues,
  setDialogues,
  activeFlow,
  webhooks,
  groups,
  properties,
  setActive,
  setConditions,
  setActiveDialogue,
}) {
  return (
    <div className={styles.main_container}>
      <div className={styles.message_list}>
        <h1 className={styles.main_heading}>{activeFlow?.name}</h1>

        {dialogues?.map((item, idx) => (
          <Message
            item={item}
            key={idx}
            dialogues={dialogues}
            activeFlow={activeFlow}
            webhooks={webhooks}
            groups={groups}
            properties={properties}
            setActive={setActive}
            setConditions={setConditions}
            setActiveDialogue={setActiveDialogue}
          />
        ))}
        <div style={{ marginBottom: "2rem !important" }}>
          <button
            onClick={function () {
              const arr = [
                ...dialogues,
                {
                  type: "T",
                  text: { content: "", hindi_content: "" },
                  actions: [],
                  conditions: [],
                  is_new: true,
                },
              ];
              setDialogues(arr);
            }}
            className={styles.container_btn}
          >
            Create Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Flow;
