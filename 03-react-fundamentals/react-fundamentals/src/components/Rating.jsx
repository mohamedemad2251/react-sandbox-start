import { useState } from "react";
import Star from "./Star";
import Modal from "./Modal";

const Rating = () => {
  const [activeStars, setActiveStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  //   Modal Logic
  const [isSubmitted, setIsSubmitted] = useState(false);
  const FEEDBACK_MESSAGES = ["Terrible", "Bad", "OK", "Good", "Excellent"];

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setActiveStars(0);
    setHoverStars(0);
  };

  return (
    // There are a few ways to style your project:
    // 1- Inline Styling (Done using style ={{}} where the inner braces are for the style object):
    // <div style={{padding: "20px"}} className="rating-container">

    // 2- Creating Styling In The Components As const Object
    // <div style={styles.container} className="rating-container">

    // 3- In The globals.css/styles.css/index.css (AKA Global Styling File) (Only For Smaller Projects)
    <div className="rating-container">
      <h1>Rate Your Experience</h1>
      <div className="stars">
        {/* This is one way to create a list (via array). But it's not dynamic. You'd have to use Array.from() if you want a dynamic list (before the return of course) */}
        {/* YOU CAN UNCOMMENT WHAT'S BELOW  (The code below is for the hardcoded part*/}
        {/* {[1,2,3,4,5].map((star)=>(

        // Apparently, using index as the key is not optimal because in filtering, you'd have to make sure every key is unique. If data is fetched via an API, using object.id is more advised for performance. (Will need to search that up a bit more)

        // IMPORTANT NOTE: (hoverStars || activeStars) !== (activeStars || hoverStars). Although both feel like doing the same thing, but whichever gets true (so 1+ value) will exit the condition as true. That means that if you want the hover to take over, you should start with "hoverStars" instead of "activeStars" 
        <span onClick={()=>setActiveStars(star)} onMouseEnter={()=>setHoverStars(star)} 
        onMouseLeave={()=>setHoverStars(0)} key={star} className={`star ${star <= (hoverStars || activeStars) && "active"}`}>{'\u2605'}</span>
      ))} */}

        {/* YOU CAN COMMENT THIS (The code below is when you make <Star/> a component)*/}
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            star={star}
            hoverStars={hoverStars}
            activeStars={activeStars}
            setActiveStars={setActiveStars}
            setHoverStars={setHoverStars}
          />
        ))}
      </div>
      {/* Conditional Rendering */}
      {activeStars > 0 && (
        <p className="feedback">{FEEDBACK_MESSAGES[activeStars - 1]}</p>
      )}
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={activeStars <= 0}
        className="submit-btn"
      >
        Submit
      </button>
      {/* Modal Component Logic */}
      {isSubmitted && (
        <Modal activeStars={activeStars} handleClose={handleClose} />
      )}
    </div>

    // 4- Frameworks: Like TailwindCSS & others (considered inline)
  );
};

export default Rating;
