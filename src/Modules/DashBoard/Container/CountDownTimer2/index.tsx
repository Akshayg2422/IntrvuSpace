import React, { useEffect, useState } from "react";

function CountDownTimer2({ timeInSec }) {
  const [time, setTime] = useState<any>(timeInSec);

  useEffect(() => {
    let timer: any = setInterval(() => {
      setTime((time: any) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  function changeClockColor(seconds: any){
    let halfTimeInSec = seconds / 2
    let quaterTimeSec = seconds / 4

    if(time <= quaterTimeSec){
      return "red"
    }
    else if(time <= halfTimeInSec){
      return "#FF9C0D"
    }
    else {
      return "#1CF322"
    }
  }

  return (
    <div className="">
      <p style={{ fontSize: 12, color: changeClockColor(timeInSec)  }}>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
      </p>
    </div>
  );
}

export { CountDownTimer2 };
