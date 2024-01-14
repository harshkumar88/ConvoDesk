import React, { useState, useEffect } from "react";

const Timer = ({ chat, setOverdue }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (chat.epoch && chat.epoch != undefined) {
      const timerInterval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

      const epochDiff = (currentTime - chat.epoch) / 1000;

      // If epoch difference is greater than 240 seconds, set overdue to true
      if (epochDiff > 240) {
        setOverdue(true);
        console.log("time over", currentTime, chat.epoch, epochDiff, chat.name);
      } else {
        setOverdue(false);
      }

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [chat.epoch, currentTime]);

  return null;
};

export default Timer;
