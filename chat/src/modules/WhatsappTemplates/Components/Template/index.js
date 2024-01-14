import React from "react";
import styles from "./style.module.scss";
import TestTemplate from "./TestTemplate";

function Template({ bodyContext }) {
  let { templates } = bodyContext;
  return (
    <div>
      {templates.map((item, id) => {
        return (
          <div key={id} className={styles.template_container}>
            <div className={styles.heading}>
              <div className={styles.info}>
                <p>Template Name</p>
                <span>{item.template_name}</span>
              </div>
              <div className={styles.info}>
                <p>Template ID</p>
                <span>{item.template_id}</span>
              </div>
              <div className={`${styles.info_center} ${styles.info} `}>
                <TestTemplate
                  bodyContext={bodyContext}
                  template_name={item.template_name}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Template;
