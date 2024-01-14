import React from "react";
import styles from "./css/style.module.css";
import { ReactComponent as Pending } from "../../../../assets/TicketTrendMetrics/Pending.svg";
import { ReactComponent as Resolved } from "../../../../assets/TicketTrendMetrics/Resolved.svg";
import { ReactComponent as Bot } from "../../../../assets/TicketTrendMetrics/Bot.svg";
import { ReactComponent as Assigned } from "../../../../assets/TicketTrendMetrics/Assigned.svg";
function TicketTrendsMetrics({ data }) {
  return (
    <div className={styles.metrics_header}>
      <div className={styles.metrics_heading}>
        <h3>Tickets</h3>
      </div>

      <div className={styles.ticket_trend_box}>
        <div className={styles.ticket_trend}>
          <div className={styles.pendingIcon}>
            <Pending className={styles.pending_svg} />
          </div>
          <div className={styles.detail}>
            <p>Total </p>
            <h3 className={styles.total_tickets}>{data?.total_tickets}</h3>
          </div>
        </div>
        <div className={styles.ticket_trend}>
          <div className={styles.assignedIcon}>
            <Assigned className={styles.assigned_svg} />
          </div>
          <div className={styles.detail}>
            <p>Pending</p>
            <h3 className={styles.pending_tickets}>{data?.pending_tickets}</h3>
          </div>
        </div>
        <div className={styles.ticket_trend}>
          <div className={styles.resolvedIcon}>
            <Resolved className={styles.resolved_svg} />
          </div>
          <div className={styles.detail}>
            <p>Resolved </p>
            <h3 className={styles.resolved_tickets}>
              {data?.resolved_tickets}
            </h3>
          </div>
        </div>
        <div className={styles.ticket_trend}>
          <div className={styles.botIcon}>
            <Bot className={styles.bot_svg} />
          </div>
          <div className={styles.detail}>
            <p>Due </p>
            <h3 className={styles.due_tickets}>{data?.due_tickets}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketTrendsMetrics;
