// NOTE: This is legacy code. Meaning, after React 16, we moved to functional components. It is wise to use functional components (useHooks are easier to use than this) BUT it's also important to be able to read legacy code. We never know when we'd need to refactor one.
// We will do the LifecycleLogger here as a class component and then we'll do another file doing the same things but using useState() & useEffect().

// To be able to create a class component, you'd have to extend your base class with what the class component has. This is done by importing Component from "react"
import { Component } from "react";
class LifecycleLoggerClass extends Component {
  // In classes, constructors are the initialization of them. Remember, this is NOT mounting, this is simply initializing the component. Mounting is the process of loading it up in the DOM when it's initialized
  constructor() {
    // We need to call super() here (probably for inheritance in the constructor )
    super();
    // We need to define the states in one state object (that's how it's done in classes)
    this.state = {
      count: 0,
    };
    console.log("Component init...");
  }
  // This method runs right after a component mounts
  componentDidMount() {
    console.log("Component mounted!");
  }
  // This method runs right when a component is about to unmount. The reason why it's run BEFORE and not after is that we will lose the component, that may cause some unoptimized issues should cleanup exist before the component unmounts.
  componentWillUnmount() {
    console.log("Component unmounting!");
  }
  // This method runs when the component re-renders (i.e. updates). Remember that the component's lifecycle is mount -> update -> unmount
  componentDidUpdate(prevProps, prevState) {
    console.log("Previous count = ", prevState.count);
  }

  // If arrow function is not used, the component won't know that this method is used by it and therefore, this.setState and this.state won't be accessible
  incrementCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  // render() is the main method that renders the actual JSX. This is where we return. This is similar to the return () in functional components
  render() {
    return (
      <div className="container">
        <h1 className="heading">Lifecycle Logger (Class Component)</h1>
        <p className="paragraph">Count: {this.state.count}</p>
        <button onClick={this.incrementCount} className="secondary-btn">
          Update
        </button>
      </div>
    );
  }
}

// We need to export it of course to be able to use it anywhere else
export default LifecycleLoggerClass;
