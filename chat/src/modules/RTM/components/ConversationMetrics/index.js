import React from "react";
import styles from "../../css/style.module.css";
import { ReactComponent as Pending } from "../../../../assets/Rtm/Pending.svg";
import { ReactComponent as Resolved } from "../../../../assets/Rtm/Resolved.svg";
import { ReactComponent as Bot } from "../../../../assets/Rtm/Bot.svg";
import { ReactComponent as Assigned } from "../../../../assets/Rtm/Assigned.svg";
function ConversationMetrics({ info }) {
  return (
    <div className={styles.leadsBox}>
      <div className={styles.lead}>
        <div className={styles.pendingIcon}>
          <Pending className={styles.pending_svg} />
        </div>
        <div className={styles.detail}>
          <p>Pending</p>
          <h3 className={styles.pendingData}>{info["1"]}</h3>
        </div>
      </div>
      <div className={styles.lead}>
        <div className={styles.assignedIcon}>
          <Assigned className={styles.assigned_svg} />
        </div>
        <div className={styles.detail}>
          <p>Assigned</p>
          <h3 className={styles.assignedData}>{info["2"]}</h3>
        </div>
      </div>
      <div className={styles.lead}>
        <div className={styles.resolvedIcon}>
          <Resolved className={styles.resolved_svg} />
        </div>
        <div className={styles.detail}>
          <p>Resolved</p>
          <h3 className={styles.resolvedData}>{info["4"]}</h3>
        </div>
      </div>
      <div className={styles.lead}>
        <div className={styles.botIcon}>
          <Bot className={styles.bot_svg} />
        </div>
        <div className={styles.detail}>
          <p className={styles.botWidth}>Bot</p>
          <h3 className={styles.botData}>{info["5"]}</h3>
        </div>
      </div>
    </div>
  );
}

export default ConversationMetrics;
