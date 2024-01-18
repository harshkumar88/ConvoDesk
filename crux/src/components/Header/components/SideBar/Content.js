import React from "react";
import styles from "./style.module.css";
import { ReactComponent as Growth } from "../../../../assets/Growth.svg";
import { ReactComponent as DownGrowth } from "../../../../assets/DownGrowth.svg";
import { ReactComponent as BigGrowth } from "../../../../assets/BigGrowth.svg";
import { ReactComponent as BigDownGrowth } from "../../../../assets/BigDownGrowth.svg";

function Content({ data }) {
  function renderTrendSVG(trendValue) {
    const isPositive = trendValue >= 0;
    const TrendSVG = isPositive ? BigGrowth : BigDownGrowth;
    const trendText = `${isPositive ? "" : ""}${Math.abs(trendValue)}%`;

    return (
      <p className={isPositive ? styles.green_div : styles.red_div}>
        <TrendSVG /> {trendText}
      </p>
    );
  }

  function renderSubTrendSVG(trendValue) {
    const isPositive = trendValue >= 0;
    const TrendSVG = trendValue >= 0 ? Growth : DownGrowth;
    return (
      <p className={trendValue >= 0 ? styles.green : styles.red}>
        <TrendSVG />
        <span>{`${isPositive ? "" : ""}${Math.abs(trendValue)}%`}</span>
      </p>
    );
  }
  return (
    <div className={styles.details}>
      <div className={styles.details_container}>
        <div className={styles.row_1}>
          <div className={styles.subdiv}>
            <p className={styles.heading}>No. of tickets</p>
            <p className={styles.text}>{data?.ticket_ct}</p>
          </div>
          <div>{renderTrendSVG(data?.ticket_trend)}</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row_2}>
          <p className={styles.p}>Chat Count</p>
          <div className={`${styles.p} ${styles.bold}`}>
            {renderSubTrendSVG(data?.chat?.chat_ct_trend)}
            <p className={styles.p_div}>{data?.chat?.chat_ct}</p>
          </div>
        </div>
        <div className={styles.row_2}>
          <p className={styles.p}>Call Count</p>
          <div className={`${styles.p} ${styles.bold}`}>
            {renderSubTrendSVG(data?.ticket?.ticket_ct_trend)}
            <p className={styles.p_div}>{data?.ticket?.ticket_ct}</p>
          </div>
        </div>{" "}
      </div>
      <div className={styles.details_container}>
        <div className={styles.row_1}>
          <div className={styles.subdiv}>
            <p className={styles.heading}>Resolved within SLA</p>
            <p className={styles.text}>{data?.resolve_within_sla}</p>
          </div>
          <div>{renderTrendSVG(data?.resolve_within_sla_trend)}</div>{" "}
        </div>
        <hr className={styles.hr} />
        <div className={styles.row_2}>
          <p className={styles.p}>Chat</p>
          <div className={`${styles.p} ${styles.bold}`}>
            {renderSubTrendSVG(data?.chat?.resolve_within_sla_trend)}
            <p className={styles.p_div}>{data?.chat?.resolve_within_sla}</p>
          </div>
        </div>
        <div className={styles.row_2}>
          <p className={styles.p}>Call </p>
          <div className={`${styles.p} ${styles.bold}`}>
            {renderSubTrendSVG(data?.ticket?.resolve_within_sla_trend)}
            <p className={styles.p_div}>{data?.ticket?.resolve_within_sla}</p>
          </div>
        </div>
      </div>
      <div className={styles.details_container}>
        <div className={styles.row_1}>
          <div className={styles.subdiv}>
            <p className={styles.heading}>Avg Resolution Time</p>
            <p className={styles.text}>{data?.avg_resolution_time}</p>
          </div>
          <div>{renderTrendSVG(data?.avg_resolution_time_trend)}</div>
        </div>
        <hr className={styles.hr} />
        <div className={styles.row_2}>
          <p className={styles.p}>Chat </p>
          <div className={`${styles.p} ${styles.bold}`}>
            {renderSubTrendSVG(data?.chat?.avg_resolution_time_trend)}
            <p className={styles.p_div}>{data?.chat?.avg_resolution_time}</p>
          </div>
        </div>
        <div className={styles.row_2}>
          <p className={styles.p}>Call </p>
          <div className={`${styles.p} ${styles.bold}`}>
            {renderSubTrendSVG(data?.ticket?.avg_resolution_time_trend)}
            <p className={styles.p_div}>{data?.ticket?.avg_resolution_time}</p>
          </div>
        </div>
      </div>
      <div className={styles.details_container}>
        <div className={styles.row_1}>
          <div className={styles.subdiv}>
            <p className={styles.heading}>NPS</p>
            <p className={styles.text}>{data?.nps}</p>
          </div>
          <div>{renderTrendSVG(data?.nps_trend)}</div>
        </div>
      </div>
    </div>
  );
}

export default Content;
