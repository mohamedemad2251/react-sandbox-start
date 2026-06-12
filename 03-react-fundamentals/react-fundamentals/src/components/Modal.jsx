const Modal = ({ activeStars , handleClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Thank You For Submitting!</h2>
        <p>
          You rated us: {activeStars} {activeStars > 1 ? "stars" : "star"}
        </p>
        <button onClick={handleClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
