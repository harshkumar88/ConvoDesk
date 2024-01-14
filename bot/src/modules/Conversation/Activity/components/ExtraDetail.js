import React, { useContext, useEffect, useState } from "react";
import styles from "./extra.module.css";
import ReactJson from "react-json-view";

function ExtraDetail(props) {
  const { item } = props;
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);

  return loader ? (
    <></>
  ) : (
    <>
      {item?.type === "P" ? (
        <div className={styles.extra_details}>
          <div className={styles.details_div}>
            <div className={styles.earning_info}>
              <span className={styles.heading}>Key</span>
              <span className={styles.text}>{item?.meta?.key}</span>
            </div>
            <div className={styles.earning_info}>
              <span className={styles.heading}>Value</span>
              <span className={styles.text}>{item?.meta?.value}</span>
            </div>
          </div>
        </div>
      ) : item?.type === "C" ? (
        <>
          {item?.meta?.condition_check ? (
            <div className={styles.extra_details}>
              <div className={styles.details_div}>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>LHS</span>
                  <span className={styles.text}>{item?.meta?.lhs}</span>
                </div>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>RHS</span>
                  <span className={styles.text}>{item?.meta?.rhs}</span>
                </div>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>Operator</span>
                  <span className={styles.text}>{item?.meta?.operator}</span>
                </div>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>Combined Operator</span>
                  <span className={styles.text}>
                    {item?.meta?.combined_operator}
                  </span>
                </div>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>Final Result</span>
                  <span className={styles.text}>
                    {item?.meta?.finalResult ? "True" : "False"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.extra_details}>
              <div className={styles.details_div}>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>Dialogue Redirect</span>
                  <span className={styles.text}>
                    {item?.meta?.dialogue_redirect ? "True" : "False"}
                  </span>
                </div>
                <div className={styles.earning_info}>
                  <span className={styles.heading}>Dialogue ID</span>
                  <span className={styles.text}>
                    {item?.meta?.dialogue_id === null ? (
                      "---"
                    ) : (
                      <>{`${item?.meta?.dialogue_id}`}</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.extra_details}>
          <div className={styles.details_div}>
            <div className={styles.earning_info} style={{ flex: ".91.8" }}>
              <span className={styles.heading}>URL</span>
              <span className={styles.text}>{item?.meta?.url}</span>
            </div>
            <div className={styles.earning_info}>
              <span className={styles.heading}>Method</span>
              <span className={styles.text}>{item?.meta?.method}</span>
            </div>
            <div className={styles.earning_info}>
              <span className={styles.heading}>Time Taken</span>
              <span className={styles.text}>{item?.meta?.time_taken}</span>
            </div>
          </div>
          <div className={styles.sub_row}>
            <div className={styles.row_1}>
              <span className={styles.json_heading}>Params</span>
              <span className={styles.json_text}>
                <ReactJson
                  src={item?.meta?.params}
                  theme="monokai"
                  collapsed={true}
                />
              </span>
            </div>
            <div className={styles.row_1}>
              <span className={styles.json_heading}>Headers</span>
              <span className={styles.json_text}>
                <ReactJson
                  src={item?.meta?.headers}
                  theme="monokai"
                  collapsed={true}
                />
              </span>
            </div>

            <div className={styles.row_1}>
              <span className={styles.json_heading}>Body</span>
              <span className={styles.json_text}>
                <ReactJson
                  src={item?.meta?.body}
                  theme="monokai"
                  collapsed={true}
                />
              </span>
            </div>
            <div className={styles.row_1}>
              <span className={styles.json_heading}>Response</span>
              <span className={styles.json_text}>
                <ReactJson
                  src={item?.meta?.res}
                  theme="monokai"
                  collapsed={true}
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExtraDetail;
