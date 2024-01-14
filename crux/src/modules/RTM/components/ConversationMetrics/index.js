import React from "react";
import styles from "./css/style.module.css";
import { ReactComponent as Pending } from "../../../../assets/TicketTrendMetrics/Pending.svg";
import { ReactComponent as Resolved } from "../../../../assets/TicketTrendMetrics/Resolved.svg";
import { ReactComponent as Bot } from "../../../../assets/TicketTrendMetrics/Bot.svg";
import { ReactComponent as Assigned } from "../../../../assets/TicketTrendMetrics/Assigned.svg";
function ConversationMetrics({ info }) {
  return (
    <div className={styles.metrics_header}>
      <div className={styles.metrics_heading}>
        <h3>Conversations</h3>
      </div>
      <div className={styles.leadsBox}>
        <div className={styles.lead}>
          <div className={styles.pendingIcon}>
            <Pending className={styles.pending_svg} />
          </div>
          <div className={styles.detail}>
            <p>Pending</p>
            <h3 className={styles.pendingData}>{info?.pendingData}</h3>
          </div>
        </div>
        <div className={styles.lead}>
          <div className={styles.assignedIcon}>
            <Assigned className={styles.assigned_svg} />
          </div>
          <div className={styles.detail}>
            <p>Assigned</p>
            <h3 className={styles.assignedData}>{info?.assignedData}</h3>
          </div>
        </div>
        <div className={styles.lead}>
          <div className={styles.resolvedIcon}>
            <Resolved className={styles.resolved_svg} />
          </div>
          <div className={styles.detail}>
            <p>Resolved</p>
            <h3 className={styles.resolvedData}>{info?.resolvedData}</h3>
          </div>
        </div>
        <div className={styles.lead}>
          <div className={styles.botIcon}>
            <Bot className={styles.bot_svg} />
          </div>
          <div className={styles.detail}>
            <p className={styles.botWidth}>Bot</p>
            <h3 className={styles.botData}>{info?.botData}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationMetrics;
