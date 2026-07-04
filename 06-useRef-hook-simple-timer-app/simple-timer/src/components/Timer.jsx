import { useState, useRef, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

function Timer() {
  // Since setInterval() returns a timer ID, that ID will vanish every re-render. To persist its value, useRef() is a good use-case here.
  const timerRef = useRef(null);

  // time is a state because time is the variable/state that changes the UI dynamically, a change in this variable should cause a re-render, hence, a state.
  const [time, setTime] = useState(
    () => Number(localStorage.getItem("time")) || 0,
  );
  // Boolean to check if the time is running or not.
  const [isRunning, setIsRunning] = useState(false);

  function toggleTimer() {
    if (isRunning) {
      // Pause Timer
      clearInterval(timerRef.current);
    } else {
      // Start Timer
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    setTime(0);
    timerRef.current = null;
    setIsRunning(false);
  }

  useEffect(() => {
    localStorage.setItem("time", time.toString());
  }, [time]);

  return (
    <div className="w-100 flex flex-col items-center gap-5 p-5 bg-[#e0e0e0] rounded-3xl shadow-lg">
      <TimerDisplay time={time} />
      <TimerControls
        toggleTimer={toggleTimer}
        resetTimer={resetTimer}
        isRunning={isRunning}
      />
    </div>
  );
}

export default Timer;
