import React, { useMemo } from "react";
import Countdown from "react-countdown";


const Timer = ({ time, setIsExpire }) => {
  const tragetTime = useMemo(()=>Date.now()+time,[time])
  return (
    <div className="timer">

      <Countdown
        onComplete={() => setIsExpire(true)}
        date={tragetTime}
      />
    </div>
  );
};

export default Timer;
