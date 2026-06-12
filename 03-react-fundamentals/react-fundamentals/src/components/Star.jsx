const Star = ({
  star,
  hoverStars,
  setHoverStars,
  activeStars,
  setActiveStars,
}) => {
  return (
    <span
      onClick={() => setActiveStars(star)}
      onMouseEnter={() => setHoverStars(star)}
      onMouseLeave={() => setHoverStars(0)}
      className={`star ${star <= (hoverStars || activeStars) && "active"}`}
    >
      {"\u2605"}
    </span>
  );
};

export default Star;
