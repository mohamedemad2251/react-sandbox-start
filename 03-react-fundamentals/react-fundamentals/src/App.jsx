import Rating from "./components/Rating";

// Props is an argument/atrributes-like *OBJECT* that allows us to send data/attributes to our functional component (we call this component functional because it's function-based and not class-based like old React components). We COULD send props and that's it then we get our props via props.heading, props.color, etc. But that's one use-case for destructuring. So instead of that, we can use: {heading, color} where that would mean GET the heading & color properties from the props object.
const App = () => {
  return <Rating />;
};

// Creating Styling In The Components As const Object
const styles = {
  container: {
    padding: "20px",
  },
};

export default App;
