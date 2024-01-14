import React, { useEffect, useState } from "react";
import styles from "./css/style.module.css";
let endTimer;
function Timer({ data }) {
  const [timer, setTimer] = useState({ min: data.minutes, sec: data.seconds });
  useEffect(() => {
    clearInterval(endTimer);
    setTimer({ min: data.minutes, sec: data.seconds });
    callTimer();
  }, [data]);

  function callTimer() {
    let minutes = data.minutes;
    let seconds = data.seconds;
    if (minutes < 0) {
      setTimer({ min: "--", sec: "--" });
      return;
    }

    endTimer = setInterval(() => {
      if ((seconds < 1) & (minutes < 1)) {
        clearInterval(endTimer);
      } else if (seconds < 1) {
        minutes -= 1;
        seconds = 59;
      } else {
        seconds -= 1;
      }

      if ((seconds == 0 && minutes == 0) || minutes < 0) {
        setTimer({ min: "--", sec: "--" });
      } else setTimer({ min: minutes, sec: seconds });
    }, 1000);
  }

  return (
    <div className={styles.timer_container}>
      {timer.min != "--" ? (
        <div className={styles.timer_body}>
          <div className={styles.timer}>
            {timer.min < 10 ? (
              <>
                <span className={styles.timer_label}>0</span>
                <span className={styles.timer_label}>{timer.min}</span>
              </>
            ) : (
              <>
                <span className={styles.timer_label}>
                  {Math.floor(timer.min / 10)}
                </span>
                <span className={styles.timer_label}>{timer.min % 10}</span>
              </>
            )}
          </div>
          <div className={styles.timer_divider}>
            <span>:</span>
          </div>

          <div className={styles.timer}>
            {timer.sec < 10 ? (
              <>
                <span className={styles.timer_label}>0</span>
                <span className={styles.timer_label}>{timer.sec}</span>
              </>
            ) : (
              <>
                <span className={styles.timer_label}>
                  {Math.floor(timer.sec / 10)}
                </span>
                <span className={styles.timer_label}>{timer.sec % 10}</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.sla_breached_box}>
          <p className={styles.sla_breached}>Sla Breached</p>
        </div>
      )}
    </div>
  );
}

export default Timer;
