import { useEffect, useState } from "react";

// We will now mimic what we had in LifecycleLoggerClass component here using useEffect()
// REMEMBER! Component lifecycle: mount -> update -> unmount
const LifecycleLogger = () => {
  const [count, setCount] = useState(0);
  function incrementCount() {
    setCount((prevCount) => prevCount + 1);
  }

  // useEffect() is called a "side-effect" that is a hook that runs after something happens/changes. It takes 2 main parameters: callback function to invoke when useEffect is called & the dependency list. The dependency list basically tells the useEffect to run when one or more of the states in the dependency list changes.
  // In this case, an empty dependency list (i.e. '[]') runs the useEffect() on mount.
  // Cleanup (i.e. destructor) happens (before unmounting of course) and is done via a "return () => {}"
  useEffect(() => {
    // Mimics componentDidMount()
    console.log("Component mounted!");

    // Mimics cleanup: componentWillUnmount()
    return () => {
      console.log("Component unmounted!");
    };
  }, []);

  // Since we update via count only (i.e. a state), we can make a useEffect with [count] as the dependency to show update: componentDidUpdate()
  // The only caveat from the class component is that we no longer have access here to prevState or prevProps. Meaning, we'd have to refer to useRef() to get the same thing.
  useEffect(() => {
    console.log("Component Updated.. Count = ", count);
  }, [count]);

  return (
    <div className="container">
      <h1 className="heading">Lifecycle Logger (Functional Component)</h1>
      <p className="paragraph">Count: {count}</p>
      <button onClick={incrementCount} className="secondary-btn">
        Update
      </button>
    </div>
  );
};

export default LifecycleLogger;
