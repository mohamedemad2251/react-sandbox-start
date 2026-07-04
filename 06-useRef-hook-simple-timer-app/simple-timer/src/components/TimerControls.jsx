import { useRef, useEffect } from "react";

function TimerControls({ toggleTimer, resetTimer, isRunning }) {
  const startButtonRef = useRef(null);

  useEffect(() => {
    startButtonRef.current.focus();
  }, []);

  return (
    <div className="flex gap-3">
      <button
        ref={startButtonRef}
        onClick={toggleTimer}
        className="w-25 bg-green-500 text-white rounded-lg py-2 px-4 cursor-pointer hover:bg-green-700"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={resetTimer}
        className="w-25 bg-red-500 text-white rounded-lg py-2 px-4 cursor-pointer hover:bg-red-700"
      >
        Reset
      </button>
    </div>
  );
}

export default TimerControls;
