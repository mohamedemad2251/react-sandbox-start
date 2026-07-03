import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import LifecycleLoggerClass from "./components/LifecycleLoggerClass";
import LifecycleLogger from "./components/LifecycleLogger";

function App() {
  const [isMount, setIsMount] = useState(false);
  return (
    <main>
      <h1 className="heading">React Lifecycle Playground</h1>
      <button onClick={() => setIsMount(!isMount)} className="primary-btn">
        {isMount ? "Unmount Logger" : "Mount Logger"}
      </button>
      {/* {isMount && <LifecycleLoggerClass />} */}
      {isMount && <LifecycleLogger />}
    </main>
  );
}

export default App;
